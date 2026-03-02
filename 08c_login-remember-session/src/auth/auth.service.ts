import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';
import { JwtService } from '@nestjs/jwt';
import * as crypto from "crypto"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(RefreshToken) private refreshTokenRepo: Repository<RefreshToken>,
        private jwtService: JwtService
    ) { }

    generateRefreshToken() {
        return crypto.randomBytes(64).toString('hex')
    }

    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = this.userRepo.create({ email, password: hashedPassword })
        const saved = await this.userRepo.save(user)
        return { email: saved.email, id: saved.id }
    }

    async login(email: string, password: string, rememberMe: boolean) {
        // fetch user with email
        const user = await this.userRepo.findOne({ where: { email } })
        if (!user) throw new UnauthorizedException()
        // compare password with bcrypt
        const match = await bcrypt.compare(password, user.password)
        if (!match) throw new UnauthorizedException()
        // Generate access token using jwtService
        const accessToken = this.jwtService.sign(
            { sub: user.id },
            { expiresIn: '15m' })

        // Generate refresh token using static function
        const rawRefreshToken = this.generateRefreshToken()
        // Hash refresh token, find expiry
        const hashedToken = await bcrypt.hash(rawRefreshToken, 10)
        const expiry = new Date()
        expiry.setDate(expiry.getDate() + (rememberMe ? 7 : 1)) // 7 days if rememberMe checked

        // Save the refresh token in db
        await this.refreshTokenRepo.save({ hashedToken, user, expiresAt: expiry })

        // return access token and refresh token
        return { accessToken, refreshToken: rawRefreshToken }
    }

    async refresh(rawToken: string) {
        // Fetch all tokens and related users entity ( performs join)
        const tokens = await this.refreshTokenRepo.find({ where: { revoked: false }, relations: ['user'] })
        let found: RefreshToken | null = null
        for (const token of tokens) { // One by one compare the hash match
            if (await bcrypt.compare(rawToken, token.hashedToken)) {
                found = token
                break
            }
        }
        if (!found || found.expiresAt < new Date()) {
            throw new UnauthorizedException()
        }

        // Revoke older token
        found.revoked = true
        await this.refreshTokenRepo.save(found)

        // Generate new token and save hash to db
        const newRaw = this.generateRefreshToken()
        const newHash = await bcrypt.hash(newRaw, 10)
        await this.refreshTokenRepo.save({
            hashedToken: newHash,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            user: found.user
        })

        // Generate new access token
        const newAccess = this.jwtService.sign(
            { sub: found.user.id },
            { expiresIn: "15m" }
        )
        return { accessToken: newAccess, refreshToken: newRaw }
    }
}

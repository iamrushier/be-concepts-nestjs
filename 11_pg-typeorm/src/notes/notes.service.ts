import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Note)
        private readonly notesRepository: Repository<Note>
    ) { }

    async create(title: string, content: string): Promise<Note> {
        const note = await this.notesRepository.create({ title, content })
        return await this.notesRepository.save(note)
    }

    async findAll() {
        return this.notesRepository.find({
            order: { createdAt: "DESC" }
        })
    }

    async findOne(id: number) {
        const note = await this.notesRepository.findOneBy({ id })
        if (!note) throw new NotFoundException(`Note with #${id} not found`)
        return note
    }
}

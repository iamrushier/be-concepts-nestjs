import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './notes/entities/note.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: "postgres",
      password: 'admin',
      database: 'notes_dev',
      entities: [Note],
      synchronize: true,
      logging: ['query', 'error']
    }),
    NotesModule
  ],
})
export class AppModule { }

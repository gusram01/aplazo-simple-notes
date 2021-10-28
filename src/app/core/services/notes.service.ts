import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';

import { StorageService } from './storage.service';

import { Note } from '../models/Note';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private storageService: StorageService) {}

  getNotes(): Observable<Note[]> {
    return from(this.storageService.getNotes());
  }

  getNoteById(id: string): Observable<Note | undefined> {
    return from(this.storageService.getNotes()).pipe(
      map((notes) => {
        const note = notes.find((storedNote) => storedNote.id === id);

        if (!note) {
          throwError(`Note with id: <${id}>, not found`);
        }
        return note;
      })
    );
  }

  addNote(note: Note): Observable<void> {
    return this.getNotes().pipe(
      switchMap((notes) => {
        const newNotes = [...notes, note];
        return from(this.storageService.setNotes(newNotes));
      })
    );
  }

  updateNote(note: Note): Observable<void> {
    return this.getNotes().pipe(
      switchMap((notes) => {
        const storedNoteIndex = notes.findIndex(
          (storedNote) => storedNote.id === note.id
        );

        if (storedNoteIndex < 0) {
          return throwError(`Note with title: <${note.title}>, not found`);
        }

        if (notes[storedNoteIndex].createdAt !== note.createdAt) {
          return throwError("Can't change creation date");
        }

        const newNotes = notes.splice(storedNoteIndex, 1, note);

        return from(this.storageService.setNotes(newNotes));
      })
    );
  }

  deleteNoteById(id: string): Observable<void> {
    return from(this.storageService.getNotes()).pipe(
      switchMap((notes) => {
        const storedNoteIndex = notes.findIndex(
          (storedNote) => storedNote.id === id
        );

        if (storedNoteIndex < 0) {
          return throwError(`Note with title: <${note.title}>, not found`);
        }
        const newNotes = notes.splice(storedNoteIndex, 1);

        return from(this.storageService.setNotes(newNotes));
      })
    );
  }
}

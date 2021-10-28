import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { StorageService } from './storage.service';

import { Note } from '../models/Note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(
    private storageService: StorageService,
    private snackBar: MatSnackBar
  ) {}

  getNotes(): Observable<Note[]> {
    return from(this.storageService.getNotes()).pipe(
      catchError((error: any) => {
        this.snackBar.open(error.message);
        return throwError(error);
      })
    );
  }

  getNoteById(id: string): Observable<Note> {
    return from(this.storageService.getNotes()).pipe(
      map((notes) => {
        const note = notes.find((storedNote) => storedNote.id === id);
        if (!note) {
          throw new Error(`Note with id: <${id}>, not found`);
        }
        return note;
      }),
      catchError((error: any) => {
        this.snackBar.open(error.message);
        return throwError(error);
      })
    );
  }

  addNote(note: Note): Observable<void> {
    return this.getNotes().pipe(
      switchMap((notes) => {
        const newNotes = [...notes, note];
        return from(this.storageService.setNotes(newNotes));
      }),
      tap(() => {
        this.snackBar.open('Note added successfully');
      }),
      catchError((error: any) => {
        this.snackBar.open(error.message);
        return throwError(error);
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

        if (
          notes[storedNoteIndex].createdAt.toISOString() !==
          note.createdAt.toISOString()
        ) {
          return throwError("Can't change creation date");
        }

        if (this.hasObjectsSameKeyValue(notes[storedNoteIndex], note)) {
          return throwError('Nothing to update');
        }

        notes.splice(storedNoteIndex, 1, note);

        return from(this.storageService.setNotes(notes));
      }),
      tap(() => {
        this.snackBar.open('Note updated successfully');
      }),
      catchError((error: any) => {
        this.snackBar.open(error.message || error);
        return throwError(error);
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
          return throwError(`Note with id: <${id}>, not found`);
        }
        const newNotes = notes.splice(storedNoteIndex, 1);

        return from(this.storageService.setNotes(newNotes));
      }),
      tap(() => {
        this.snackBar.open('Note deleted successfully');
      }),
      catchError((error: any) => {
        this.snackBar.open(error.message);
        return throwError(error);
      })
    );
  }

  private hasObjectsSameKeyValue<T>(object1: T, object2: T): boolean {
    return Object.entries(object1).every(([key, value]) => {
      //@ts-expect-error
      if (typeof value === 'string' && object2[key] !== value) {
        return false;
      }
      if (
        typeof value !== 'string' &&
        //@ts-expect-error
        new Date(object2[key]).toISOString() !== new Date(value).toISOString()
      ) {
        return false;
      }

      return true;
    });
  }
}

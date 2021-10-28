import { Injectable } from '@angular/core';

import * as localStorage from 'localforage';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Note } from '../models/Note';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private dbName = 'aplazoTechnicalTest';
  private notesDbKey = 'notes';
  private localStorage: LocalForage;

  constructor() {
    this.localStorage = localStorage.createInstance({
      name: this.dbName,
    });
  }

  async getNotes(): Promise<Note[]> {
    try {
      return (await this.localStorage.getItem<Note[]>(this.notesDbKey)) || [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async setNotes(notes: Note[]): Promise<void> {
    try {
      await this.localStorage.setItem(this.notesDbKey, notes);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

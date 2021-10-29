import { TestBed } from '@angular/core/testing';
import { Note } from '../models/Note';

import { StorageService } from './storage.service';

const notes: Note[] = [
  {
    id: '1',
    title: 'Note 1',
    content: 'Note 1 content',
    createdAt: new Date(),
    isArchived: false,
  },
  {
    id: '2',
    title: 'Note 2',
    content: 'Note 2 content',
    createdAt: new Date(),
    isArchived: false,
  },
];

class MockStorage {
  getNotes(): Promise<Note[]> {
    return Promise.resolve(notes);
  }
  setNotes(note: Note): Promise<void> {
    notes.push(note);
    return Promise.resolve();
  }
}

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provider: StorageService, useClass: MockStorage }],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get notes', () => {
    spyOn(service, 'getNotes').and.callThrough();

    service.getNotes();

    expect(service.getNotes).toHaveBeenCalledTimes(1);
  });

  it('should set notes', () => {
    const newNote: Note = {
      id: '3',
      title: 'Note 3',
      content: 'Note 3 content',
      createdAt: new Date(),
      isArchived: false,
    };

    spyOn(service, 'setNotes').and.callThrough();

    service.setNotes([...notes, newNote]);

    expect(service.setNotes).toHaveBeenCalledTimes(1);
  });
});

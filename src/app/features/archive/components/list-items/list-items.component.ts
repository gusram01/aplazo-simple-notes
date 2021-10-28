import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NotesService } from 'src/app/core/services/notes.service';
import { RoutesNames } from 'src/app/core/RoutesNames.enum';
import { Note } from 'src/app/core/models/Note';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent {
  notes$: Observable<Note[]>;

  constructor(private notesService: NotesService, private router: Router) {
    this.notes$ = this.notesService
      .getNotes()
      .pipe(map((notes) => notes.filter((note) => note.isArchived)));
  }

  goToAddNewNoteRoute(): void {
    this.router.navigate([RoutesNames.rootNote, 'new']);
  }
}

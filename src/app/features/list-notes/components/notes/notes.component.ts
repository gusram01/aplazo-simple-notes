import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { NotesService } from 'src/app/core/services/notes.service';
import { RoutesNames } from 'src/app/core/RoutesNames.enum';
import { Note } from 'src/app/core/models/Note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {
  notes$: Observable<Note[]>;

  constructor(private notesService: NotesService, private router: Router) {
    this.notes$ = this.notesService.getNotes();
  }

  goToAddNewNoteRoute(): void {
    this.router.navigate([RoutesNames.rootNote, 'new']);
  }
}

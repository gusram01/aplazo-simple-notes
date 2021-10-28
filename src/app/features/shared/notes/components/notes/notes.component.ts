import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Note } from 'src/app/core/models/Note';
import { RoutesNames } from 'src/app/core/RoutesNames.enum';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {
  @Input() notes: Note[] | undefined;
  @Input() emptyMessage: string | undefined;

  constructor(private router: Router) {}

  goToUpdateNoteRoute(note: Note): void {
    this.router.navigate([RoutesNames.rootNote, note.id]);
  }
}

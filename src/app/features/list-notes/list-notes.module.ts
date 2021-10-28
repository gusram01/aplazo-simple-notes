import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ListNotesRoutingModule } from './list-notes-routing.module';
import { LayoutModule } from '../shared/layout/layout.module';

import { NotesComponent } from './components/notes/notes.component';
import { NoteCardComponent } from './components/note-card/note-card.component';

@NgModule({
  declarations: [NotesComponent, NoteCardComponent],
  imports: [
    CommonModule,
    ListNotesRoutingModule,
    LayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ListNotesModule {}

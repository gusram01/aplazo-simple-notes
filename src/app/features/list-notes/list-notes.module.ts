import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListNotesRoutingModule } from './list-notes-routing.module';
import { NotesComponent } from './components/notes/notes.component';


@NgModule({
  declarations: [
    NotesComponent
  ],
  imports: [
    CommonModule,
    ListNotesRoutingModule
  ]
})
export class ListNotesModule { }

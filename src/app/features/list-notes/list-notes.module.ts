import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ListNotesRoutingModule } from './list-notes-routing.module';
import { LayoutModule } from '../shared/layout/layout.module';
import { NotesModule } from '../shared/notes/notes.module';

import { ListItemsComponent } from './components/list-items/list-items.component';

@NgModule({
  declarations: [ListItemsComponent],
  imports: [
    CommonModule,
    ListNotesRoutingModule,
    LayoutModule,
    NotesModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ListNotesModule {}

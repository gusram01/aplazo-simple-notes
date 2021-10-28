import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NotesModule } from 'src/app/features/shared/notes/notes.module';
import { LayoutModule } from 'src/app/features/shared/layout/layout.module';

import { ArchiveRoutingModule } from './archive-routing.module';
import { ListItemsComponent } from './components/list-items/list-items.component';

@NgModule({
  declarations: [ListItemsComponent],
  imports: [
    CommonModule,
    ArchiveRoutingModule,
    NotesModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ArchiveModule {}

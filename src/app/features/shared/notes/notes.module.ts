import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './components/notes/notes.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [NotesComponent],
  exports: [NotesComponent],
  imports: [CommonModule, MatCardModule],
})
export class NotesModule {}

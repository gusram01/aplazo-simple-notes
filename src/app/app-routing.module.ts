import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesNames } from './core/RoutesNames.enum';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RoutesNames.rootHome,
  },
  {
    path: RoutesNames.rootHome,
    loadChildren: () =>
      import('./features/list-notes/list-notes.module').then(
        (m) => m.ListNotesModule
      ),
  },
  {
    path: `${RoutesNames.rootNote}/:id`,
    loadChildren: () =>
      import('./features/note/note.module').then((m) => m.NoteModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: RoutesNames.rootHome,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

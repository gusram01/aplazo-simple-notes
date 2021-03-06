import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { NavMenuModule } from '../nav-menu/nav-menu.module';

import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [
    CommonModule,
    NavMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
  ],
})
export class LayoutModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@NgModule({
  declarations: [NavMenuComponent],
  exports: [NavMenuComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
})
export class NavMenuModule {}

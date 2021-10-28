import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesNames } from 'src/app/core/RoutesNames.enum';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  constructor(private router: Router) {}

  goToHomeRoute(): void {
    this.router.navigate([RoutesNames.rootHome]);
  }

  goToArchiveRoute(): void {
    this.router.navigate([RoutesNames.rootArchive]);
  }
}

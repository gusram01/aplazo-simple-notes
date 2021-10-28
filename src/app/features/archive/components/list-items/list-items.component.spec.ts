import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ArchiveRoutingModule } from '../../archive-routing.module';

import { NotesModule } from 'src/app/features/shared/notes/notes.module';
import { LayoutModule } from 'src/app/features/shared/layout/layout.module';
import { NotesService } from 'src/app/core/services/notes.service';

import { ListItemsComponent } from './list-items.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { from } from 'rxjs';

const notesServiceStub = {
  getNotes: () =>
    from([
      {
        id: '1',
        title: 'Note 1',
        content: 'Note 1 content',
        createdAt: '2019-10-10T12:00:00.000Z',
        isArchived: false,
      },
      {
        id: '2',
        title: 'Note 2',
        content: 'Note 2 content',
        createdAt: '2019-10-10T12:00:00.000Z',
        isArchived: false,
      },
    ]),
};

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListItemsComponent],
      imports: [
        ArchiveRoutingModule,
        NotesModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule,
        MatSnackBarModule,
      ],
      providers: [{ provide: NotesService, useValue: notesServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

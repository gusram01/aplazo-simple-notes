import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

import { factoryNote, Note } from 'src/app/core/models/Note';
import { NotesService } from 'src/app/core/services/notes.service';
import { RoutesNames } from 'src/app/core/RoutesNames.enum';
import { CustomFormControlValidatorService } from '../../services/custom-form-control-validator.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  providers: [CustomFormControlValidatorService],
})
export class NoteComponent implements OnInit, OnDestroy {
  noteForm: FormGroup;
  currentNote: Note | undefined;

  private routerNavigationEndSubscription: Subscription;
  private titleSubscription: Subscription | undefined;
  private contentSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private noteService: NotesService,
    private customFormControlValidator: CustomFormControlValidatorService
  ) {
    this.noteForm = this.setInitialForm();

    this.routerNavigationEndSubscription = this.router.events
      .pipe(
        filter((navigationEvent) => navigationEvent instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.setFormValuesOrClearForm();
      });
  }

  get currentId(): string {
    return this.route.snapshot.params.id;
  }

  get isNewNote(): boolean {
    return this.currentId === 'new';
  }

  get title(): string {
    return this.isNewNote
      ? 'New note'
      : `Created at: ${this.currentNote?.createdAt.toDateString()}`;
  }

  get isArchived(): boolean {
    return this.getInputByName('isArchived')?.value;
  }

  get hasTitleRequiredError() {
    return this.hasInputErrorByNameAndError('title', 'required');
  }

  get hasTitlePatternError() {
    return this.hasInputErrorByNameAndError('title', 'includesAt');
  }

  get hasContentRequiredError() {
    return this.hasInputErrorByNameAndError('content', 'required');
  }

  ngOnInit(): void {
    this.setFormValuesOrClearForm();
    this.titleSubscription =
      this.setUpperCaseValueOnTheFly$('title').subscribe();
    this.contentSubscription =
      this.setUpperCaseValueOnTheFly$('content').subscribe();
  }

  ngOnDestroy(): void {
    this.routerNavigationEndSubscription.unsubscribe();
    this.titleSubscription?.unsubscribe();
    this.contentSubscription?.unsubscribe();
  }

  submitForm(): void {
    this.noteForm.markAllAsTouched();

    if (this.noteForm.valid && this.isNewNote) {
      this.addNote();
    }

    if (this.noteForm.valid && !this.noteForm.pristine && !this.isNewNote) {
      this.updateNote();
    }
  }

  goHome(): void {
    this.router.navigate([RoutesNames.rootHome]);
  }

  private addNote(): void {
    const { title, content } = this.noteForm.value;
    const newNote = factoryNote(title, content);

    this.noteService
      .addNote(newNote)
      .pipe(
        tap(() => {
          this.router.navigate([RoutesNames.rootNote, newNote.id]);
        })
      )
      .subscribe();
  }
  private updateNote(): void {
    const updatedNote = {
      ...this.currentNote,
      ...this.noteForm.value,
    };

    const note = new Note(
      updatedNote.id,
      updatedNote.title,
      updatedNote.content,
      updatedNote.createdAt,
      updatedNote.isArchived
    );

    this.noteService
      .updateNote(note)
      .pipe(
        tap(() => {
          this.router.navigate([RoutesNames.rootHome]);
        })
      )
      .subscribe();
  }

  private setInitialForm(): FormGroup {
    return this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          this.customFormControlValidator.titleIncludesAtValidator(),
        ],
      ],
      content: ['', [Validators.required]],
      isArchived: [false],
    });
  }

  private setFormValuesOrClearForm(): void {
    if (!this.isNewNote) {
      this.getNoteAndFillForm();
    } else {
      this.noteForm.reset();
    }
  }

  private getNoteAndFillForm(): void {
    this.noteService.getNoteById(this.currentId).subscribe((note) => {
      this.currentNote = note;
      this.noteForm.patchValue({
        title: this.currentNote?.title,
        content: this.currentNote?.content,
        isArchived: this.currentNote?.isArchived,
      });
    });
  }

  private setUpperCaseValueOnTheFly$(
    inputName: 'title' | 'content'
  ): Observable<string> {
    return this.getInputByName(inputName)!.valueChanges.pipe(
      distinctUntilChanged(),
      map((value) => value.toUpperCase()),
      tap((value) => {
        this.noteForm.patchValue({ [inputName]: value });
      })
    );
  }

  private getInputByName(name: string): AbstractControl | null {
    return this.noteForm.get(name);
  }

  private hasInputErrorByNameAndError(
    inputName: string,
    errorCode: string
  ): boolean {
    const input = this.getInputByName(inputName);

    return (
      !!input &&
      (input.touched || this.noteForm.touched) &&
      input.hasError(errorCode)
    );
  }
}

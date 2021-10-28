import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

import { factoryNote, Note } from 'src/app/core/models/Note';
import { NotesService } from 'src/app/core/services/notes.service';
import { RoutesNames } from 'src/app/core/RoutesNames.enum';
import { CustomFormControlValidatorService } from '../../services/custom-form-control-validator.service';
import { Subscription } from 'rxjs';

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
        this.updateOrSaveNote();
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
    this.updateOrSaveNote();
  }

  ngOnDestroy(): void {
    this.routerNavigationEndSubscription.unsubscribe();
  }

  saveNote(): void {
    this.noteForm.markAllAsTouched();

    if (this.noteForm.valid && this.isNewNote) {
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
  }

  goHome(): void {
    this.router.navigate([RoutesNames.rootHome]);
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
    });
  }

  private updateOrSaveNote(): void {
    if (!this.isNewNote) {
      this.fillTheformWithNote();
    } else {
      this.noteForm.reset();
    }
  }

  private fillTheformWithNote(): void {
    this.noteService.getNoteById(this.currentId).subscribe((note) => {
      this.currentNote = note;
      this.noteForm.patchValue({
        title: this.currentNote?.title,
        content: this.currentNote?.content,
      });
    });
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

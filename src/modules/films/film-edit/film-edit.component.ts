import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-film-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css']
})
export class FilmEditComponent implements OnInit, OnChanges {

  constructor(private dialogRef: MatDialogRef<FilmEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  filmEditForm = new FormGroup({
    filmName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern('\\d+')
    ]),
    slovakName: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  filmDialog: any

  ngOnChanges(changes: SimpleChanges): void {

  }

  get filmName(): FormControl {
    return this.filmEditForm.get('filmName') as FormControl;
  }

  get year(): FormControl {
    return this.filmEditForm.get('year') as FormControl;
  }

  get slovakName(): FormControl {
    return this.filmEditForm.get('slovakName') as FormControl;
  }

  ngOnInit(): void {
    if (this.data?.film) {
      this.filmName.setValue(this.data.film.nazov);
      this.year.setValue(this.data.film.rok);
      this.slovakName.setValue(this.data.film.slovenskyNazov);
      console.log('Input:', this.data.film);
    }
  }

  onClick() {
    let film
    if (this.data) {
      film = {
        ...this.data.film,
        nazov: this.filmName.value,
        slovenskyNazov: this.slovakName.value,
        rok: this.year.value,
        reziser: [],
        postava: []
      };
    } else {
      film = {
        nazov: this.filmName.value,
        slovenskyNazov: this.slovakName.value,
        rok: this.year.value,
        reziser: [],
        postava: []
      };
    }
    console.log(film)
    this.dialogRef.close(film);
  }

}

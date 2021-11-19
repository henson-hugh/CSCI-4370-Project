import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/model/genre';
import { Movie } from 'src/app/model/movie';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Showing } from 'src/app/model/showing';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-manage-movies',
  templateUrl: './manage-movies.component.html',
  styleUrls: ['./manage-movies.component.scss']
})
export class ManageMoviesComponent implements OnInit {

  movieForm: FormGroup;
  movie: Movie = new Movie();
  genres: Genre[] = [];

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.movieForm = this._formBuilder.group({
      movieId: '',
      movieTitle: '',
      movieRating: '',
      movieDuration: '',
      movieTrailer: '',
      movieSynopsis: '',
      movieGenres: [],
      showings: this._formBuilder.array([])
    });
  }

  showings(): FormArray {
    return this.movieForm.get('showings') as FormArray;
  }

  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.genres.push({name: value});
    }

    event.chipInput!.clear();
  }

  remove(genre: Genre): void {
    const index = this.genres.indexOf(genre);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  createShowing(): FormGroup {
    return this._formBuilder.group({
      date: '',
      time: '',
      roomId: ''
    });
  }

  addShowing(): void {
    this.showings().push(this.createShowing());
    this.movieForm.controls['movieGenres'].setValue(JSON.stringify(this.genres));
  }

  removeShowing(i: number) {
    this.showings().removeAt(i);
  }

  submitMovie() {
    console.log(this.genres);
    console.log(this.movieForm.value);
  }
}

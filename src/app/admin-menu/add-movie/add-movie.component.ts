import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/model/genre';
import { Movie } from 'src/app/model/movie';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Showing } from 'src/app/model/showing';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AddMovieService } from './add-movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  movieForm: FormGroup;
  movie: Movie = new Movie();
  genres: Genre[] = [];
  showingList: Showing[] = [];

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;

  constructor(private _formBuilder: FormBuilder, private _service: AddMovieService) { }

  ngOnInit(): void {
    this.movieForm = this._formBuilder.group({
      movieTitle: '',
      movieDirector: '',
      movieProducer: '',
      movieRating: '',
      movieDuration: '',
      movieTrailerPic: '',
      movieTrailerVid: '',
      movieSynopsis: '',
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
  }

  removeShowing(i: number) {
    this.showings().removeAt(i);
  }

  submitMovie() {
    console.log(this.movieForm.value);
    this.movie.title = this.movieForm.value['movieTitle'];
    this.movie.director = this.movieForm.value['movieDirector'];
    this.movie.producer = this.movieForm.value['movieProducer'];
    this.movie.rating = this.movieForm.value['movieRating'];
    this.movie.trailerpic = this.movieForm.value['movieTrailerPic'];
    this.movie.trailervid = this.movieForm.value['movieTrailerVid'];
    this.movie.synopsis = this.movieForm.value['movieSynopsis'];
    this.movie.duration = this.movieForm.value['movieDuration'];
    this.showingList = this.movieForm.value['showings'];

    console.log('movie ' + this.movie);
    console.log('genres ' + this.genres);
    console.log('showingList ' + this.showingList);

    // call service method to save information to database
    this._service.addMovieInfoFromRemote(this.movie).subscribe(
      data => {
        console.log('works');
    }, error => {
        console.log('dont work');
    });
  }
}

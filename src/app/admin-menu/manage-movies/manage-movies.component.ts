import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/model/genre';
import { Movie } from 'src/app/model/movie';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Showing } from 'src/app/model/showing';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ManageMoviesService } from './manage-movies.service';

@Component({
  selector: 'app-manage-movies',
  templateUrl: './manage-movies.component.html',
  styleUrls: ['./manage-movies.component.scss']
})
export class ManageMoviesComponent implements OnInit {

  movieForm: FormGroup;
  movie: Movie = new Movie();
  genres: Genre[] = [];
  showingList: Showing[] = [
    new Showing(new Date('12-23-21'), new Date('12-23-21T00:00:00'))
  ];

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;


  constructor(private _formBuilder: FormBuilder, private _service: ManageMoviesService) { }

  ngOnInit(): void {
    this.movieForm = this._formBuilder.group({
      movieId: '',
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

    this.movie.mid = this.movieForm.value['movieId'];
    this.movie.title = this.movieForm.value['movieTitle'];
    this.movie.director = this.movieForm.value['movieDirector'];
    this.movie.producer = this.movieForm.value['movieProducer'];
    this.movie.rating = this.movieForm.value['movieRating'];
    this.movie.trailerpic = this.movieForm.value['movieTrailerPic'];
    this.movie.trailervid = this.movieForm.value['movieTrailerVid'];
    this.movie.synopsis = this.movieForm.value['movieSynopsis'];
    this.movie.duration = this.movieForm.value['movieDuration'];
    this.showingList = this.movieForm.value['showings'];
    this.showingList.forEach(show => {
      show.movieid = this.movieId;
    })

    console.log('movie ' + this.movie);
    console.log('genres ' + this.genres);
    console.log('showingList ' + this.showingList);

    // call service methods save the changes to movie, genres, and showingList, respectively, to the database
  }

  findByMovieId(movieId: number) {
    this._service.getMovieInfoFromRemote(this.movieForm.value['movieId']).subscribe(
      data => {
        console.log(data['director']);
        this.movieForm.value['movieTitle'] = data['title']
        this.movieForm.value['movieDirector'] = data['director']

        // set all fields
        // set genre array
        // set showing array
      }
    );
  }

  get movieId() {
    return this.movieForm.value['movieId'];
  }

  get movieTitle() {
    return this.movieForm.value['movieTitle'];
  }

  get movieDirector() {
    return this.movieForm.value['movieDirector'];
  }

  get shows() {
    return this.movieForm.value['showings'];
  }
}

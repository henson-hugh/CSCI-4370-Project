import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/model/genre';
import { Movie } from 'src/app/model/movie';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Showing } from 'src/app/model/showing';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ManageMoviesService } from './manage-movies.service';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-movies',
  templateUrl: './manage-movies.component.html',
  styleUrls: ['./manage-movies.component.scss']
})
export class ManageMoviesComponent implements OnInit {

  movieForm: FormGroup;
  movie: Movie = new Movie();
  genres: Genre[] = [];
  showingList: Showing[] = [];

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;


  constructor(private _formBuilder: FormBuilder, private _service: ManageMoviesService, private _router: Router) { }

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
      roomid: ''
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
    this.movie.title = this.movieForm.controls.movieTitle.value;
    this.movie.director = this.movieForm.controls.movieDirector.value;
    this.movie.producer = this.movieForm.controls.movieProducer.value;
    this.movie.rating = this.movieForm.controls.movieRating.value;
    this.movie.trailerpic = this.movieForm.controls.movieTrailerPic.value;
    this.movie.trailervid = this.movieForm.controls.movieTrailerVid.value;
    this.movie.synopsis = this.movieForm.controls.movieSynopsis.value;
    this.movie.duration = this.movieForm.controls.movieDuration.value;
    this.showingList = this.movieForm.value['showings'];
    this.showingList.forEach(show => {
      show.movieid = this.movieId;
    })

    console.log('movie ' + this.movie);
    console.log('genres ' + this.genres);
    console.log('showingList ' + this.showingList);


    this._service.editMovieInfoFromRemote(this.movie).subscribe(
      data => {

      }
    )

    this.genres.forEach((genre: Genre) => {
      this._service.editGenreInfoFromRemote(genre.name, this.movieId).subscribe(
        data =>{

        },
        error => {
          console.log("exists, or something wrong");
        }
      )
    })

    this.showingList.forEach(show => {
      this._service.editShowingInfoFromRemote(show).subscribe(
        data =>{

        }
      )
    });

    this._router.navigate(['/home']);
  }

  findByMovieId(movieId: number) {
    this._service.getMovieInfoFromRemote(this.movieForm.value['movieId']).subscribe(
      data => {
        this.movieForm.controls.movieTitle.setValue(data.movie['title']);
        this.movieForm.controls.movieDirector.setValue(data.movie['director']);
        this.movieForm.controls.movieProducer.setValue(data.movie['producer']);
        this.movieForm.controls.movieRating.setValue(data.movie['rating']);
        this.movieForm.controls.movieTrailerPic.setValue(data.movie['trailerpic']);
        this.movieForm.controls.movieTrailerVid.setValue(data.movie['trailervid']);
        this.movieForm.controls.movieSynopsis.setValue(data.movie['synopsis']);
        this.movieForm.controls.movieDuration.setValue(data.movie['duration']);

        data.genres.forEach((element: any) =>{
          this.genres.push({name: element['name']});
        })

        data.showings.forEach((element: any) =>{

          var d = new Date(element['date']);

          this.showings().push(this._formBuilder.group({
            date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() + d.getTimezoneOffset()).toISOString(),
            time: element['time'],
            roomid: element['roomid']
          }))
        })

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

  get movieProducer() {
    return this.movieForm.value['movieProducer'];
  }

  get movieDuration() {
    return this.movieForm.value['movieDuration'];
  }

  get movieRating() {
    return this.movieForm.value['movieRating'];
  }

  get movieSynopsis() {
    return this.movieForm.value['movieSynopsis'];
  }

  get movieTrailerPic() {
    return this.movieForm.value['movieTrailerPic'];
  }

  get movieTrailerVid() {
    return this.movieForm.value['movieTrailerVid'];
  }

  get shows() {
    return this.movieForm.value['showings'];
  }
}

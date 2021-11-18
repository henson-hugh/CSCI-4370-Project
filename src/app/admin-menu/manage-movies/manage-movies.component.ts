import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/model/genre';
import { Movie } from 'src/app/model/movie';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-manage-movies',
  templateUrl: './manage-movies.component.html',
  styleUrls: ['./manage-movies.component.scss']
})
export class ManageMoviesComponent implements OnInit {

  movie: Movie = new Movie();
  genres: Genre[] = [];
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;


  constructor() { }

  ngOnInit(): void {
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
}

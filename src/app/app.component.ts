import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pigeon Theatres';
  greeting = {'id': 'XXX', 'content': 'Hello World'};
}

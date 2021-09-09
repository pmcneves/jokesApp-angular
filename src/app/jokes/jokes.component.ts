import { Component, OnInit } from '@angular/core';
import { faLaugh } from '@fortawesome/free-regular-svg-icons';
import { Joke } from '../models/JokesModel';
import { JokesService } from '../services/jokes/jokes.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {
  faLaugh = faLaugh;
  joke: Joke;
  loading: boolean = false;
  showJoke: boolean = false

  constructor(private jokesService: JokesService) { }

  ngOnInit(): void {
  }

  gettingJokes() {
    this.loading = true;
    this.jokesService.getJokes().subscribe(data => {
      this.joke = data;
      this.loading = false;
      this.showJoke = true;
    })
  }
}

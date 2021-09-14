import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  faStar = faStar;
  starRating = new Array(5);
  selectedRate: number = 1;
  hover: number | null;
  @Output() addToFavouritesClicked = new EventEmitter();


  constructor() {}

  ngOnInit(): void {}

  setStarRating(rating: number) {
    this.selectedRate = rating;
  }

  onStarHover(rating: number) {
    this.hover = rating;
  }

  onStarLeave() {
    this.hover = null;
  }

  addToFavouritesModalClick() {
    this.addToFavouritesClicked.emit();
  }
}

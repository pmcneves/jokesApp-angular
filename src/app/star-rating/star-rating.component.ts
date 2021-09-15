import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
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
  @Output() selectedStarRating = new EventEmitter<number>();
  @Input() starRatingFromStore: number | undefined;
  @Input() isFromLibrary: boolean;

  constructor() {}

  ngOnInit(): void {
    if (this.isFromLibrary)
      this.selectedRate = this.starRatingFromStore as number;
  }

  defineStarRating(rating: number) {
    this.selectedRate = rating;
    this.selectedStarRating.emit(rating);
  }

  onStarHover(rating: number) {
    this.hover = rating;
  }

  onStarLeave() {
    this.hover = null;
  }
}

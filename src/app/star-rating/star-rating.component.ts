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
  @Input() reset = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.starRatingFromStore, this.isFromLibrary);
    if (this.isFromLibrary) {
      this.selectedRate = this.starRatingFromStore as number;
    }
  }
  ngOnChanges(changes: any) {
    if (this.reset) {
      this.resetStars();
    }
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

  resetStars() {
    this.selectedRate = 1;
    this.hover = null;
  }
}

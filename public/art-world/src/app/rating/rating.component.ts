import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent {
  @Input()
  rating!: number;
  stars!: number[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['rating'] && changes['rating'].currentValue) {
      this.stars = new Array(Math.ceil(this.rating));
    }
  }
}

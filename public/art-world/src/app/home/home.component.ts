import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  slides: string[];
  currentSlide!: number;

  constructor() {
    this.slides = [
      'https://magma.com/images/credit-comments.ce0b74691754b27ac4656fc82f54cfc8.png',
      'https://magma.com/images/credit-art.e678fa3825f5488ee2681419f56e42d9.png',
    ];
    this.currentSlide = 0;
  }

  ngOnInit(): void {}

  slideNext() {
    this.slides.push(this.slides.shift() || '');
  }

  slidePrevious() {
    this.slides.unshift(this.slides.pop() || '');
  }

  setCurrentSlide(slideIndex: number) {
    this.slides.unshift(...this.slides.splice(slideIndex));
    console.log(this.slides);

  }
}

import { Component, OnInit } from '@angular/core';
import { ArtistsDataService } from '../artists-data.service';

export class Artist {
  _id!: string;
  name!: string;
  dateOfBirth!: string;
  rating!: number;
  cost!: number;
  location!: {
    address: string;
    coordinates: [number, number];
  };
  email!: string;
  arts!: Art[];

  constructor() {}
}

export class Art {
  title!: string;
  type!: string;

  constructor() {}
}

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
})
export class ArtistsComponent implements OnInit {
  artists!: Artist[];

  constructor(private _artistsService: ArtistsDataService) {}

  ngOnInit(): void {
    this.setArtists();
  }

  setArtists() {
    this._artistsService.getAll().subscribe({
      next: (list) => this.fillArtists(list),
      error: (error) => this.errorGettingArtists(error),
    });
  }

  fillArtists(artists: Artist[]) {
    this.artists = artists;
  }

  errorGettingArtists(error: Error) {
    console.error(error);
  }
}

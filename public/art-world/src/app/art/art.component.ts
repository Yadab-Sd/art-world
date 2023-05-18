import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistsDataService } from '../artists-data.service';
import { Artist } from '../artists/artists.component';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css'],
})
export class ArtComponent implements OnInit {
  artist!: Artist;

  constructor(
    private _artistsService: ArtistsDataService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setArtist();
  }

  setArtist() {
    const artistId: string = this.activedRoute.params;
    this._artistsService.getOne(artistId).subscribe({
      next: (list) => this.fillArtist(list),
      error: (error) => this.errorGettingArtist(error),
    });
  }

  fillArtist(artist: Artist) {
    this.artist = artist;
  }

  errorGettingArtist(error: Error) {
    console.error(error);
  }
}

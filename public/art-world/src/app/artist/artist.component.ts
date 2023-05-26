import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Message,
  MessageType,
} from '../artist-form-drawer/artist-form-drawer.component';
import { ArtistsDataService } from '../artists-data.service';
import { Action, Art, Artist } from '../artists/artists.component';
import { ArtsDataService } from '../arts-data.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit {
  artist!: Artist;
  message!: Message;
  visibleSideDrawer!: boolean;
  visibleArtFormModal!: boolean;
  selectedArtForUpdate!: Art;
  artAction!: Action;

  constructor(
    private _artistsService: ArtistsDataService,
    private _artsService: ArtsDataService,
    private activedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.visibleSideDrawer = false;
    this.visibleArtFormModal = false;
  }

  ngOnInit(): void {
    this.setArtist();
  }

  setArtist() {
    const artistId: string = this.activedRoute.snapshot.params['artistId'];
    this._artistsService.getOne(artistId).subscribe({
      next: (artist) => this.fillArtist(artist),
      error: (error) => this.errorGettingArtist(error),
    });
  }

  fillArtist(artist: Artist) {
    this.artist = artist;
  }

  errorGettingArtist(error: Error) {
    console.error(error);
  }

  updateOne(form: FormGroup) {
    const data = form.value;
    this._artistsService.updateOne(this.artist._id, data).subscribe({
      error: (error) => {
        this.setMessage(error.error.message, 'error');
        console.error(error);
      },
      complete: () => {
        this.setMessage('Artist updated successfully!', 'success');
        this.setArtist();
      },
    });
  }

  setMessage(text: string, type?: MessageType) {
    this.message = {
      type: type,
      text: text,
    };
  }

  openDrawer() {
    this.visibleSideDrawer = true;
  }

  closeDrawer() {
    this.visibleSideDrawer = false;
    this.setMessage('');
  }

  deleteOne() {
    this._artistsService.deleteOne(this.artist._id).subscribe({
      error: (error) => {
        this.setMessage(error.error.message, 'error');
        console.error(error);
      },
      complete: () => {
        this._router.navigate(['/artists']);
      },
    });
  }

  openModalForAddArt() {
    this.visibleArtFormModal = true;
    this.artAction = 'add';
  }

  openModalForUpdateArt(art: Art) {
    this.selectedArtForUpdate = art;
    this.visibleArtFormModal = true;
    this.artAction = 'edit';
  }

  closeArtFormModal() {
    this.selectedArtForUpdate = new Art('', '');
    this.visibleArtFormModal = false;
  }

  removeOneArt(art: Art) {
    this._artsService.deleteOne(this.artist._id, art._id).subscribe({
      error: (error) => {
        this.setMessage(error.error.message, 'error');
        console.error(error);
      },
      complete: () => {
        this.setArtist();
      },
    });
  }
}

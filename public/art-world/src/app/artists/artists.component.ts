import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import {
  Message,
  MessageType,
} from '../artist-form-drawer/artist-form-drawer.component';
import { ArtistsDataService } from '../artists-data.service';

export class Artist {
  _id!: string;
  name!: string;
  dateOfBirth!: string;
  rating!: number;
  cost!: number;
  image!: string;
  location!: {
    address: string;
    coordinates: [number, number];
  };
  email!: string;
  arts!: Art[];

  constructor(
    name: string,
    dateOfBirth: string,
    rating: number,
    cost: number,
    image: string,
    email: string,
    address: string,
    coordinates: [number, number]
  ) {
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.rating = rating;
    this.cost = cost;
    this.image = image;
    this.email = email;
    this.location = {
      address: address,
      coordinates: coordinates,
    };
  }
}

export class Art {
  _id!: string;
  title!: string;
  image!: string;

  constructor(title: string, image: string) {
    this.title = title;
    this.image = image;
  }

  fillData(data: any) {
    this.title = data.title;
    this.image = data.image;
  }

  toJSON(art: Art) {
    const stringData =
      '{"title":"' + art.title + '", "image":"' + art.image + '"}';
    return JSON.parse(stringData);
  }
}

export type Action = 'add' | 'edit';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
})
export class ArtistsComponent implements OnInit {
  artists!: Artist[];
  visibleSideDrawer!: boolean;
  message!: Message;
  limit!: number;
  offset!: number;
  selectedArtist!: Artist;
  showConfirm!: boolean;
  action!: Action;

  constructor(private _artistsService: ArtistsDataService) {
    this.visibleSideDrawer = false;
    this.limit = 6;
    this.offset = 0;
  }

  ngOnInit(): void {
    this.setArtists();
  }

  setArtists() {
    this._artistsService.getAll(this.offset, this.limit).subscribe({
      next: (artistList) => this.fillArtists(artistList),
      error: (error) => this.errorGettingArtists(error),
    });
  }

  fillArtists(artists: Artist[]) {
    this.artists = artists;
  }

  errorGettingArtists(error: Error) {
    console.error(error);
  }

  openDrawerForEdit() {
    this.action = 'edit';
    this.visibleSideDrawer = true;
  }

  openDrawerForAdd() {
    this.action = 'add';
    this.visibleSideDrawer = true;
  }

  closeDrawer() {
    this.visibleSideDrawer = false;
    this.selectedArtist = new Artist('', '', 0, 0, '', '', '', [0, 0]);
    this.setMessage('');
  }

  createOne(form: FormGroup) {
    const data = form.value;
    this._artistsService.createOne(data).subscribe({
      error: (error) => {
        this.setMessage(error.error.message, 'error');
        console.error(error);
      },
      complete: () => {
        this.setMessage('Artist created successfully!', 'success');
        form.reset();
        this.setArtists();
      },
    });
  }

  updateOne(form: FormGroup) {
    const data = form.value;
    this._artistsService.updateOne(this.selectedArtist._id, data).subscribe({
      error: (error) => {
        this.setMessage(error.error.message, 'error');
        console.error(error);
      },
      complete: () => {
        this.setMessage('Artist updated successfully!', 'success');
        this.setArtists();
      },
    });
  }

  deleteOne(artistId: string) {
    this._artistsService.deleteOne(artistId).subscribe({
      error: (error) => {
        this.setMessage(error.error.message, 'error');
        console.error(error);
      },
      complete: () => {
        this.setArtists();
      },
    });
  }

  onSubmit(form: FormGroup) {
    if (this.action == 'edit') {
      this.updateOne(form);
    } else {
      this.createOne(form);
    }
  }

  onLimitChange(e: Event) {
    this.limit = parseInt((e.target as HTMLSelectElement).value);
    this.setArtists();
  }

  onPrev() {
    this.offset = Math.max(0, this.offset - 1);
    this.setArtists();
  }

  onNext() {
    this.offset += 1;
    this.setArtists();
  }

  setMessage(text: string, type?: MessageType) {
    this.message = {
      type: type,
      text: text,
    };
  }

  onEdit(artist: Artist) {
    this.selectedArtist = artist;
    this.openDrawerForEdit();
  }

  makeConfirm(artistId: string) {
    this.showConfirm = true;
    this.deleteOne(artistId);
  }
}

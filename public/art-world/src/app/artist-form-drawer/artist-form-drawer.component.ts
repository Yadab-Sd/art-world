import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Action, Artist } from '../artists/artists.component';

export type MessageType = 'error' | 'success';
export type Message = {
  type?: MessageType;
  text: string;
};

@Component({
  selector: 'app-artist-form-drawer',
  templateUrl: './artist-form-drawer.component.html',
  styleUrls: ['./artist-form-drawer.component.css'],
})
export class ArtistFormDrawerComponent implements OnChanges {
  artistForm!: FormGroup;
  validationMessage!: string;
  artist!: Artist;

  @Input()
  visible!: boolean;
  @Input()
  serverMessage!: Message;
  @Input()
  action!: Action;
  @Input()
  artistData!: Artist;
  @Output()
  onSubmit = new EventEmitter<FormGroup>();
  @Output()
  onClose = new EventEmitter<void>();

  constructor() {
    this.visible = false;
    this.validationMessage = '';
    this.artist = new Artist('', '', 0, 0, '', '', '', [0, 0]);
    this.action = 'add';
  }

  ngOnInit(): void {
    this.initializeCreateNewOneForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes['artistData'] &&
      changes['artistData'].currentValue
    ) {
      this.artist = this.artistData;
      this.initializeCreateNewOneForm();
    }
  }

  initializeCreateNewOneForm() {
    this.artistForm = new FormGroup({
      name: new FormControl(this.artist.name, [Validators.required]),
      email: new FormControl(this.artist.email, [
        Validators.required,
        Validators.email,
      ]),
      dateOfBirth: new FormControl(this.artist.dateOfBirth, [
        Validators.required,
      ]),
      rating: new FormControl(this.artist.rating, [
        Validators.required,
        Validators.min(0),
        Validators.min(5),
      ]),
      image: new FormControl(this.artist.image),
      cost: new FormControl(this.artist.cost, [
        Validators.required,
        Validators.min(0),
      ]),
      location: new FormGroup({
        address: new FormControl(this.artist.location.address),
        coordinates: new FormArray([
          new FormControl(this.artist.location.coordinates[0], [
            Validators.required,
          ]),
          new FormControl(this.artist.location.coordinates[1], [
            Validators.required,
          ]),
        ]),
      }),
    });
  }

  closeDrawer() {
    this.onClose.emit();
  }

  submitForm() {
    this.onSubmit.emit(this.artistForm);
  }
}

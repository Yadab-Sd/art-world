import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Message,
  MessageType,
} from '../artist-form-drawer/artist-form-drawer.component';
import { ArtistsDataService } from '../artists-data.service';
import { Action, Art } from '../artists/artists.component';
import { ArtsDataService } from '../arts-data.service';

@Component({
  selector: 'app-art-form-modal',
  templateUrl: './art-form-modal.component.html',
  styleUrls: ['./art-form-modal.component.css'],
})
export class ArtFormModalComponent {
  artForm!: FormGroup;
  validationMessage!: string;
  serverMessage!: Message;
  art!: Art;
  artistId!: string;

  @Input()
  visible: boolean;
  @Input()
  artData!: Art;
  @Input()
  action!: Action;
  @Output()
  onClose = new EventEmitter<void>();
  @Output()
  afterSubmit = new EventEmitter<void>();

  constructor(
    private _artsService: ArtsDataService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.visible = false;
    this.validationMessage = '';
    this.art = new Art('', '');
    this.action = 'add';
  }

  ngOnInit(): void {
    this.artistId = this._activatedRoute.snapshot.params['artistId'];
    this.initializeCreateNewOneForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['artData'] && changes['artData'].currentValue) {
      this.art.fillData(this.artData);
      this.initializeCreateNewOneForm();
    }
  }

  initializeCreateNewOneForm() {
    this.artForm = new FormGroup({
      title: new FormControl(this.art.title, [Validators.required]),
      image: new FormControl(this.art.image, [Validators.required]),
    });
  }

  closeArtFormModal() {
    this.onClose.emit();
  }

  submitForm() {
    const jsonData = this.art.fillData(this.artForm.value);
    console.log(jsonData, this.artForm);
    if (this.action == 'edit') {
      this.updateOne(this.artForm);
    } else {
      this.createOne(this.artForm);
    }
  }

  createOne(form: FormGroup) {
    const data = form.value;
    this._artsService.createOne(this.artistId, data).subscribe({
      error: (error) => {
        this.setMessage(error.error.message, 'error');
        console.error(error);
      },
      complete: () => {
        this.setMessage('Art created successfully!', 'success');
        form.reset();
        this.afterSubmit.emit();
      },
    });
  }

  updateOne(form: FormGroup) {
    const data = form.value;
    this._artsService
      .updateOne(this.artistId, this.artData._id, data)
      .subscribe({
        error: (error) => {
          this.setMessage(error.error.message, 'error');
          console.error(error);
        },
        complete: () => {
          this.setMessage('Art updated successfully!', 'success');
          this.afterSubmit.emit();
        },
      });
  }

  deleteOne(artistId: string) {
    this._artsService.deleteOne(this.artistId, artistId).subscribe({
      error: (error) => {
        this.setMessage(error.error.message, 'error');
        console.error(error);
      },
      complete: () => {
        this.afterSubmit.emit();
      },
    });
  }

  setMessage(text: string, type?: MessageType) {
    this.serverMessage = {
      type: type,
      text: text,
    };
  }
}

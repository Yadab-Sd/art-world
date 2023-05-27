import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtsComponent } from './arts/arts.component';
import { ArtComponent } from './art/art.component';
import { ArtistComponent } from './artist/artist.component';
import { routes } from './app.router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { RatingComponent } from './rating/rating.component';
import { ArtistFormDrawerComponent } from './artist-form-drawer/artist-form-drawer.component';
import { ArtFormModalComponent } from './art-form-modal/art-form-modal.component';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ArtistsComponent,
    ArtsComponent,
    ArtComponent,
    ArtistComponent,
    ErrorPageComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    RatingComponent,
    ArtistFormDrawerComponent,
    ArtFormModalComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

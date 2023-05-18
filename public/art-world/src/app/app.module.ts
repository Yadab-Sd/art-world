import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule, ActivatedRoute],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

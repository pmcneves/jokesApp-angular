import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokesComponent } from './jokes/jokes.component';
import { LibraryComponent } from './library/library.component';
import { JokeComponent } from './joke/joke.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { JokeState } from './state/jokes.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    JokesComponent,
    LibraryComponent,
    JokeComponent,
    ModalComponent,
    StarRatingComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxsModule.forRoot([JokeState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule, MatCardModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './containers/scoreboard/scoreboard.component';
import { PlayerRowComponent } from './components/player-row/player-row.component';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot([
      { path: '', component: ScoreboardComponent },
    ]),
    HttpClientModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
  ],
  providers: [],
  declarations: [
    AppComponent,
    ScoreboardComponent,
    PlayerRowComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

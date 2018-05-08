import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { withLatestFrom, map } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {

  players$ = this.db.collection('players').valueChanges().pipe(
    withLatestFrom(this.http.get('assets/AllCards-x.json'), this.http.get('assets/AllSets-x.json')),
    map(([players, cards, sets]) => players.map(player => {
      const commander = cards[player['commander']];
      const commanderSet = sets[commander['printings'][commander['printings'].length - 1]];
      const commanderNumber = commanderSet['cards'].filter(card => card['name'] === commander['name'])[0]['number'];

      return {
        ...player,
        colours: commander['colors'],
        image: 'https://img.scryfall.com/cards/art_crop/en/' + commanderSet['code'].toLowerCase() + '/' + commanderNumber + '.jpg',
      };
    })),
  );

  constructor(private db: AngularFirestore, private http: HttpClient) {}

}

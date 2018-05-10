import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { withLatestFrom, map, tap } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

interface StorePlayer {
  name: string;
  commander: string;
  score: number;
}

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {

  tables = 3;
  tableArray = Array.from(Array(this.tables).keys());

  constructor(private db: AngularFirestore, private http: HttpClient) {}

  players$ = this.db.collection<StorePlayer>('players').valueChanges().pipe(
    withLatestFrom(this.http.get('assets/AllCards-x.json'), this.http.get('assets/AllSets-x.json')),
    map(([players, cards, sets]) => players
      .map(player => {
        const commander = cards[player['commander'].trim()];
        const commanderSet = sets[commander['printings'][commander['printings'].length - 1]];
        const commanderNumber = commanderSet['cards'].filter(card => card['name'] === commander['name'])[0]['number'];

        console.log(player);

        return {
          ...player,
          colours: commander['colors'],
          image: 'https://img.scryfall.com/cards/art_crop/en/' + commanderSet['code'].toLowerCase() + '/' + commanderNumber + '.jpg',
        };
      })
      .sort((playerA, playerB) => playerB['score'] - playerA['score'])
    ),
    map(players =>
      players.reduce((playersIntoTables, player, index) => {
        const playersPerTable = Math.ceil(players.length / this.tables);
        if (index % playersPerTable + 1 === playersPerTable && index !== 0) {
          playersIntoTables.push([]);
        }
        playersIntoTables[playersIntoTables.length - 1].push(player);

        return playersIntoTables;
      }, [[]])
    ),
    tap(console.log),
  );
}

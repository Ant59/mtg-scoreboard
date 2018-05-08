import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

const MTG_COLOURS = {
  'White': '#FFFBD5',
  'Blue': '#AAE0FA',
  'Black': '#CBC2BF',
  'Red': '#F9AA8F',
  'Green': '#9BD3AE',
}

@Component({
  selector: 'app-player-row',
  templateUrl: './player-row.component.html',
  styleUrls: ['./player-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerRowComponent {

  @Input() player;

}

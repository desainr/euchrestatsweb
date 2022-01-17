import {Component, Inject} from '@angular/core';
import {Game, Location, Player, Team, TeamStats} from "../../../models/models";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import * as moment from "moment";

@Component({
  selector: 'game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent {
  availablePlayers: Player[] = [...this.data.players];
  winningP1: Player;
  winningP2: Player;
  losingP1: Player;
  losingP2: Player;
  winningScore: number = 0;
  losingScore: number = 0;
  notes: string;
  location: string;
  date: Date = new Date();

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private _bottomSheetRef: MatBottomSheetRef<GameFormComponent>) { }

  ngOnInit() {
  }

  cancelSubmit() {
    this._bottomSheetRef.dismiss();
  }

  submit() {
    const game = new Game();
    const winningTeam = new Team();
    winningTeam.Players = [this.winningP1, this.winningP2]
    winningTeam.Score = this.winningScore;
    const winningTeamMatch: TeamStats = this.data.teams.find((t: TeamStats) => t.Players.every(p => p.UID === this.winningP1.UID || p.UID === this.winningP2.UID))
    winningTeam.UID = winningTeamMatch.UID;

    const losingTeam = new Team();
    losingTeam.Players = [this.losingP1, this.losingP2]
    losingTeam.Score = this.losingScore;

    const losingTeamMatch: TeamStats = this.data.teams.find((t: TeamStats) => t.Players.every(p => p.UID === this.losingP1.UID || p.UID === this.losingP2.UID))
    losingTeam.UID = losingTeamMatch.UID;

    const location = new Location();
    location.Description = this.location;

    game.Location = location;
    game.WinningTeam = winningTeam;
    game.LosingTeam = losingTeam;
    game.Datetime = this.date;

    this._bottomSheetRef.dismiss(game);
  }

  set dateTimeLocal(value) {
    this.date = moment(value).toDate();
  }

  get dateTimeLocal(): string {
    return moment(this.date).format('yyyy-MM-DDTHH:mm');
  }

}

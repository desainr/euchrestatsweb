import {Component, Inject} from '@angular/core';
import {Game, Location, Player, Team, TeamStats} from "../../../models/models";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import * as moment from "moment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorListComponent} from "../error-list/error-list.component";

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
  useCurrentLocation: boolean = true;
  date: Date = new Date();

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private _bottomSheetRef: MatBottomSheetRef<GameFormComponent>, private _matSnackBar: MatSnackBar) { }

  ngOnInit() {
  }

  cancelSubmit() {
    this._bottomSheetRef.dismiss();
  }

  validateForm(): boolean {
    const errors = [];

    if (this.winningScore < 10) {
      errors.push('Winning score must be 10 or greater.')
    }

    if (this.winningScore < 0 || this.losingScore < 0) {
      errors.push('Score cannot be negative.')
    }

    if (this.winningScore < this.losingScore) {
      errors.push('Winning score cannot be less than losing score.');
    }

    if (this.date > new Date()) {
      errors.push('Game cannot be in the future');
    }

    if (this.winningP1 && this.winningP2 && this.losingP1 && this.losingP2) {
      const selectedPlayers = new Set([this.winningP1.UID, this.winningP2.UID, this.losingP1.UID, this.losingP2.UID]);

      if (selectedPlayers.size < 4) {
        errors.push('Cannot select players multiple times.');
      }
    } else {
      errors.push('Not enough players selected.')
    }

    if (errors.length) {
      this._matSnackBar.openFromComponent(ErrorListComponent, {data: {errors}})

      return false;
    }

    return true;
  }

  submit() {
    if (this.validateForm()) {
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
      game.Notes = this.notes;

      this._bottomSheetRef.dismiss({game, useCurrentLocation: this.useCurrentLocation});
    }
  }

  set dateTimeLocal(value) {
    this.date = moment(value).toDate();
  }

  get dateTimeLocal(): string {
    return moment(this.date).format('yyyy-MM-DDTHH:mm');
  }

}

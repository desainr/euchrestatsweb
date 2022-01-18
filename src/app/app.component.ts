import { Component } from '@angular/core';
import {DatabaseService} from "../services/database.service";
import {Game, Player, TeamStats} from "../models/models";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {GameFormComponent} from "./components/game-form/game-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LocationService} from "../services/location.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EuchreStats';
  games: Game[];
  players: Player[];
  teams: TeamStats[];
  geolocation: GeolocationPosition;

  selectedIndex: number = 0;

  constructor(private _databaseService: DatabaseService, private _bottomSheet: MatBottomSheet, private _snackBar: MatSnackBar, private _locationService: LocationService) {
    this._databaseService.getGames().subscribe(games => {
      this.games = games;
    });

    this._databaseService.getPlayers().subscribe(players => {
      this.players = players;
    });

    this._databaseService.getTeamStats().subscribe(teams => {
      this.teams = teams;
    });

    this._locationService.getLocation().subscribe(position => {
      this.geolocation = position;
    })

  }

  openGameForm() {
    const ref = this._bottomSheet.open(GameFormComponent, { data: {players: this.players, teams: this.teams }});

    ref.afterDismissed().subscribe(({game, useCurrentLocation}) => {
      if (game) {
        if (this.geolocation && useCurrentLocation) {
          game.Location.Latitude = this.geolocation.coords.latitude;
          game.Location.Longitude = this.geolocation.coords.longitude;
        }
        this._databaseService.addGame(game).subscribe(dbResult => {
          if (dbResult && dbResult.UID) {
            this.updateDataLists(game);
            this._snackBar.open('Game saved successfully', 'Ok', {duration: 3000})
          }
        });
      }
    })
  }

  updateDataLists(game: Game) {
    this.games.push(game);
    this.games.sort(Game.sortByDateDesc);

    const winningTeamIndex = this.teams.findIndex(t => t.UID === game.WinningTeam.UID);
    this.teams[winningTeamIndex].Wins++;

    const losingTeamIndex = this.teams.findIndex(t => t.UID === game.LosingTeam.UID);
    this.teams[losingTeamIndex].Losses++;

    const winningPlayer1Index = this.players.findIndex(p => p.UID === game.WinningTeam.Players[0].UID);
    const winningPlayer2Index = this.players.findIndex(p => p.UID === game.WinningTeam.Players[1].UID);

    const losingPlayer1Index = this.players.findIndex(p => p.UID === game.LosingTeam.Players[0].UID);
    const losingPlayer2Index = this.players.findIndex(p => p.UID === game.LosingTeam.Players[1].UID);

    this.players[winningPlayer1Index].Wins++;
    this.players[winningPlayer2Index].Wins++;
    this.players[losingPlayer1Index].Losses++;
    this.players[losingPlayer2Index].Losses++;
  }
}

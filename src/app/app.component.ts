import { Component } from '@angular/core';
import {DatabaseService} from "../services/database.service";
import {Game, Player, TeamStats} from "../models/models";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {GameFormComponent} from "./components/game-form/game-form.component";

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

  selectedIndex: number = 0;

  constructor(private _databaseService: DatabaseService, private bottomSheet: MatBottomSheet) {
    this._databaseService.getGames().subscribe(games => {
      this.games = games
    });

    this._databaseService.getPlayers().subscribe(players => {
      this.players = players;
    });

    this._databaseService.getTeamStats().subscribe(teams => {
      this.teams = teams;
    });

  }

  openGameForm() {
    const ref = this.bottomSheet.open(GameFormComponent, { data: {players: this.players, teams: this.teams }});

    ref.afterDismissed().subscribe((game: Game) => {
      if (game) {
        this._databaseService.addGame(game);
      }
    })
  }
}

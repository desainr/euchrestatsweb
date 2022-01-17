import { Injectable } from '@angular/core';
import {Game, Player, Team, TeamStats} from "../models/models";
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private httpClient: HttpClient) { }

  public getGames(): Observable<Game[]> {
    const obs = forkJoin([this.httpClient.get('./assets/euchreapp-457bb-export.json'), this.getPlayers()]);

    return obs.pipe(map(([gamesJson, players]) => {
      const games = gamesJson['Games'];

      return Object.entries(games).map((g: object) => Game.fromJSON(g, players));
    }));
  }

  public getTeamStats(): Observable<TeamStats[]> {
    const obs = forkJoin([this.httpClient.get('./assets/euchreapp-457bb-export.json'), this.getPlayers()]);

    return obs.pipe(map(([teamsJson, players]) => {
      const teams = teamsJson['Teams'];

      return Object.entries(teams).map((t: object) => TeamStats.fromJSON(t, players));
    }));
  }

  public getPlayers(): Observable<Player[]> {
    return this.httpClient.get('./assets/euchreapp-457bb-export.json').pipe(map((json: object) => {
      const players = json['Players'];

      return Object.entries(players).map((p: object) => Player.fromJSON(p));
    }))
  }

  public addGame(game: Game): void {
    console.log(game);
  }
}

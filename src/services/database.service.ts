import { Injectable } from '@angular/core';
import {Game, Player, Team, TeamStats} from "../models/models";
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

const BASE_API_URL = 'https://euchrestatsapi.azurewebsites.net/api/';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private httpClient: HttpClient) { }

  public getGames(): Observable<Game[]> {
    const obs = forkJoin([this.httpClient.get(BASE_API_URL + 'games'), this.getPlayers()]);

    return obs.pipe(map(([gamesJson, players]) => {
      const games = gamesJson['games'];

      return Object.entries(games).map((g: object) => Game.fromJSON(g, players));
    }));
  }

  public getTeamStats(): Observable<TeamStats[]> {
    const obs = forkJoin([this.httpClient.get(BASE_API_URL + 'teams'), this.getPlayers()]);

    return obs.pipe(map(([teamsJson, players]) => {
      const teams = teamsJson['teams'];

      return Object.entries(teams).map((t: object) => TeamStats.fromJSON(t, players));
    }));
  }

  public getPlayers(): Observable<Player[]> {
    return this.httpClient.get(BASE_API_URL + 'players').pipe(map((json: object) => {
      const players = json['players'];

      return Object.entries(players).map((p: object) => Player.fromJSON(p));
    }))
  }

  public addGame(game: Game): Observable<Game> {
    return this.httpClient.post(BASE_API_URL + 'games', game.toJson()).pipe(map(gameObj => {
      game.UID = gameObj['UID']
      return game;
    }))
  }
}

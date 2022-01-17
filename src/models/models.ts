export class Location {
  Description: string;
  Latitude: number;
  Longitude: number;
}

export class Player {
  Losses: number;
  Wins: number;
  UID: string;
  Name: string;

  get winPct(): number {
    return Number((this.Wins / (this.Wins + this.Losses)).toFixed(4));
  }

  static fromJSON(jsonObj: object): Player {
    const player = new Player();
    player.UID = jsonObj[0];
    player.Losses = jsonObj[1]['Losses'];
    player.Wins = jsonObj[1]['Wins'];
    player.Name = jsonObj[1]['Name'];

    return player;
  }
}

export class TeamStats {
  Players: Player[];
  Wins: number;
  Losses: number;

  static fromJSON(jsonObj: object, availablePlayers: Player[]): TeamStats {
    const stats = new TeamStats();
    stats.Wins = jsonObj[1]['Wins'];
    stats.Losses = jsonObj[1]['Losses'];
    stats.Players =  availablePlayers.filter(p => jsonObj[1]['Players'][p.UID])

    return stats;
  }

  get winPct() {
    return Number((this.Wins / (this.Wins + this.Losses)).toFixed(4));
  }
}

export class Team {
  Players: Player[];
  Score: Number;
}

export class Game {
  Datetime: Date;
  Location: Location;
  WinningTeam: Team;
  LosingTeam: Team;
  UID: string;

  get displayDate(): string {
    return this.Datetime.toLocaleString('en-US');
  }

  static fromJSON(jsonObj: object, availablePlayers: Player[]): Game {
    const game = new Game();
    game.UID = jsonObj[0];
    game.Location = jsonObj[1]['Location'];
    game.Datetime = new Date(jsonObj[1]['Datetime']);

    const winningTeam = new Team();
    winningTeam.Players = availablePlayers.filter(p => jsonObj[1]['WinningTeam']['Players'][p.UID])
    winningTeam.Score = jsonObj[1]['WinningTeam']['Score'];

    const losingTeam = new Team();
    losingTeam.Players = availablePlayers.filter(p => jsonObj[1]['LosingTeam']['Players'][p.UID])
    losingTeam.Score = jsonObj[1]['LosingTeam']['Score'];

    game.WinningTeam = winningTeam;
    game.LosingTeam = losingTeam;

    return game;
  }
}

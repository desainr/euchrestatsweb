import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {Player, TeamStats} from "../../../models/models";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'statistics',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnChanges {
  @Input() players: Player[];
  @Input() teams: TeamStats[];
  @ViewChild('playerTableSort') playerTableSort: MatSort;
  @ViewChild('teamsTableSort') teamsTableSort: MatSort;
  playerDisplayColumns: string[] = ['Name', 'Wins', 'Losses', 'winPct'];
  teamDisplayColumns: string[] = ['Player 1', 'Player 2', 'Wins', 'Losses', 'winPct']
  playerDataSource = new MatTableDataSource<Player>();
  teamDataSource = new MatTableDataSource<TeamStats>();
  showTeamStats: boolean = false;

  constructor() {}

  ngOnChanges() {
    if (this.players) {
      this.playerDataSource = new MatTableDataSource<Player>(this.players)
      this.playerDataSource.sort = this.playerTableSort;
    }

    if (this.teams) {
      this.teamDataSource = new MatTableDataSource<TeamStats>(this.teams)
      this.teamDataSource.sort = this.teamsTableSort;
      this.teamDataSource.filterPredicate = (data: TeamStats, filter: string) => {
        return data.Players.some(p => p.Name.toLowerCase() === filter.toLowerCase())
      };
    }
  }

  toggleTeamView() {
    this.showTeamStats = !this.showTeamStats;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value

    this.teamDataSource.filter = filterValue;
  }
}

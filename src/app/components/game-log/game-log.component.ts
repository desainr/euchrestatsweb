import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DatabaseService} from "../../../services/database.service";
import {Game} from "../../../models/models";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'game-log',
  templateUrl: './game-log.component.html',
  styleUrls: ['./game-log.component.css']
})
export class GameLogComponent implements OnChanges, OnInit {
  @Input()games: Game[] = [];
  gamesPaginated: Game[] = [];
  pageNumber: number = 1;
  startIndex: number = 0;
  endIndex: number = 19;
  isMobile: boolean = false;

  get totalPages() {
    return Math.floor((this.games.length / 20)) + 1
  }

  get showingAll(): boolean {
    return !(this.gamesPaginated.length < this.games.length);
  }

  constructor() {}

  ngOnChanges() {
    if (this.games) {
      this.gamesPaginated = this.games.slice(0, 19)
    }
  }

  ngOnInit() {
    if (window.screen.width < 380) { // 768px portrait
      this.isMobile = true;
    }
  }

  goToPreviousPage() {
    if (this.pageNumber > 1) {
      this.gamesPaginated = this.games.slice(this.startIndex - 20, this.endIndex - 20)
      this.pageNumber = this.pageNumber - 1;
      this.startIndex = this.startIndex - 20;
      this.endIndex = this.endIndex - 20;
    }
  }

  goToNextPage() {
    if (this.pageNumber < this.totalPages) {
      this.gamesPaginated = this.games.slice(this.startIndex + 20, this.endIndex + 20);
      this.pageNumber = this.pageNumber + 1;
      this.startIndex = this.startIndex + 20;
      this.endIndex = this.endIndex + 20;
    }
  }

  showAll() {
    if (this.gamesPaginated.length < this.games.length) {
      this.gamesPaginated = this.games.slice(0, this.games.length)
    } else {
      this.gamesPaginated = this.games.slice(0, 19);
      this.pageNumber = 1;
    }
  }

}

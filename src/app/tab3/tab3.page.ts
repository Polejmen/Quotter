import {Component, OnInit} from '@angular/core';
import {FavoritesService} from "../services/favorites/favorites.service";
import {Quote} from "../services/ninja-api/ninja-api.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  favoriteQuotes:Quote[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoriteQuotes = this.favoritesService.getFavoriteQuotes();
  }
  removeFavorite(quote:Quote) {
    const index = this.favoritesService.getFavoriteQuotes().findIndex(q =>
      q.quote === quote.quote && q.author === quote.author
    );
    this.favoritesService.removeFavorite(index)
  }
}

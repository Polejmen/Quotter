// tab2.page.ts
import { Component, OnInit } from '@angular/core';
import { NinjaApiService, Quote } from '../services/ninja-api/ninja-api.service';
import { LoadingController } from '@ionic/angular';
import { CategoryService } from "../services/categories/categories.service";
import {FavoritesService} from "../services/favorites/favorites.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  currentQuote: Quote ={
    quote:"",
    category:"",
    author:"",
  };
  category: string = "";
  isFavorite:boolean = false;

  constructor(
    private ninjaApiService: NinjaApiService,
    private loadingCtrl: LoadingController,
    private categoryService: CategoryService,
    private favoritesService: FavoritesService,
  ) {}

  ngOnInit() {
    this.loadQuote();
  }

  async loadQuote() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'crescent'
    });
    await loading.present();

    this.category = await this.categoryService.getRandomActiveCategory();

    this.ninjaApiService.getQuote$(this.category).subscribe(
      (res) => {
        loading.dismiss();
        this.currentQuote = res[0];
        this.isFavorite = this.favoritesService.isQuoteInFavorites(this.currentQuote)
        console.log(this.currentQuote,this.isFavorite);
      },
      (error) => {
        loading.dismiss();
        console.error('Error fetching quote:', error);
      }
    );
  }

  onNewQuote() {
    this.loadQuote();
  }
  addToFavorites() {
    if (this.favoritesService.isQuoteInFavorites(this.currentQuote)) {
      // Quote is already in favorites, remove it
      const index = this.favoritesService.getFavoriteQuotes().findIndex(q =>
        q.quote === this.currentQuote.quote && q.author === this.currentQuote.author
      );
      this.favoritesService.removeFavorite(index);
      this.isFavorite = false;
    } else {
      // Quote is not in favorites, add it
      this.favoritesService.addFavorite(this.currentQuote);
      this.isFavorite = true;
    }
  }
}

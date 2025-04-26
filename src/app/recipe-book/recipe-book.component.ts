import {Component} from '@angular/core';
import {RecipeService} from '../recipe.service'
import {NgForOf, NgIf} from '@angular/common';
import {Recipe} from '../recipe'


@Component({
  selector: 'app-recipe-book',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './recipe-book.component.html',
  styleUrl: './recipe-book.component.css'
})
export class RecipeBookComponent {


  recipes: Recipe[] = []
  baseApiService: RecipeService = new RecipeService();

  folded: boolean = false

  constructor() {
    this.baseApiService.getAllRecipes().then(recipes => {
      this.recipes = recipes;
    })
  }
}

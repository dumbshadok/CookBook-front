import {Component} from '@angular/core';
import {RecipeService} from '../recipe.service'
import {NgForOf, NgIf} from '@angular/common';
import {Recipe} from '../recipe'
import {RecipeCardComponent} from '../recipe-card/recipe-card.component';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-recipe-book',
  imports: [
    NgForOf,
    NgIf,
    RecipeCardComponent,
    RouterLink
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

  testRecipe: Recipe = {
    id: 2,
    name: "omelette du fromage",
    category: 'cheese',
    description: 'miam miam',
    ingredientsQuantities: [],
    numberOfServings: 4,
    preparationSteps: [],
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    console.log(this.recipes);
  }
}




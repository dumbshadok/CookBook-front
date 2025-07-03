import {Component, inject} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../recipe';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  imports: [
    NgForOf
  ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  recipeService: RecipeService = inject(RecipeService)
  recipe: Recipe | undefined;

  constructor() {
    const recipeId = Number(this.route.snapshot.params['id'])
    this.recipeService.getRecipeById(recipeId)
      .then((recipe: Recipe) => this.recipe = recipe)
  }
}

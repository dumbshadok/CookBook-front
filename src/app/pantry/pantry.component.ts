import { Component } from '@angular/core';
import {Ingredient} from '../ingredient';
import {IngredientService} from '../ingredient.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-pantry',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './pantry.component.html',
  styleUrl: './pantry.component.css'
})
export class PantryComponent {

  ingredients: Ingredient[] = []
  baseApiService: IngredientService = new IngredientService();
  constructor() {
    this.baseApiService.getAllIngredients().then(ingredients => {
      this.ingredients = ingredients;
    })

  }

}

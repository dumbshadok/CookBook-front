import {Injectable} from '@angular/core';
import {Ingredient} from './ingredient';

@Injectable({
  providedIn: 'root'
})

export class IngredientService {

  url = 'http://spring-backend'

  async getAllIngredients(): Promise<Ingredient[]> {
    const data = await fetch(`${this.url}/ingredients`)
    return await data.json() as Ingredient[];
  }

  async addIngredient(ingredient: Ingredient): Promise<Ingredient> {
    const data = await fetch(`${this.url}/ingredients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingredient)
    });
    return await data.json() as Ingredient;
  }

}

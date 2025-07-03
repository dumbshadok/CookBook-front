import {Injectable} from '@angular/core';
import {Recipe} from './recipe';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  url = 'http://localhost:8080'

  async getAllRecipes(): Promise<Recipe[]> {
    const data = await fetch(`${this.url}/recipes`)
    return await data.json() as Recipe[];
  }

  async getRecipeById(id: number): Promise<Recipe> {
    const data = await fetch(`${this.url}/recipes/${id}`)
    return await data.json() as Recipe;
  }

  async addRecipe(recipe: Recipe): Promise<Recipe> {
    try {
      const response = await fetch(`${this.url}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
      });
      console.log(JSON.stringify(recipe))
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json() as Recipe;
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error;
    }
  }
}


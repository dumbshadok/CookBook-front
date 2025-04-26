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

  async getRecipe(id: number): Promise<Recipe> {
    const data = await fetch(`${this.url}/recipes/${id}`)
    return await data.json() as Recipe;
  }

}

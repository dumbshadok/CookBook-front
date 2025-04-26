import {Injectable} from '@angular/core';
import {Ingredient} from './ingredient';

@Injectable({
  providedIn: 'root'
})

export class IngredientService {

  url = 'http://localhost:8080'

  async getAllIngredients(): Promise<Ingredient[]> {
    const data = await fetch(`${this.url}/ingredients`)
    return await data.json() as Ingredient[];
  }


}

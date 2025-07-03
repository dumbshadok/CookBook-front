import {Component, Input} from '@angular/core';
import {Recipe} from '../recipe';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {

  @Input() recipeInput!: Recipe;

}

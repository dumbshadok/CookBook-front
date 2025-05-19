import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent {


  newRecipeForm = new FormGroup({
    recipeName: new FormControl('', [Validators.required]),
    recipeDescription: new FormControl('', [Validators.required]),
  })

}

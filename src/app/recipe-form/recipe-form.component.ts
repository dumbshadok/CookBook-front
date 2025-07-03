import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Component, inject, signal} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {IngredientQuantity, PreparationStep, Recipe} from '../recipe';
import {NgFor, NgIf} from '@angular/common';
import {getAnalyticsUserId} from '@angular/cli/src/analytics/analytics';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-recipe-form',
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent {
  private readonly recipeService = inject(RecipeService);

  // Reactive state management with signals
  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly approvedRecipe = signal<Recipe | null>(null);


  private createIngredientGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      //image: new FormControl(''),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      unit: new FormControl('', [Validators.required])
    })
  }

  private createStepGroup() {
    return new FormGroup({
      //order: new FormControl(1),
      //image: new FormControl(''),
      description: new FormControl('', [Validators.required]),
      preparingTime: new FormControl(1, [Validators.required, Validators.min(1)]),
      cookingTime: new FormControl(1, [Validators.required, Validators.min(1)])
    })
  }

  readonly recipeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    //image: new FormControl(''),
    servings: new FormControl(1, [Validators.required, Validators.min(1)]),
    //cookingTime: new FormControl(1),
    //preparingTime: new FormControl(1),
    category: new FormControl('', [Validators.required]),
    ingredients: new FormArray([this.createIngredientGroup()]),
    steps: new FormArray([this.createStepGroup()]),

  });

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.createIngredientGroup());
  }

  addStep() {
    this.steps.push(this.createStepGroup());
  }


  status()  {
    console.log(this.recipeForm.status)
    console.log(this.recipeForm.value);
    console.log(this.recipeForm.controls)
  }

  /**
   * Component-level async handling for UI state management
   * This method orchestrates the submission process and manages UI feedback
   */
  async submitRecipe(): Promise<void> {
    // Reset previous states
    this.submitError.set(null);
    this.approvedRecipe.set(null);
    this.recipeForm.markAllAsTouched();

    // Validate form
    if (this.recipeForm.invalid) {
      this.submitError.set('Please fill in all required fields correctly.');
      return;
    }

    // Set loading state
    this.isSubmitting.set(true);

    try {
      // Get form values with proper typing
      const formValue = this.recipeForm.getRawValue();

      // Create properly typed DTO
      // Call service (which handles its own async operations)

      const preparationSteps: PreparationStep[] = formValue.steps.map(item => {
          const step: PreparationStep = {
            id: -1,
            recipeId: -1,
            description: item.description ?? "",
            cookingTime: item.cookingTime ?? 0,
            preparingTime: item.preparingTime ?? 0
          }
          return step;
        }
      )

      const ingredientsQuantities: IngredientQuantity[] = formValue.ingredients.map(item => {
          const step: IngredientQuantity = {
            id:-1,
            name: item.name ?? "",
            quantity: item.quantity ?? 0,
            unit: item.unit?.toUpperCase() ?? ""
          }
          return step;
        }
      )


      const recipeDTO: Recipe = {
          id: -1, // Backend will assign the actual ID
          name: formValue.name ?? "no name defined",
          description: formValue.description ?? "no description defined",
          preparationSteps: preparationSteps,
          numberOfServings: formValue.servings ?? 1,
          ingredientsQuantities: ingredientsQuantities,
          category: formValue.category!.toUpperCase(),
        }
      ;
      const approvedRecipe = await this.recipeService.addRecipe(recipeDTO);

      // Update UI state with success

      this.approvedRecipe.set(approvedRecipe);

      // Optionally reset form
      this.recipeForm.reset();

    } catch (error) {
      // Handle errors at the UI level
      this.handleSubmissionError(error);
    } finally {
      // Always reset loading state
      this.isSubmitting.set(false);
    }
  }

  /**
   * Centralized error handling for better UX
   */
  private handleSubmissionError(error: unknown): void {
    let errorMessage = 'Failed to save recipe. Please try again.';

    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes('400')) {
        errorMessage = 'Invalid recipe data. Please check your inputs.';
      } else if (error.message.includes('401')) {
        errorMessage = 'You are not authorized to create recipes.';
      } else if (error.message.includes('500')) {
        errorMessage = 'Server error. Please try again later.';
      }
      errorMessage += error

    }

    this.submitError.set(errorMessage);
    console.error('Recipe submission error:', error);
  }

  /**
   * Helper methods for template
   */
  hasFieldError(fieldName: keyof typeof this.recipeForm.controls): boolean {
    const field = this.recipeForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  getFieldErrorMessage(fieldName: keyof typeof this.recipeForm.controls): string {
    const field = this.recipeForm.get(fieldName);
    if (!field?.errors) return '';

    if (field.errors['required']) return `${fieldName} is required`;
    if (field.errors['minlength']) return `${fieldName} is too short`;
    if (field.errors['min']) return `${fieldName} must be at least ${field.errors['min'].min}`;

    return 'Invalid input';
  }

}

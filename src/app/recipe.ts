export interface IngredientQuantity {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}

export interface PreparationStep {
  id: number;
  recipeId: number;
  description: string;
  preparingTime: number;
  cookingTime: number;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  numberOfServings: number;
  ingredientsQuantities: IngredientQuantity[];
  preparationSteps: PreparationStep[];
  category: string;

}

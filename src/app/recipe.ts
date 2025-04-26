export interface Recipe {
  id: number;
  name: string;
  description: string;
  numberOfEater: number;
  ingredientsQuantities: string[];
  preparationSteps: string[];
  category: string;

}

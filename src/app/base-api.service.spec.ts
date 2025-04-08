import { IngredientService } from './ingredient.service';

describe('BaseAPI', () => {
  it('should create an instance', () => {
    expect(new IngredientService()).toBeTruthy();
  });
});

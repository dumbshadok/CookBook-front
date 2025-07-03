import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PantryComponent} from './pantry/pantry.component';
import {RecipeBookComponent} from './recipe-book/recipe-book.component';
import {RecipeFormComponent} from './recipe-form/recipe-form.component';
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page'
  },
  {
    path: 'pantry',
    component: PantryComponent,
    title: 'Pantry Page'
  },

  {
    path: 'recipes',
    component: RecipeBookComponent,
    title: 'Recipe Book Page'
  },
  {
    path: 'recipes/newrecipe',
    component: RecipeFormComponent,
    title: "New Recipe"
  },

  {
    path: 'details/:id',
    component: RecipeDetailsComponent,
    title: 'Recipe Book Page'
  }
];

export default routes;

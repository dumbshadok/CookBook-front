import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PantryComponent} from './pantry/pantry.component';
import {RecipeBookComponent} from './recipe-book/recipe-book.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page'
  },
  {path: 'pantry',
  component: PantryComponent,
  title: 'Pantry Page'},

  {
    path: 'cookbook',
    component: RecipeBookComponent,
    title: 'Recipe Book Page'
  }
];

export default routes;

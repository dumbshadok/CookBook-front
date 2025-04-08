import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PantryComponent} from './pantry/pantry.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page'
  },
  {path: 'pantry',
  component: PantryComponent,
  title: 'Pantry Page'}
];

export default routes;

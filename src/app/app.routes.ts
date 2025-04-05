
import { Routes } from '@angular/router';
import { TodoPageComponent } from './components/todo-page/todo-page.component';
import { TodoResolver } from './services/resolvers/todo.resolver';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: 'main',
        component: TodoPageComponent,
        resolve: { todos: TodoResolver }
    },
];
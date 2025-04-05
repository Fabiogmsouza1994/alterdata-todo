import { SpinnerService } from './services/loading.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoPageComponent } from './components/todo-page/todo-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, MatProgressSpinnerModule],
  
})
export class AppComponent {
  title = 'alterdata-todo';

  constructor(public spinnerService: SpinnerService) {}
}

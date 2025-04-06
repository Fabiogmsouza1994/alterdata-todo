import { SpinnerService } from './services/loading.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, MatProgressSpinnerModule, MatToolbarModule],
  
})
export class AppComponent {
  title = 'alterdata-todo';

  constructor(public spinnerService: SpinnerService) {}
}

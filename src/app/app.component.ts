import { SpinnerService } from './services/loading.service';
import {
  AfterViewInit,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    CommonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
  ],
})
export class AppComponent implements AfterViewInit {
  title = 'alterdata-todo';
  constructor(
    public spinnerService: SpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const loader: HTMLElement | null =
        document.getElementById('initial-loader');
      if (loader) loader.remove();
    }
  }
}

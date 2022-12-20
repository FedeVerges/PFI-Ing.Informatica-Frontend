import { Component, OnInit } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading$!: Observable<boolean>;

  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$.pipe(delay(0));
  }
}

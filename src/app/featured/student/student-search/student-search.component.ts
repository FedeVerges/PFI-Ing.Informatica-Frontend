import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.scss']
})
export class StudentSearchComponent implements OnInit {
  personDocNumber: number | undefined;

  enableResults = false;
  constructor(private alertService: AlertService, private router: Router) {}

  ngOnInit(): void {}

  searchStudentByDni() {
    if (this.personDocNumber) {
      this.enableResults = true;
    }
  }
}

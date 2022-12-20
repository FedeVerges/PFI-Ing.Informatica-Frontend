import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentDto } from 'src/app/core/models/dto/studentDto';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  @Input() student?: StudentDto;
  @Output() showTitlesEmiter: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  showTitles() {
    this.showTitlesEmiter.emit();
  }
}

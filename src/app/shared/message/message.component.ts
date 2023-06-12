import { Component, Input, OnInit } from '@angular/core';
import { MESSAGE_TYPES } from 'src/app/core/enum/messageTypes';

/**
 * Documentacion del componente.
 *
 */
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: string = MESSAGE_TYPES.SUCCESS;

  messageTypes = MESSAGE_TYPES;
  constructor() {}

  ngOnInit(): void {}
}

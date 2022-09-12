import { Injectable } from '@angular/core';
import { error } from 'console';
import { BehaviorSubject, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { NetworkStatusDto } from '../models/dto/notificationDto';

export interface Message {
  source: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  myWebSocket = webSocket<NetworkStatusDto>('ws://localhost:9090');
  private _currentStatus$: BehaviorSubject<NetworkStatusDto>;
  currentStatus$: Observable<NetworkStatusDto>;

  constructor() {
    this._currentStatus$ = new BehaviorSubject<NetworkStatusDto>({
      blockchainName: '',
      networkId: -1,
      connected: false,
    });
    this.currentStatus$ = this._currentStatus$.asObservable();
    this.myWebSocket.asObservable().subscribe({
      next: (message: NetworkStatusDto) => this.setStatus(message),
      error: error => { }
    });
    this.sendMessage();
  }

  sendMessage() {
    this.myWebSocket.next({} as NetworkStatusDto)
  }

  setStatus(newStatus: NetworkStatusDto) {
    this._currentStatus$.next(newStatus);
  }

}

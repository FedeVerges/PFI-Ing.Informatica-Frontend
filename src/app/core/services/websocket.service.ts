import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { BlockchainTransactionDto } from '../models/dto/blockchainTransactionDto';
import { NetworkStatusDto } from '../models/dto/networkStatusDto';
import { NotificationDto } from '../models/dto/notificationDto';
import { NOTIFICATION_TYPES } from '../models/notificationTypes';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  myWebSocket = webSocket<NotificationDto>('ws://localhost:9090');
  private _currentStatus$: BehaviorSubject<NetworkStatusDto>;
  currentStatus$: Observable<NetworkStatusDto>;

  constructor(private alertService: AlertService) {
    this._currentStatus$ = new BehaviorSubject<NetworkStatusDto>({
      blockchainName: '',
      networkId: -1,
      connected: false
    });
    // this.showTransactionNotification({
    //   transactionHash: '1',
    //   type: NOTIFICATION_TYPES.TRANSACTION
    // });
    this.currentStatus$ = this._currentStatus$.asObservable();
    this.myWebSocket.asObservable().subscribe({
      next: (message) => {
        switch (message.type) {
          case NOTIFICATION_TYPES.STATUS:
            if (message.networkId) {
              this.setStatus(message);
            }
            break;
          case NOTIFICATION_TYPES.TRANSACTION:
            if (message.transactionHash) {
              this.showTransactionNotification(message);
            }
            break;
          case NOTIFICATION_TYPES.ERROR:
            break;

          default:
            throw new Error('Formato de notificacion incorrecto.');
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.sendMessage();
  }

  sendMessage() {
    this.myWebSocket.next({} as NotificationDto);
  }

  setStatus(newStatus: NetworkStatusDto) {
    this._currentStatus$.next(newStatus);
  }

  showTransactionNotification(message: NotificationDto) {
    const textMessage = `La transaccion ${message.transactionHash} ha sido exitosa`;
    this.alertService.showAlert(textMessage, 'Aceptar', { duration: undefined });
  }
}

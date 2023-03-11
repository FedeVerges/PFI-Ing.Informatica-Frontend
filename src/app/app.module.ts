import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './core/guards/auth.guard';
import { CoreModule } from './core/core.module';
import { AuthService } from './core/services/auth.service';
import { LocalStorageService } from './core/services/local-storage.service';
import { UserService } from './core/services/user.service';
import { WebsocketService } from './core/services/websocket.service';
import { LoadingService } from './core/services/loading.service';
import { AlertService } from './core/services/alert.service';
import { StudentService } from './core/services/student.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    AuthService,
    LocalStorageService,
    UserService,
    WebsocketService,
    AuthGuard,
    LoadingService,
    AlertService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

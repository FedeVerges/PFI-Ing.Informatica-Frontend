import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/interceptor.service';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbModule } from './mdb/mdb.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MdbModule,
  ],
  exports:[
    MdbModule
  ]
})
export class SharedModule { }

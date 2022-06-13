import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MdbModule } from './mdb/mdb.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MdbModule,
  ],
  exports:[
    MdbModule
  ]
})
export class SharedModule { }

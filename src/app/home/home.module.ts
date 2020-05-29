import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home.component';
import { StatModule, SysStatModule } from '../shared';


@NgModule({
  imports: [CommonModule, HomeRoutingModule, FormsModule, ReactiveFormsModule, NgbModule, SysStatModule],
  declarations: [HomeComponent]
})
export class HomeModule { }

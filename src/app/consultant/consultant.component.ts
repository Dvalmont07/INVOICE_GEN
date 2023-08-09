import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConsultantService } from 'src/services/consultant/consultant.service';
import { Consultant } from '../classes/consultant.class';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.scss']
})
export class ConsultantComponent implements OnInit {

  constructor(private _consultantService: ConsultantService) { }

  public consultant: Consultant = new Consultant();

  ngOnInit() {
    this.getData();
   
  }

  private getData() {
    this._consultantService.getData()
    .subscribe(data => this.consultant = data);
  }

  private updateData() {
   
    this._consultantService.update(this.consultant)
  }


}

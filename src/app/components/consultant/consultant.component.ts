import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultantService } from 'src/services/consultant/consultant.service';
import { Consultant } from '../../classes/consultant.class';
import { ClientComponent } from '../client/client.component';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.scss']
})
export class ConsultantComponent implements OnInit {

  public consultant: Consultant = new Consultant();
  public clientId: number = 0;
  constructor(private _consultantService: ConsultantService) { }

  @ViewChild(ClientComponent) clientComponent!: ClientComponent;


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

  public openClient(id: number) {
    if (id > 0) {
      this.clientId = id;    

      setTimeout(() => {
        let aaa = document.querySelector("#client-section") as HTMLElement;
        aaa.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });

        if (this.clientComponent) {
          this.clientComponent.refresBlock();
        }

      }, 30);
    }
  }


}

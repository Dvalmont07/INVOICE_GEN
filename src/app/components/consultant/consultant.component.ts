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

  private currentClientId = 0;
  constructor(
    private _consultantService: ConsultantService,
  ) { }
  

  @ViewChild(ClientComponent) clientComponent!: ClientComponent;

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this._consultantService.getData()
      .subscribe(
        data => {
          this.consultant = data;
          // const client = new Client();
          // client.Id = 0;
          // client.Name = "Selecione";
          // this.consultant.Clients.unshift(client);
        });
  }

  private updateData() {

    this._consultantService.update(this.consultant)
  }

  public openClient(id: number) {
    this.clientId = id;
    if (id > 0) {  
      setTimeout(() => {
        let clientSection = document.querySelector("#client-section") as HTMLElement;

        //applyMyBlurBehavior();

        clientSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });

        if (this.clientComponent) {
          this.clientComponent.refresBlock();

          if (this.clientComponent.invoiceComponent && this.currentClientId != id) {
            this.currentClientId = id;
            this.clientComponent.invoiceComponent.clearBlock();
          }
        }

        function applyMyBlurBehavior() {
          clientSection.classList.add('my-blur');
          setTimeout(() => {
            clientSection.classList.remove('my-blur');
          }, 1000);
        }
      }, 100);
    } else {
      // this.clientComponent.invoiceComponent.clearBlock();
    }
  }
}

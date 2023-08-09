import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientService } from 'src/services/client/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(
    private _clientService: ClientService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
    });
  }
  public client: any;
  ngOnInit() {
    if (location.search) {
      let param = new URLSearchParams(location.search);
      this.getClientById(Number(param?.get("id")));
    } else {
      this.client = null;
    }
  }

  private getClientById(id: number) {
    this._clientService.getAll().subscribe(clients => {
      this.client = clients
        .filter(client => { return client.Id === id })[0]
    });
  }

}

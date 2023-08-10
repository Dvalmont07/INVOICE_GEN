import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientService } from 'src/services/client/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  public client: any;
  private _params: any;
  constructor(
    private _clientService: ClientService,
    private activatedRoute: ActivatedRoute
  ) {
    //TODO: generate hash to URLs
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this._params = params;
    });
  }

  ngOnInit() {
    if (this._params) {
      this.getClientById(Number(this._params["id"]));
    } else {
      this.client = null;
    }
  }

  private getClientById(id: number) {
    this._clientService.getAll().subscribe(clients => {
      this.client = clients
        .filter(client => { return client.Id === id })[0];
    });
  }

}

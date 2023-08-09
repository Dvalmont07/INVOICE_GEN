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

  ngOnInit() {

  }

  private getClientById() {
    this._clientService.getById(1);
  }

}

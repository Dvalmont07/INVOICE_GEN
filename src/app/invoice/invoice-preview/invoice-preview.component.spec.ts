/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePreviewComponent } from './invoice-preview.component';
import { Invoice } from 'src/app/classes/invoice.class';
import { Client } from 'src/app/classes/client.class';
import { Consultant } from 'src/app/classes/consultant.class';
// import { Service } from 'src/app/classes/invoice-items.class';
import { SERVICES } from 'src/app/data/public/p-invoice-items.data';

describe('InvoicePreviewComponent', () => {
  let component: InvoicePreviewComponent;
  let fixture: ComponentFixture<InvoicePreviewComponent>;


  let client: Client = new Client();
  client.Name = "Zé do Biscoito";
  client.Email = "ze@biscoito.br";
  let consultant: Consultant = new Consultant();
  consultant.FirstName = "Danilo";
  consultant.LastName = "Matos";
  consultant.BankName = "Inter";
  consultant.PixKey = "119988547988";
  // let services: Service[] = SERVICES;
  // services.push(new Service("Mensalidade Referente ao mês de junho de 2023", 3, 100));
  // services.push(new Service("Percentual referente aos 20% sobre os RS 1.000,00 creditados em junho de 2003", 1, 200));
  let invoice: Invoice = new Invoice();
  // invoice.Client = client;
  // invoice.Consultant = consultant;
  // invoice.Services = services;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicePreviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create a Componet', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should create a client', () => {
  //   expect(client).toBeTruthy();
  // });

  // it('should create a consultant', () => {
  //   expect(consultant).toBeTruthy();
  // });

  // it('should have a first name', () => {
  //   expect(consultant.FirstName).toEqual("Danilo");
  // });

  // it('should have a last name', () => {
  //   expect(consultant.LastName).toEqual("Matos");
  // });

  // it('should have a full name', () => {
  //   expect(consultant.FullName).toEqual("Danilo Matos");
  // });

  // it('should create a list of services', () => {
  //   expect(services).toBeTruthy();
  // });

  // it('should create a invoice', () => {
  //   expect(invoice).toBeTruthy();
  // });

  // it('should have a service index 0 equal to 300', () => {
  //   expect(services[0].Total).toEqual(300);
  // });
  // it('should have a service index 1 equal to 200', () => {
  //   expect(services[1].Total).toEqual(200);
  // });

  // it('should have total ivoice of 500', () => {
  //   expect(invoice.Total).toEqual(500);
  // });
});

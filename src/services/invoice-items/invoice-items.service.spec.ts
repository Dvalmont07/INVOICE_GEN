/* tslint:disable:no-unused-variable */

import { TestBed,  inject } from '@angular/core/testing';
import { InvoiceItemsService } from './invoice-items.service';

describe('Service: InvoiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceItemsService]
    });
  });

  it('should ...', inject([InvoiceItemsService], (service: InvoiceItemsService) => {
    expect(service).toBeTruthy();
  }));
});

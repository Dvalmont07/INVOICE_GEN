/* tslint:disable:no-unused-variable */

import { TestBed,  inject } from '@angular/core/testing';
import { InvoiceService } from './invoice.service';

describe('Service: InvoiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceService]
    });
  });

  it('should ...', inject([InvoiceService], (service: InvoiceService) => {
    expect(service).toBeTruthy();
  }));
});

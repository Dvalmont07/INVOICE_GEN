import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

export interface Client {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  taxId?: string;
  companyRepresentativeName?: string;
  monthlyFee?: number;
  previousMontlyFee?: number;
  commission?: number;
  annualMonthlyFeeAdjustment?: number;
  active: number;
}

export interface Consultant {
  id?: number;
  firstName: string;
  lastName: string;
  companyName?: string;
  email?: string;
  phone?: string;
  pixKey?: string;
  bankName?: string;
  signature?: string;
  active: number;
}

export interface Invoice {
  id?: number;
  invoiceNumber?: string;
  date?: string;
  dueDate?: string;
  client?: any;
  consultant?: any;
  items?: any[];
  totalAmount?: number;
  status?: string;
  notes?: string;
  active: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService extends Dexie {
  public clients!: Table<Client, number>;
  public consultants!: Table<Consultant, number>;
  public invoices!: Table<Invoice, number>;

  constructor() {
    super('InvoiceGenDB');

    // Version 2 kept so Dexie can upgrade from it
    this.version(2).stores({
      clients: '++id, &name, email, active',
      consultants: '++id, [firstName+lastName], email, active',
      invoices: '++id, invoiceNumber, date, status, active'
    });

    // Version 3: removed unique constraint on client name.
    // The &name constraint was causing silent put() failures every time
    // the seeder tried to insert a client that already existed.
    this.version(3).stores({
      clients: '++id, name, email, active',
      consultants: '++id, firstName, lastName, email, active',
      invoices: '++id, date, status, active'
    });
  }
}

import { Client } from "./client.class";
import { Consultant } from "./consultant.class";
import { InvoiceItems } from "./invoice-items.class";

export class Invoice {
    private _number: number = 0;
    private _client: Client = new Client();
    private _consultant: Consultant = new Consultant();
    private _referenceMonth: number = 0;
    private _referenceYear: number = 0;
    private _dueDate: Date = new Date();
    private _services: InvoiceItems[] = [];

    public get number(): number {
        return this._number;
    }
    public set number(value: number) {
        this._number = value;
    }

    public get client(): Client {
        return this._client;
    }
    public set client(value: Client) {
        this._client = value;
    }

    public get consultant(): Consultant {
        return this._consultant;
    }
    public set consultant(value: Consultant) {
        this._consultant = value;
    }

    public get referenceMonth(): number {
        return this._referenceMonth;
    }
    public set referenceMonth(value: number) {
        this._referenceMonth = value;
    }

    public get referenceYear(): number {
        return this._referenceYear;
    }
    public set referenceYear(value: number) {
        this._referenceYear = value;
    }

    public get referenceFullMonth(): string {
        return new Date(0, this._referenceMonth - 1).toLocaleString('pt-BR', { month: 'long' });
    }

    public get dueDate(): Date {
        return this._dueDate;
    }
    public set dueDate(value: Date) {
        this._dueDate = value;
    }

    public get services(): InvoiceItems[] {
        return this._services;
    }
    public set services(value: InvoiceItems[]) {
        this._services = value;
    }

    public get total(): number {
        let total = 0;
        this._services.forEach(service => {
            total += service.total; // Use camelCase here as well
        });
        return total;
    }
}

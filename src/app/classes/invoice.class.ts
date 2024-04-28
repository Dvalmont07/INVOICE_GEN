import { Client } from "./client.class";
import { Consultant } from "./consultant.class";
import { InvoiceItems } from "./invoice-items.class";

export class Invoice {
    private _number: number = 0;
    public get Number(): number {
        return this._number;
    }
    public set Number(value: number) {
        this._number = value;
    }

    private _client: Client = new Client();
    public get Client(): Client {
        return this._client;
    }
    public set Client(value: Client) {
        this._client = value;
    }

    private _consultant: Consultant = new Consultant();
    public get Consultant(): Consultant {
        return this._consultant;
    }
    public set Consultant(value: Consultant) {
        this._consultant = value;
    }

    private _referenceMonth: number = 0;
    public get ReferenceMonth(): number {
        return this._referenceMonth;
    }
    public set ReferenceMonth(value: number) {
        this._referenceMonth = value;
    }

    private _referenceYear: number = 0;
    public get ReferenceYear(): number {
        return this._referenceYear;
    }
    public set ReferenceYear(value: number) {
        this._referenceYear = value;
    }

    public get ReferenceFullMonth(): string {
        return new Date(0, this._referenceMonth - 1).toLocaleString('pt-BR', { month: 'long' });
    }

    private _dueDate: Date = new Date();
    public get DueDate(): Date {
        return this._dueDate;
    }
    public set DueDate(value: Date) {
        this._dueDate = value;
    }

    private _services: InvoiceItems[] = [];
    public get Services(): InvoiceItems[] {
        return this._services;
    }
    public set Services(value: InvoiceItems[]) {
        this._services = value;
    }

    public get Total(): number {
        let total = 0;
        this._services.forEach(service => {
            total += service.Total;
        });
        return total;
    }


}
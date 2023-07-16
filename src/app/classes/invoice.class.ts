import { Client } from "./client.class";
import { Consultant } from "./consultant.class";
import { Service } from "./services.class";

export class Invoice {
    private _invoiceNumber: number = 0;
    public get InvoiceNumber(): number {
        return this._invoiceNumber;
    }
    public set InvoiceNumber(value: number) {
        this._invoiceNumber = value;
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

    private _dueDate: Date = new Date();
    public get DueDate(): Date {
        return this._dueDate;
    }
    public set DueDate(value: Date) {
        this._dueDate = value;
    }

    private _services: Service[] = [];
    public get Services(): Service[] {
        return this._services;
    }
    public set Services(value: Service[]) {
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
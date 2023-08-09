import { Client } from "./client.class";
import { Consultant } from "./consultant.class";
import { InvoiceItems } from "./invoice-items.class";

export class Invoice {
    private _id: number = 0;
    public get Id(): number {
        return this._id;
    }
    public set Id(value: number) {
        this._id = value;
    }

    private _clientId: number = 0;
    public get ClientId(): number {
        return this._clientId;
    }
    public set ClientId(value: number) {
        this._clientId = value;
    }

    // public get Client(): Client {
    //     return this._client;
    // }
    // public set Client(value: Client) {
    //     this._client = value;
    // }

    private _consultantId: number = 0;
    public get ConsultantId(): number {
        return this._consultantId;
    }
    public set ConsultantId(value: number) {
        this._consultantId = value;
    }
    // public get Consultant(): Consultant {
    //     return this._consultant;
    // }
    // public set Consultant(value: Consultant) {
    //     this._consultant = value;
    // }

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

    private _invoiceItems: InvoiceItems[] = [];
    public get InvoiceItems(): InvoiceItems[] {
        return this._invoiceItems;
    }
    public set InvoiceItems(value: InvoiceItems[]) {
        this._invoiceItems = value;
    }

    public get Total(): number {
        let total = 0;
        this._invoiceItems.forEach(service => {
            total += service.Total;
        });
        return total;
    }

}
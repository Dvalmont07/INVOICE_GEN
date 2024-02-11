import { InvoiceItems } from "./invoice-items.class";

export class Invoice {
    private _id: number = 0;
    private _clientId: number = 0;
    private _consultantId: number = 0;
    private _referenceMonth: number = 0;
    private _referenceYear: number = 0;
    private _dueDate: Date = new Date();
    private _invoiceItems: InvoiceItems[] = [];

    public get Id(): number {
        return this._id;
    }
    public set Id(value: number) {
        this._id = value;
    }
    public get ClientId(): number {
        return this._clientId;
    }
    public set ClientId(value: number) {
        this._clientId = value;
    }
    public get ConsultantId(): number {
        return this._consultantId;
    }
    public set ConsultantId(value: number) {
        this._consultantId = value;
    }
    public get ReferenceMonth(): number {
        return this._referenceMonth;
    }
    public set ReferenceMonth(value: number) {
        this._referenceMonth = value;
    }
    public get ReferenceYear(): number {
        return this._referenceYear;
    }
    public set ReferenceYear(value: number) {
        this._referenceYear = value;
    }
    public get ReferenceFullMonth(): string {
        return new Date(0, this._referenceMonth - 1).toLocaleString('pt-BR', { month: 'long' });
    }
    public get DueDate(): Date {
        return this._dueDate;
    }
    public set DueDate(value: Date) {
        this._dueDate = value;
    }
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
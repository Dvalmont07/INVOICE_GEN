import { Client } from "./client.class";
import { Consultant } from "./consultant.class";
import { InvoiceItems } from "./invoice-items.class";

export class Invoice {
    private _id: string | number = new Date().getTime().toString();
    private _number: number = 0;
    private _client: Client = new Client();
    private _consultant: Consultant = new Consultant();
    private _referenceMonth: number = 0;
    private _referenceYear: number = 0;
    private _dueDate: Date = new Date();
    private _services: InvoiceItems[] = [];
    private _customDay: number = 0;
    private _customMonth: number = 0;
    private _customYear: number = 0;
    private _active: boolean = true;
    private _createdAt: Date = new Date();
    private _customFileName: string = "";

    public get id(): string | number {
        return this._id;
    }
    public set id(value: string | number) {
        this._id = value;
    }

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

    public get customDay(): number {
        return this._customDay;
    }
    public set customDay(value: number) {
        this._customDay = value;
    }
    public get customMonth(): number {
        return this._customMonth;
    }
    public set customMonth(value: number) {
        this._customMonth = value;
    }
    public get customYear(): number {
        return this._customYear;
    }
    public set customYear(value: number) {
        this._customYear = value;
    }
    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }
    public set createdAt(value: Date) {
        this._createdAt = value;
    }

    public get customFileName(): string {
        return this._customFileName;
    }
    public set customFileName(value: string) {
        this._customFileName = value;
    }


    public get total(): number {
        let total = 0;
        this._services.forEach(service => {
            total += service.total;
        });
        return total;
    }


    public toJSON() {
        return {
            id: this._id,
            number: this._number,
            client: this._client.toJSON(),
            consultant: this._consultant.toJSON(),
            referenceMonth: this._referenceMonth,
            referenceYear: this._referenceYear,
            dueDate: this._dueDate.toISOString(),
            services: this._services.map(s => s.toJSON()),
            customDay: this._customDay,
            customMonth: this._customMonth,
            customYear: this._customYear,
            customFileName: this._customFileName,
            active: this._active ? 1 : 0,
            createdAt: this._createdAt.toISOString()
        };
    }

    public static fromJSON(json: any): Invoice {
        const invoice = new Invoice();
        invoice.id = json.id;
        invoice.number = json.number;
        invoice.client = Client.fromJSON(json.client);
        invoice.consultant = Consultant.fromJSON(json.consultant);
        invoice.referenceMonth = json.referenceMonth;
        invoice.referenceYear = json.referenceYear;
        invoice.dueDate = new Date(json.dueDate);
        invoice.services = json.services.map((s: any) => InvoiceItems.fromJSON(s));
        invoice.customDay = json.customDay;
        invoice.customMonth = json.customMonth;
        invoice.customYear = json.customYear;
        invoice.customFileName = json.customFileName || "";
        invoice.active = json.active === undefined || json.active === true || json.active === 1;
        
        if (json.createdAt) {
            invoice.createdAt = new Date(json.createdAt);
        } else if (json.id && !isNaN(Number(json.id))) {
            // Fallback to ID if it's a timestamp
            invoice.createdAt = new Date(Number(json.id));
        }

        return invoice;
    }
}


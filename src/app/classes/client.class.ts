import { Invoice } from "./invoice.class";

export class Client {
    private _id: number = 0;
    public get Id(): number {
        return this._id;
    }
    public set Id(value: number) {
        this._id = value;
    }

    private _consultantId: number = 0;
    public get ConsultantId(): number {
        return this._consultantId;
    }
    public set ConsultantId(value: number) {
        this._consultantId = value;
    }

    private _invoices: Invoice[] = [];
    public get Invoices(): Invoice[] {
        return this._invoices;
    }
    public set Invoices(value: Invoice[]) {
        this._invoices = value;
    }
  
    private _name: string = "";
    public get Name(): string {
        return this._name;
    }
    public set Name(value: string) {
        this._name = value;
    }

    private _email: string = "";
    public get Email(): string {
        return this._email;
    }
    public set Email(value: string) {
        this._email = value;
    }
    private _companyRepresentativeName: string = "";
    public get CompanyRepresentativeName(): string {
        return this._companyRepresentativeName;
    }
    public set CompanyRepresentativeName(value: string) {
        this._companyRepresentativeName = value;
    }
}
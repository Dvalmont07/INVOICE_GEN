import { Invoice } from "./invoice.class";

export class Client {
    private _id: number = 0;
    private _consultantId: number = 0;
    private _invoices: Invoice[] = [];
    private _name: string = "";
    private _email: string = "";
    private _companyRepresentativeName: string = "";   
   
    public get Id(): number {
        return this._id;
    }
    public set Id(value: number) {
        this._id = value;
    }

    public get ConsultantId(): number {
        return this._consultantId;
    }
    public set ConsultantId(value: number) {
        this._consultantId = value;
    }

    public get Invoices(): Invoice[] {
        return this._invoices;
    }
    public set Invoices(value: Invoice[]) {
        this._invoices = value;
    }
  
    public get Name(): string {
        return this._name;
    }
    public set Name(value: string) {
        this._name = value;
    }

    public get Email(): string {
        return this._email;
    }
    public set Email(value: string) {
        this._email = value;
    }

    public get CompanyRepresentativeName(): string {
        return this._companyRepresentativeName;
    }
    public set CompanyRepresentativeName(value: string) {
        this._companyRepresentativeName = value;
    }
}
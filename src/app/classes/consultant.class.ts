import { Client } from "./client.class";

export class Consultant {
    private _id: number = 0;
    private _clients: Client[] = [];
    private _firstName: string = "";
    private _lastName: string = "";
    private _companyName: string = "";
    private _pixKey: string = "";
    private _bankName: string = "";
    private _email: string = "";
    
    
    public get Id(): number {
        return this._id;
    }
    public set Id(value: number) {
        this._id = value;
    }
    public get Clients(): Client[] {
        return this._clients;
    }
    public set Clients(value: Client[]) {
        this._clients = value;
    }
    public get FirstName(): string {
        return this._firstName;
    }
    public set FirstName(value: string) {
        this._firstName = value;
    }
    public get LastName(): string {
        return this._lastName;
    }
    public set LastName(value: string) {
        this._lastName = value;
    }
    public get FullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }
    public get CompanyName(): string {
        return this._companyName;
    }
    public set CompanyName(value: string) {
        this._companyName = value;
    }
    public get PixKey(): string {
        return this._pixKey;
    }
    public set PixKey(value: string) {
        this._pixKey = value;
    }
    public get BankName(): string {
        return this._bankName;
    }
    public set BankName(value: string) {
        this._bankName = value;
    }
    public get Email(): string {
        return this._email;
    }
    public set Email(value: string) {
        this._email = value;
    }
    private _signature: string = "";
    public get Signature(): string {
        return this._signature;
    }
    public set Signature(value: string) {
        this._signature = value;
    }
}
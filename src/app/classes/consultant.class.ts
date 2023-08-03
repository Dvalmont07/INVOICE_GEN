export class Consultant {
    private _firstName: string = "";
    public get FirstName(): string {
        return this._firstName;
    }
    public set FirstName(value: string) {
        this._firstName = value;
    }

    private _lastName: string = "";
    public get LastName(): string {
        return this._lastName;
    }
    public set LastName(value: string) {
        this._lastName = value;
    }

    public get FullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }

    private _companyName: string = "";
    public get CompanyName(): string {
        return this._companyName;
    }
    public set CompanyName(value: string) {
        this._companyName = value;
    }

    private _pixKey: string = "";
    public get PixKey(): string {
        return this._pixKey;
    }
    public set PixKey(value: string) {
        this._pixKey = value;
    }

    private _bankName: string = "";
    public get BankName(): string {
        return this._bankName;
    }
    public set BankName(value: string) {
        this._bankName = value;
    }

    private _email: string = "";
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
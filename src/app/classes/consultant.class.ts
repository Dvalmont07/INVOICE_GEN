export class Consultant {
    private _firstName: string = "";
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }

    private _lastName: string = "";
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }

    public get fullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }

    private _companyName: string = "";
    public get companyName(): string {
        return this._companyName;
    }
    public set companyName(value: string) {
        this._companyName = value;
    }

    private _pixKey: string = "";
    public get pixKey(): string {
        return this._pixKey;
    }
    public set pixKey(value: string) {
        this._pixKey = value;
    }

    private _bankName: string = "";
    public get bankName(): string {
        return this._bankName;
    }
    public set bankName(value: string) {
        this._bankName = value;
    }

    private _email: string = "";
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    private _signature: string = "";
    public get signature(): string {
        return this._signature;
    }
    public set signature(value: string) {
        this._signature = value;
    }
}

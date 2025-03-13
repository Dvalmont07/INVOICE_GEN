export class Consultant {
    private _firstName: string = "";
    private _lastName: string = "";
    private _companyName: string = "";
    private _pixKey: string = "";
    private _bankName: string = "";
    private _email: string = "";
    private _signature: string = "";
    

    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    public get fullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }
    public get companyName(): string {
        return this._companyName;
    }
    public set companyName(value: string) {
        this._companyName = value;
    }
    public get pixKey(): string {
        return this._pixKey;
    }
    public set pixKey(value: string) {
        this._pixKey = value;
    }
    public get bankName(): string {
        return this._bankName;
    }
    public set bankName(value: string) {
        this._bankName = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get signature(): string {
        return this._signature;
    }
    public set signature(value: string) {
        this._signature = value;
    }
}

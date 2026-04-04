export class Consultant {
    private _id?: number;
    private _firstName: string = "";
    private _lastName: string = "";
    private _companyName: string = "";
    private _pixKey: string = "";
    private _bankName: string = "";
    private _email: string = "";
    private _signature: string = "";
    private _active: boolean = true;

    public get id(): number | undefined {
        return this._id;
    }
    public set id(value: number | undefined) {
        this._id = value;
    }

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
    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
    }

    public toJSON() {
        return {
            id: this._id,
            firstName: this._firstName,
            lastName: this._lastName,
            companyName: this._companyName,
            pixKey: this._pixKey,
            bankName: this._bankName,
            email: this._email,
            signature: this._signature,
            active: this._active ? 1 : 0
        };
    }

    public static fromJSON(json: any): Consultant {
        const consultant = new Consultant();
        consultant.id = json.id;
        
        // Robust name handling for legacy data
        if (json.firstName) {
            consultant.firstName = json.firstName;
            consultant.lastName = json.lastName || "";
        } else if (json.name) {
            const parts = json.name.trim().split(' ');
            consultant.firstName = parts[0];
            consultant.lastName = parts.slice(1).join(' ');
        }
        
        consultant.companyName = json.companyName;
        consultant.pixKey = json.pixKey;
        consultant.bankName = json.bankName;
        consultant.email = json.email;
        consultant.signature = json.signature;
        consultant.active = json.active === undefined || json.active === true || json.active === 1;
        return consultant;
    }
}

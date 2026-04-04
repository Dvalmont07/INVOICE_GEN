export class Client {
    private _id?: number;
    private _name: string = "";
    private _email: string = "";
    private _companyRepresentativeName: string = "";
    private _montlyFee: number = 0;
    private _previousMontlyFee: number = 0;   
    private _commission: number = 0;
    private _annualMonthlyFeeAdjustment: number = 0;
    private _active: boolean = true;

    public get id(): number | undefined {
        return this._id;
    }
    public set id(value: number | undefined) {
        this._id = value;
    }

    public get annualMonthlyFeeAdjustment(): number {
        return this._annualMonthlyFeeAdjustment;
    }
    public set annualMonthlyFeeAdjustment(value: number) {
        this._annualMonthlyFeeAdjustment = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get companyRepresentativeName(): string {
        return this._companyRepresentativeName;
    }
    public set companyRepresentativeName(value: string) {
        this._companyRepresentativeName = value;
    }
    public get monthlyFee(): number {
        return this._montlyFee;
    }
    public set monthlyFee(value: number) {
        this._montlyFee = value;
    }
    public get previousMontlyFee(): number {
        return this._previousMontlyFee;
    }
    public set previousMontlyFee(value: number) {
        this._previousMontlyFee = value;
    }
    public get commission(): number {
        return this._commission;
    }
    public set commission(value: number) {
        this._commission = value;
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
            name: this._name,
            email: this._email,
            companyRepresentativeName: this._companyRepresentativeName,
            monthlyFee: this._montlyFee,
            previousMontlyFee: this._previousMontlyFee,
            commission: this._commission,
            annualMonthlyFeeAdjustment: this._annualMonthlyFeeAdjustment,
            active: this._active ? 1 : 0
        };
    }

    public static fromJSON(json: any): Client {
        const client = new Client();
        client.id = json.id;
        client.name = json.name;
        client.email = json.email;
        client.companyRepresentativeName = json.companyRepresentativeName;
        client.monthlyFee = json.monthlyFee;
        client.previousMontlyFee = json.previousMontlyFee;
        client.commission = json.commission;
        client.annualMonthlyFeeAdjustment = json.annualMonthlyFeeAdjustment;
        client.active = json.active === undefined || json.active === true || json.active === 1;
        return client;
    }
}

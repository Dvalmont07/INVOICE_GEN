export class Client {
    private _name: string = "";
    private _email: string = "";
    private _companyRepresentativeName: string = "";
    private _montlyFee: number = 0;
    private _previousMontlyFee: number = 0;   
    private _commission: number = 0;
    private _annualMonthlyFeeAdjustment: number = 0;

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
}

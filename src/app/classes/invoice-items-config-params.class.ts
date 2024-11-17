export class InvoiceItemsConfigParams {
    private _refMonth: number = 0;
    private _refYear: number = 0;
    private _montlyFee: number = 0;
    private _commission: number = 0;
    private _creditedAmount: number = 0;
    private _lastMontyPendencies: number = 0;
    private _creditCardFees: number = 0;

    public get refMonth(): number {
        return this._refMonth;
    }
    public set refMonth(value: number) {
        this._refMonth = value;
    }
    public get refYear(): number {
        return this._refYear;
    }
    public set refYear(value: number) {
        this._refYear = value;
    }

    public get montlyFee(): number {
        return this._montlyFee;
    }
    public set montlyFee(value: number) {
        this._montlyFee = value;
    }

    public get commission(): number {
        return this._commission;
    }
    public set commission(value: number) {
        this._commission = value;
    }

    public get creditedAmount(): number {
        return this._creditedAmount;
    }
    public set creditedAmount(value: number) {
        this._creditedAmount = value;
    }

    public get lastMontyPendencies(): number {
        return this._lastMontyPendencies;
    }
    public set lastMontyPendencies(value: number) {
        this._lastMontyPendencies = value;
    }

    public get creditCardFees(): number {
        return this._creditCardFees;
    }
    public set creditCardFees(value: number) {
        this._creditCardFees = value;
    }
}

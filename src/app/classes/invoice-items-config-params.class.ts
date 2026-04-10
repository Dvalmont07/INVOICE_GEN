import { InvoiceItems } from "./invoice-items.class";

export class InvoiceItemsConfigParams {
    private _refMonth: number = 0;
    private _refYear: number = 0;
    private _montlyFee: number = 0;
    private _commission: number = 0;
    private _creditedAmount: number = 0;
    private _lastMontyPendencies: number = 0;
    private _creditCardFees: number = 0;
    private _annualMonthlyFeeAdjustment: number = 0;
    private _previousMontlyFee: number = 0;   
    private _deduction: number = 0;
    private _customItems: InvoiceItems[] = [];
   
    public get deduction(): number {
        return this._deduction;
    }
    public set deduction(value: number) {
        this._deduction = value;
    }

    public get previousMontlyFee(): number {
        return this._previousMontlyFee;
    }
    public set previousMontlyFee(value: number) {
        this._previousMontlyFee = value;
    }

    public get annualMonthlyFeeAdjustment(): number {
        return this._annualMonthlyFeeAdjustment;
    }
    public set annualMonthlyFeeAdjustment(value: number) {
        this._annualMonthlyFeeAdjustment = value;
    }
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

    public get customItems(): InvoiceItems[] {
        return this._customItems;
    }
    public set customItems(value: InvoiceItems[]) {
        this._customItems = value;
    }

    public toJSON() {
        return {
            refMonth: this._refMonth,
            refYear: this._refYear,
            montlyFee: this._montlyFee,
            commission: this._commission,
            creditedAmount: this._creditedAmount,
            lastMontyPendencies: this._lastMontyPendencies,
            creditCardFees: this._creditCardFees,
            annualMonthlyFeeAdjustment: this._annualMonthlyFeeAdjustment,
            previousMontlyFee: this._previousMontlyFee,
            deduction: this._deduction,
            customItems: this._customItems.map(item => item.toJSON())
        };
    }

    public static fromJSON(json: any): InvoiceItemsConfigParams {
        const params = new InvoiceItemsConfigParams();
        params.refMonth = json.refMonth;
        params.refYear = json.refYear;
        params.montlyFee = json.montlyFee;
        params.commission = json.commission;
        params.creditedAmount = json.creditedAmount;
        params.lastMontyPendencies = json.lastMontyPendencies;
        params.creditCardFees = json.creditCardFees;
        params.annualMonthlyFeeAdjustment = json.annualMonthlyFeeAdjustment;
        params.previousMontlyFee = json.previousMontlyFee;
        params.deduction = json.deduction;
        if (json.customItems) {
            params.customItems = json.customItems.map((item: any) => InvoiceItems.fromJSON(item));
        }
        return params;
    }
}

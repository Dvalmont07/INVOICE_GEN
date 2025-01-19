
export class InvoiceItems {
    private _description: string = "";
    private _quantity: number = 1;
    private _price: number = 0;
    private _observation: string = "";

    public get observation(): string {
        return this._observation;
    }
    public set observation(value: string) {
        this._observation = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }

    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }

    public get total(): number {
        return this._quantity * this._price;
    }

    constructor(description: string, quantity: number, price: number, observation: string = "") {
        this._description = description;
        this._quantity = quantity;
        this._price = price;
        this._observation = observation;
    }
}
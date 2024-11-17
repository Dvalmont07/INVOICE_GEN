
export class InvoiceItems {


    private _description: string = "";
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    private _quantity: number = 1;
    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }

    private _price: number = 0;
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }

    public get total(): number {
        return this._quantity * this._price;
    }

    constructor(description: string, quantity: number, price: number) {
        this._description = description;
        this._quantity = quantity;
        this._price = price;
    }
}
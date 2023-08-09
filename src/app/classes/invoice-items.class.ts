export class InvoiceItems {

    private _id: number = 0;
    private _invoiceId: number = 0;
    private _description: string = "";
    private _quantity: number = 1;
    private _price: number = 0;

    constructor(description: string, quantity: number, price: number) {
        this._description = description;
        this._quantity = quantity;
        this._price = price;
    }

    public get Id(): number {
        return this._id;
    }
    public set Id(value: number) {
        this._id = value;
    }
    public get InvoiceId(): number {
        return this._invoiceId;
    }
    public set InvoiceId(value: number) {
        this._invoiceId = value;
    }
    public get Description(): string {
        return this._description;
    }
    public set Description(value: string) {
        this._description = value;
    }
    public get Quantity(): number {
        return this._quantity;
    }
    public set Quantity(value: number) {
        this._quantity = value;
    }
    public get Price(): number {
        return this._price;
    }
    public set Price(value: number) {
        this._price = value;
    }
    public get Total(): number {
        return this._quantity * this._price;
    }
}
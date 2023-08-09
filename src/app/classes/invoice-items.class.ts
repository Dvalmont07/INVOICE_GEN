export class InvoiceItems {

    private _id: number = 0;
    public get Id(): number {
        return this._id;
    }
    public set Id(value: number) {
        this._id = value;
    }
    private _invoiceId: number = 0;
    public get InvoiceId(): number {
        return this._invoiceId;
    }
    public set InvoiceId(value: number) {
        this._invoiceId = value;
    }

    private _description: string = "";
    public get Description(): string {
        return this._description;
    }
    public set Description(value: string) {
        this._description = value;
    }

    private _quantity: number = 1;
    public get Quantity(): number {
        return this._quantity;
    }
    public set Quantity(value: number) {
        this._quantity = value;
    }

    private _price: number = 0;
    public get Price(): number {
        return this._price;
    }
    public set Price(value: number) {
        this._price = value;
    }

    public get Total(): number {
        return this._quantity * this._price;
    }

    constructor(description: string, quantity: number, price: number) {
        this._description = description;
        this._quantity = quantity;
        this._price = price;
    }

}
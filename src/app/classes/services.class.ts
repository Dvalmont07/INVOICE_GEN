export class Service {


    private _name: string = "";
    public get Name(): string {
        return this._name;
    }
    public set Name(value: string) {
        this._name = value;
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

    constructor(name: string, quantity: number, price: number) {
        this._name = name;
        this._quantity = quantity;
        this._price = price;
    }

}
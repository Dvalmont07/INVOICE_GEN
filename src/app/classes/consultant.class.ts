export class Consultant {
    private _name: string = "";
    public get Name(): string {
        return this._name;
    }
    public set Name(value: string) {
        this._name = value;
    }

    private _pixKey: string = "";    
    public get PixKey(): string {
        return this._pixKey;
    }
    public set PixKey(value: string) {
        this._pixKey = value;
    }
    
    private _bankName: string = "";
    public get BankName(): string {
        return this._bankName;
    }
    public set BankName(value: string) {
        this._bankName = value;
    }
    
  



}
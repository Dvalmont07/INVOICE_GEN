export class Client {
    private _name: string = "";
    public get Name(): string {
        return this._name;
    }
    public set Name(value: string) {
        this._name = value;
    }

    private _email: string = "";
    public get Email(): string {
        return this._email;
    }
    public set Email(value: string) {
        this._email = value;
    }
    private _companyRepresentativeName: string = "";
    public get CompanyRepresentativeName(): string {
        return this._companyRepresentativeName;
    }
    public set CompanyRepresentativeName(value: string) {
        this._companyRepresentativeName = value;
    }
}
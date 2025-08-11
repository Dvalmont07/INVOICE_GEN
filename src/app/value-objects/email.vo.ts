export class Email {
    private readonly _value: string;

    constructor(value: string) {
        if (!value || value.trim() === "") {
            throw new Error("Email cannot be empty.");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error("Invalid email format.");
        }
        this._value = value;
    }

    public get value(): string {
        return this._value;
    }

    public toString(): string {
        return this._value;
    }
}

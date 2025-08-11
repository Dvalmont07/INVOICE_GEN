import { Email } from './email.vo'; // Adjust the path as necessary

describe('Email Value Object', () => {
    // Test suite for valid email inputs
    describe('Valid Email', () => {
        it('should create an Email object for a valid email string', () => {
            const validEmailString = 'test@example.com';
            const email = new Email(validEmailString);
            expect(email).toBeInstanceOf(Email);
            expect(email.value).toBe(validEmailString);
        });

        it('should create an Email object for a valid email with subdomains', () => {
            const validEmailString = 'user.name@sub.example.co.uk';
            const email = new Email(validEmailString);
            expect(email.value).toBe(validEmailString);
        });

        it('should create an Email object for a valid email with numbers and special characters in local part', () => {
            const validEmailString = 'user123+alias@example-domain.com';
            const email = new Email(validEmailString);
            expect(email.value).toBe(validEmailString);
        });
    });

    // Test suite for invalid email inputs (emptiness)
    describe('Empty or Null Email', () => {
        it('should throw an error if the email string is empty', () => {
            expect(() => new Email('')).toThrowError('Email cannot be empty.');
        });

        it('should throw an error if the email string consists only of whitespace', () => {
            expect(() => new Email('   ')).toThrowError('Email cannot be empty.');
        });

        it('should throw an error if the email string is null', () => {
            // In TypeScript, you'd likely get a compile-time error if your function expects string
            // but for robustness or JavaScript interop, this test can be useful.
            // We cast to 'any' to bypass TypeScript's strict null checks for the test.
            expect(() => new Email(null as any)).toThrowError('Email cannot be empty.');
        });

        it('should throw an error if the email string is undefined', () => {
            expect(() => new Email(undefined as any)).toThrowError('Email cannot be empty.');
        });
    });

    // Test suite for invalid email formats
    describe('Invalid Email Format', () => {
        const invalidFormatError = 'Invalid email format.';

        it('should throw an error for an email without "@" symbol', () => {
            expect(() => new Email('testexample.com')).toThrowError(invalidFormatError);
        });

        it('should throw an error for an email without a domain', () => {
            expect(() => new Email('test@')).toThrowError(invalidFormatError);
        });

        it('should throw an error for an email without a top-level domain', () => {
            expect(() => new Email('test@example')).toThrowError(invalidFormatError);
        });

        it('should throw an error for an email starting with "@"', () => {
            expect(() => new Email('@example.com')).toThrowError(invalidFormatError);
        });

        it('should throw an error for an email with spaces', () => {
            expect(() => new Email('test @example.com')).toThrowError(invalidFormatError);
        });

        it('should throw an error for an email ending with a dot in the domain', () => {
            expect(() => new Email('test@example.')).toThrowError(invalidFormatError);
        });

        it('should throw an error for an email with multiple "@" symbols', () => {
            expect(() => new Email('test@@example.com')).toThrowError(invalidFormatError);
        });
    });

    // Test suite for the toString method
    describe('toString Method', () => {
        it('should return the email string when toString() is called', () => {
            const emailString = 'contact@domain.org';
            const email = new Email(emailString);
            expect(email.toString()).toBe(emailString);
        });
    });
});

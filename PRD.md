# PRD - InvoiceGen

## 1. Overview

InvoiceGen is an Angular application focused on creating, previewing, exporting, and tracking PDF invoices. The product supports a simple operational workflow: maintain registered clients and consultants, select the relevant billing data, automatically calculate invoice line items, and generate a professional PDF with local history.

The current project state indicates a web/PWA application with local persistence through IndexedDB using Dexie, plus NativeScript assets/configuration for Android and iOS. The primary experience runs in the browser and uses `html2canvas` and `jspdf` to transform the HTML invoice preview into a PDF file.

## 2. Product Objective

Centralize and simplify recurring invoice generation for clients, reducing manual work, standardizing the document layout, and keeping a local history of generated invoices.

## 3. Problem

Manual recurring invoice creation can lead to calculation mistakes, inconsistent numbering, layout variation, missing history, and repeated work when reusing client and consultant data.

## 4. Target Audience

- Consultants or service providers who issue recurring invoices to clients.
- Small administrative operations that need to generate PDF invoices without a full fiscal system.
- Users who need to keep simple financial data locally without a backend.

## 5. Initial Personas

### Issuing Consultant

Needs to quickly generate a monthly invoice for a client, including monthly fee, commission, due date, bank/PIX information, and signature. Values speed, consistency, and a PDF file ready to send.

### Administrative Operator

Needs to register and update clients, review invoice history, avoid duplicate numbering, and reuse persisted data. Values control, predictability, and low friction.

## 6. Observed Current Scope

### Included

- Invoice generation from client, consultant, reference month/year, and financial values.
- Automatic calculation of invoice line items.
- PDF invoice export.
- Local persistence of clients, consultants, and invoices through IndexedDB.
- Generated invoice history.
- Basic client CRUD.
- Basic consultant CRUD.
- Initial seeding of clients and consultant when the local database is empty.
- pt-BR regional defaults for currency, dates, and displayed month text.
- Production Service Worker registration for PWA behavior.

### Out of Current Scope

- Backend, authentication, and multi-account users.
- Official fiscal invoice integration.
- Automatic email or WhatsApp delivery.
- Cloud synchronization.
- Payment/receivable tracking.
- Multi-currency support.
- Consolidated financial dashboard.

## 7. Main User Journey

1. User opens the main `/invoice` route.
2. System loads registered clients and consultants from IndexedDB.
3. System suggests the next invoice number, starting at `100300` when there is no history.
4. User selects a client and consultant.
5. System loads monthly fee, previous monthly fee, commission percentage, and annual adjustment percentage from the selected client.
6. User enters additional values, such as credited amount, pending balance, credit card fees, deductions, and custom items.
7. User calculates the invoice.
8. System validates required fields and prevents duplicate invoice numbers in history.
9. System builds invoice line items and updates the preview.
10. User generates the PDF.
11. System downloads the PDF and saves the invoice to local history.

## 8. Functional Requirements

### FR01 - Generate Invoice

The system must allow users to create an invoice by providing client, consultant, invoice number, reference month/year, due date, and complementary financial values.

### FR02 - Calculate Items Automatically

The system must generate default line items based on the provided parameters:

- Monthly fee for the reference month/year.
- Commission percentage over the credited amount.
- Previous month pending amount, when provided.
- Credit card fees, when provided.
- Deduction/discount, when provided.
- Custom items added by the user.

### FR03 - Apply Annual Adjustment in February

When the reference month is February, the system must include an annual monthly fee adjustment note based on the client's configured percentage and previous monthly fee.

### FR04 - Generate PDF

The system must export the invoice preview as an A4 PDF, using a consistent layout, white background, and customizable file name.

### FR05 - Save History

After PDF generation, the system must save the invoice to local history.

### FR06 - View History

The system must list generated invoices, showing reference month, client, creation date, and total.

### FR07 - Open Invoice From History

The system must allow users to open an invoice from history in the generation screen for review or reuse.

### FR08 - Delete Invoice From History

The system must allow users to logically delete an invoice by marking it as inactive.

### FR09 - Manage Clients

The system must allow users to create, list, edit, and logically delete clients.

### FR10 - Manage Consultants

The system must allow users to create, list, edit, and logically delete consultants.

### FR11 - Initialize Local Database

When the local database is empty, the system must seed initial client and consultant data for immediate use.

## 9. Business Rules

- Invoice number is required.
- Invoice number must not duplicate another active invoice number in history.
- The first suggested invoice number must be `100300` when there is no history.
- The next suggested invoice number must be the highest existing number plus 1, respecting the minimum `100300`.
- Client and consultant are required to calculate an invoice.
- Reference month and year are required.
- Due date is required.
- Credited amount is required to calculate commission.
- The default due date should be the 10th day of the month following the reference month.
- The default file name follows this format: `{Client} - Nota {Number} - {YYYYMM}.pdf`.
- Deletions are logical through the `active` field.
- Monetary values must be displayed in BRL.
- Dates and month names must follow pt-BR formatting.

## 10. Initial Data Model

### Client

- `id`
- `name`
- `email`
- `companyRepresentativeName`
- `monthlyFee`
- `previousMontlyFee`
- `commission`
- `annualMonthlyFeeAdjustment`
- `active`

### Consultant

- `id`
- `firstName`
- `lastName`
- `companyName`
- `pixKey`
- `bankName`
- `email`
- `signature`
- `active`

### Invoice

- `id`
- `number`
- `client`
- `consultant`
- `referenceMonth`
- `referenceYear`
- `dueDate`
- `services`
- `customDay`
- `customMonth`
- `customYear`
- `customFileName`
- `active`
- `createdAt`

### Invoice Item

- `description`
- `quantity`
- `price`
- `observation`
- `total`, calculated as `quantity * price`

## 11. Non-Functional Requirements

- The application must support the main workflow without a backend.
- Data must persist locally in the browser through IndexedDB.
- PDF export must preserve the layout even on responsive screens.
- The application must use pt-BR locale and BRL currency by default.
- The interface must be simple, direct, and suitable for recurring operations.
- The app must be buildable through Angular CLI.
- In production, the Service Worker must be registered for PWA support.

## 12. Observed Technical Architecture

- Framework: Angular 17.
- Language: TypeScript.
- Styling: SCSS/CSS.
- Persistence: IndexedDB with Dexie.
- Data access pattern: injectable repositories.
- PDF export: `html2canvas` + `jspdf`.
- Data initialization: `APP_INITIALIZER` with `DatabaseSeederService`.
- Tests: Karma/Jasmine configured.
- Main routes:
  - `/invoice`
  - `/management/clients`
  - `/management/clients/new`
  - `/management/clients/edit/:id`
  - `/management/consultants`
  - `/management/consultants/new`
  - `/management/consultants/edit/:id`
  - `/management/history`

## 13. Success Metrics

- Average time to generate a recurring invoice.
- Number of invoices generated without later manual editing.
- Error/alert rate during invoice calculation.
- Number of duplicate invoice numbers blocked.
- Frequency of history usage for review or reissue.
- Local data retention across sessions.

## 14. Risks and Watch Points

- Persistence is local; browser data loss may delete clients, consultants, and history.
- There is no authentication, backup, or synchronization.
- PDF generation depends on browser rendering and may vary by environment.
- Some entities use text identifiers in edit/delete routes, such as client name and consultant full name, which may create ambiguity.
- The README mentions LocalStorage, but the current code uses IndexedDB/Dexie.
- Some files show signs of incorrect text encoding, which may affect displayed content.

## 15. Suggested Initial Backlog

### High Priority

- Fix text encoding in displayed application strings and README.
- Review the default due date rule to ensure consistency between "current month" and "month following the reference month".
- Standardize edit/delete identifiers to use `id` instead of names.
- Create a local data backup/export and import flow.
- Add tests for invoice item calculation and duplicate invoice number blocking.

### Medium Priority

- Add history filters by client, period, and invoice number.
- Allow reissuing an invoice from history without a numbering conflict.
- Improve form validations with inline messages.
- Add invoice status, such as generated, sent, paid, or canceled.
- Allow visual configuration of signature and watermark.

### Low Priority

- Create a summarized billing dashboard.
- Add email delivery.
- Add cloud synchronization.
- Support multiple PDF templates.

## 16. Open Questions

- Should the product remain 100% local or evolve toward backend/synchronization?
- Should history represent only generated PDFs or also drafts?
- Should invoice numbering be global, per consultant, or per client?
- Should the due date always be the 10th day of the month following the reference period?
- Should the signature be registered by the user or kept as a default asset?
- Should the system track payment/receivable status after issuance?

## 17. Current Version Acceptance Criteria

- User can register at least one active client.
- User can register at least one active consultant.
- User can select client and consultant in the invoice screen.
- User can calculate invoice items with monthly fee and commission.
- User can add a custom item.
- User can generate a PDF with an appropriate file name.
- Generated invoice appears in history.
- User can open an invoice from history.
- User can delete an invoice from history without physically removing data from the database.

## 18. Local Sources Reviewed

- `README.md`
- `package.json`
- `src/app/app-routing.module.ts`
- `src/app/app.module.ts`
- `src/app/classes/*.ts`
- `src/app/invoice/invoice-generator/*`
- `src/app/invoice/invoice-preview/*`
- `src/app/management/**/*`
- `src/app/services/**/*`

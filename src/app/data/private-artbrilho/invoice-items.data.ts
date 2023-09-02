import { InvoiceItems } from "src/app/classes/invoice-items.class";

export const SERVICES:InvoiceItems[] = [];
SERVICES.push(new InvoiceItems("Mensalidade Referente ao mês de agosto de 2023", 1, 300));
SERVICES.push(new InvoiceItems(`Percentual referente aos 20% sobre os RS 1.000,00 creditados em agosto de 2023`, 1, 200));

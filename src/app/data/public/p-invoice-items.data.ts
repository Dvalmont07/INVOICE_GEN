import { InvoiceItems } from "src/app/classes/invoice-items.class";

export const SERVICES: InvoiceItems[] = [];
SERVICES.push(new InvoiceItems("Mensalidade Referente ao mês de junho de 2023", 3, 100));
SERVICES.push(new InvoiceItems("Percentual referente aos 20% sobre os RS 1.000,00 creditados em junho de 2003", 2, 200));

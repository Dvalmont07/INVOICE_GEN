import { InvoiceItems } from "src/app/classes/invoice-items.class";

export const SERVICES:InvoiceItems[] = [];
SERVICES.push(new InvoiceItems("Mensalidade Referente ao mês de agosto de 2023", 1, 257.60));
SERVICES.push(new InvoiceItems(`Percentual referente aos 14% sobre os RS R$ 3.600,00 creditados em agosto de 2023`, 1, 504));
SERVICES.push(new InvoiceItems(`Valor faltante do mês de julho de 2023`, 1, 635.60));
SERVICES.push(new InvoiceItems(`Total do cartão de crédito utilizado`, 1, 3600));
SERVICES.push(new InvoiceItems(`Desconto sobre indicação Art-Brilho`, 1, -128.80));

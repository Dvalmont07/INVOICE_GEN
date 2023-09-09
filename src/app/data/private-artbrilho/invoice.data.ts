// import { Invoice } from "src/app/classes/invoice.class";
// import { CONSULTANT } from "../public/p-consultant.data";
// import { SERVICES } from "../public/p-invoice-items.data";
// import { CLIENT } from "../public/p-client.data";

import { Invoice } from "src/app/classes/invoice.class";
import { CONSULTANT } from "./consultant.data";
import { SERVICES } from "./invoice-items.data";
import { CLIENT } from "./client.data";

export const INVOICE: Invoice = new Invoice();

 //INVOICE.Id = 100059;
INVOICE.Number = 100061;
INVOICE.DueDate = new Date("09/10/2023");
INVOICE.Consultant = CONSULTANT;
INVOICE.Client = CLIENT;
INVOICE.Services = SERVICES;
INVOICE.ReferenceMonth = 8;
INVOICE.ReferenceYear = 2023;
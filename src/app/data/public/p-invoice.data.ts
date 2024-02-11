//import { Invoice } from "src/app/classes/invoice.class";
//import { SERVICES } from "../private/invoice-items.data";

 import { Invoice } from "src/app/classes/invoice.class";
 import { SERVICES } from "./p-invoice-items.data";

export const INVOICE: Invoice = new Invoice();

INVOICE.Id = 50001;
INVOICE.DueDate = new Date("07/10/2023");
//INVOICE.Consultant = CONSULTANT;
//INVOICE.Client = CLIENT;
//INVOICE.InvoiceItems = SERVICES;
INVOICE.ReferenceMonth = 6;
INVOICE.ReferenceYear = 2003;
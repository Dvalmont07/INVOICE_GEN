import { Invoice } from "src/app/classes/invoice.class";
import { PCONSULTANT } from "./p-consultant.data";
import { SERVICES } from "./services.data";
import { CLIENT } from "./client.data";

export const INVOICE: Invoice = new Invoice();

INVOICE.Number = 50001;
INVOICE.DueDate = new Date("07/10/2023");
INVOICE.Consultant = PCONSULTANT;
INVOICE.Client = CLIENT;
INVOICE.Services = SERVICES;
INVOICE.ReferenceMonth = 6;
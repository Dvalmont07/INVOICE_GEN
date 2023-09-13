import { Invoice } from "src/app/classes/invoice.class";

import { SERVICES } from "../private/private-artbrilho/invoice-items.data";
import { CLIENT } from "../private/private-artbrilho/client.data";
import { CONSULTANT } from "../private/private-artbrilho/consultant.data";

// import { Invoice } from "src/app/classes/invoice.class";
// import { SERVICES } from "./p-services.data";
// import { CLIENT } from "./p-client.data";
// import { CONSULTANT } from "./p-consultant.data";

export const INVOICE: Invoice = new Invoice();

INVOICE.Number = 50001;
INVOICE.DueDate = new Date("07/10/2023");
INVOICE.Consultant = CONSULTANT;
INVOICE.Client = CLIENT;
INVOICE.Services = SERVICES;
INVOICE.ReferenceMonth = 6;
INVOICE.ReferenceYear = 2003;
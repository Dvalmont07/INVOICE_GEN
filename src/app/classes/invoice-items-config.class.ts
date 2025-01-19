import { InvoiceItemsConfigParams } from "./invoice-items-config-params.class";
import { InvoiceItems } from "./invoice-items.class";

export class InvoiceItemsConfig {

    private readonly _params: InvoiceItemsConfigParams = new InvoiceItemsConfigParams();

    constructor(params: InvoiceItemsConfigParams) {
        this._params = params;
    }

    public get formattedDate(): string {
        return new Date(0, this._params.refMonth - 1).toLocaleString('pt-BR', { month: 'long' });
    }
    public get totalCommission(): number {
        return (this._params.creditedAmount * this._params.commission) / 100;
    }
    public get formattedCreditedAmount(): string {
        return this._params.creditedAmount.toLocaleString('pt-BR', {currency: 'BRL', minimumFractionDigits: 2 });
    }

    public get services(): InvoiceItems[] {
        const services: InvoiceItems[] = [];
        services.push(new InvoiceItems(`Mensalidade referente ao mês de ${this.formattedDate} de ${this._params.refYear}`, 1, this._params.montlyFee,"Ajuste anual da mensalide: 4,83% (+R$ 15,16), referentea à inflação acumulada de 2024 (IPCA)"));
        services.push(new InvoiceItems(`Percentual referente aos ${this._params.commission}% sobre os R$ ${this.formattedCreditedAmount} creditados em ${this.formattedDate} de ${this._params.refYear}`, 1, this.totalCommission));

        if (this._params.lastMontyPendencies > 0) {
            services.push(new InvoiceItems(`Valor em aberto mês de anterior`, 1, this._params.lastMontyPendencies));
        }

        if (this._params.creditCardFees > 0) {
            services.push(new InvoiceItems(`Soma referente ao(s) valor(es) adicionado(s) em cartão de crédito`, 1, this._params.creditCardFees));
        }
        return services;
    }
}


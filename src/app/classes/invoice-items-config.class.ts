import { InvoiceItemsConfigParams } from "./invoice-items-config-params.class";
import { InvoiceItems } from "./invoice-items.class";

export class InvoiceItemsConfig {

    private _params: InvoiceItemsConfigParams = new InvoiceItemsConfigParams();

    constructor(params: InvoiceItemsConfigParams) {
        this._params = params;
    }

    public get formattedDate(): string {
        return new Date(0, this._params.refMonth - 1).toLocaleString('pt-BR', { month: 'long' });
    }
    public get totalCommission(): number {
        return (this._params.creditedAmount * this._params.commission) / 100;
    }
    public get refYear(): string {
        return new Date()
            .getFullYear()
            .toString();
    }
    public get services(): InvoiceItems[] {
        const services: InvoiceItems[] = [];
        services.push(new InvoiceItems(`Mensalidade referente ao mês de ${this.formattedDate} de ${this.refYear}`, 1, this._params.montlyFee));
        services.push(new InvoiceItems(`Percentual referente aos ${this._params.commission}% sobre os RS R$ ${this._params.creditedAmount},00 creditados em ${this._params.refMonth} de ${this.refYear}`, 1, this.totalCommission));

        if (this._params.lastMontyPendencies > 0) {
            services.push(new InvoiceItems(`Valor em aberto mês de anterior`, 1, this._params.lastMontyPendencies));
        }

        if (this._params.creditCardFees > 0) {
            services.push(new InvoiceItems(`Soma referente ao(s) valor(es) adicionado(s) em cartão de crédito`, 1, this._params.creditCardFees));
        }
        return services;
    }
}


import { InvoiceItemsConfigParams } from "./invoice-items-config-params.class";
import { InvoiceItems } from "./invoice-items.class";

export class InvoiceItemsConfig {

    private readonly _params: InvoiceItemsConfigParams = new InvoiceItemsConfigParams();

    constructor(params: InvoiceItemsConfigParams) {
        this._params = params;
    }

    public get longMonth(): string {
        const NON_VALID_INDEX = -1;
        return new Date(
            0,
            this._params.customRefMonth === NON_VALID_INDEX ?
                this._params.refMonth :
                this._params.customRefMonth)
            .toLocaleString('pt-BR', { month: 'long' });
    }
    get refYear() {
        const NON_VALID_INDEX = -1;
        return this._params.customRefYear === NON_VALID_INDEX ?
            this._params.refYear :
            this._params.customRefYear;
    }
    public get totalCommission(): number {
        return (this._params.creditedAmount * this._params.commission) / 100;
    }
    public get formattedCreditedAmount(): string {
        return this._params.creditedAmount.toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 });
    }

    private get monthlyFeeAnnualFeeCalculatation(): string {
        return (Math.round(this._params.previousMontlyFee * this._params.annualMonthlyFeeAdjustment) / 100).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 });
    }
    private get lastYear() {
        return new Date().getFullYear() - 1;
    }

    private get annualAdjustment(): string {
        if (this.validateIfIsFebrary()) {
            return `Ajuste anual da mensalide: ${this._params.annualMonthlyFeeAdjustment}% (+R$ ${this.monthlyFeeAnnualFeeCalculatation}), referentea à inflação acumulada de ${this.lastYear} (IPCA)`;
        }
        return "";
    }
    private validateIfIsFebrary(): boolean {
        return new Date().getMonth() === 1;
    }

    public get services(): InvoiceItems[] {
        const services: InvoiceItems[] = [];
        services.push(new InvoiceItems(`Mensalidade referente ao mês de ${this.longMonth} de ${this.refYear}`, 1, this._params.montlyFee, this.annualAdjustment));
        services.push(new InvoiceItems(`Percentual referente aos ${this._params.commission}% sobre os R$ ${this.formattedCreditedAmount} creditados em ${this.longMonth} de ${this.refYear}`, 1, this.totalCommission));

        if (this._params.lastMontyPendencies > 0) {
            services.push(new InvoiceItems(`Valor em aberto mês de anterior`, 1, this._params.lastMontyPendencies));
        }

        if (this._params.creditCardFees > 0) {
            services.push(new InvoiceItems(`Soma referente ao(s) valor(es) adicionado(s) em cartão de crédito`, 1, this._params.creditCardFees));
        }
        if (this._params.deduction > 0) {
            services.push(new InvoiceItems(`Valor abatido`, 1, -(this._params.deduction)));
        }
        return services;
    }
}


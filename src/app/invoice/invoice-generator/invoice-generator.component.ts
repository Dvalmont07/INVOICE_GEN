import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../classes/invoice.class';
import { InvoiceItemsConfigParams } from '../../classes/invoice-items-config-params.class';
import { InvoiceItemsConfig } from '../../classes/invoice-items-config.class';
import { InvoiceItems } from '../../classes/invoice-items.class';
import { IndexedDbClientRepository } from '../../services/repositories/indexed-db-client.repository';
import { IndexedDbConsultantRepository } from '../../services/repositories/indexed-db-consultant.repository';
import { IndexedDbInvoiceRepository } from '../../services/repositories/indexed-db-invoice.repository';

@Component({
  selector: 'app-invoice-generator',
  templateUrl: './invoice-generator.component.html',
  styleUrls: ['../../app.component.scss', '../../management/management.css', './invoice-generator.component.scss']
})
export class InvoiceGeneratorComponent implements OnInit, AfterViewInit {
  @ViewChild('clientSelect') clientSelect!: ElementRef;

  invoice: Invoice = new Invoice();
  params: InvoiceItemsConfigParams = new InvoiceItemsConfigParams();
  clients: any[] = [];
  consultants: any[] = [];

  newCustomItem: InvoiceItems = new InvoiceItems('', 1, 0);

  constructor(
    private clientRepo: IndexedDbClientRepository,
    private consultantRepo: IndexedDbConsultantRepository,
    private invoiceRepo: IndexedDbInvoiceRepository,
    private route: ActivatedRoute
  ) {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0 = January
    this.params.refMonth = currentMonth === 0 ? 12 : currentMonth;
    this.params.refYear = currentMonth === 0 ? today.getFullYear() - 1 : today.getFullYear();
    
    // Default due date: 10th of current month
    this.invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), 10);
  }

  ngOnInit() {
    this.clientRepo.getAll().subscribe(data => this.clients = data);
    this.consultantRepo.getAll().subscribe(data => {
      this.consultants = data;
      // Auto-select first consultant if available
      if (this.consultants.length > 0 && !this.invoice.consultant.firstName) {
        this.invoice.consultant = this.consultants[0];
      }
    });
    
    this.updateNextInvoiceNumber();

    this.route.queryParams.subscribe(queryParams => {
      if (queryParams['fromHistory']) {
        this.invoiceRepo.getById(queryParams['fromHistory']).subscribe(inv => {
          if (inv) this.invoice = inv;
        });
      }
    });
  }

  ngAfterViewInit() {
    this.focusClientSelect();
  }

  private focusClientSelect() {
    if (this.clientSelect) {
      setTimeout(() => {
        this.clientSelect.nativeElement.focus();
      }, 0);
    }
  }


  onClientSelect(event: any) {
    const name = event.target.value;
    if (name) {
      this.clientRepo.getById(name).subscribe(client => {
        if (client) {
          this.invoice.client = client;
          this.params.montlyFee = client.monthlyFee;
          this.params.previousMontlyFee = client.previousMontlyFee;
          this.params.commission = client.commission;
          this.params.annualMonthlyFeeAdjustment = client.annualMonthlyFeeAdjustment;
          
          this.calculateInvoice(); // Auto-calculate on selection
        }
      });
    }
  }

  onConsultantSelect(event: any) {
    const name = event.target.value;
    if (name) {
      this.consultantRepo.getById(name).subscribe(consultant => {
        if (consultant) this.invoice.consultant = consultant;
      });
    }
  }

  calculateInvoice() {
    if (!this.invoice.client.name) {
      alert('O campo Cliente é obrigatório!');
      return;
    }

    if (!this.invoice.consultant.fullName) {
      alert('O campo Consultor é obrigatório!');
      return;
    }

    if (!this.params.refMonth || !this.params.refYear) {
      alert('Os campos de Mês e Ano de referência são obrigatórios!');
      return;
    }

    if (!this.invoice.dueDate) {
      alert('O campo Data de Vencimento é obrigatório!');
      return;
    }

    if (this.params.creditedAmount === null || this.params.creditedAmount === undefined) {
      alert('O campo Valor Creditado é obrigatório!');
      return;
    }

    if (!this.invoice.number) {
      alert('O campo Número da Fatura é obrigatório!');
      return;
    }

    this.invoiceRepo.getAll().subscribe(history => {
      const exists = history.some(inv => inv.number === this.invoice.number);
      if (exists) {
        alert(`O número de fatura #${this.invoice.number} já existe no histórico. Use um número diferente.`);
        return;
      }

      // Set reference from params to invoice
      this.invoice.referenceMonth = this.params.refMonth;
      this.invoice.referenceYear = this.params.refYear;
      
      // Auto-populate custom filename with the current month/year (month following the reference month)
      const nextMonth = this.params.refMonth === 12 ? 1 : this.params.refMonth + 1;
      const nextYear = this.params.refMonth === 12 ? this.params.refYear + 1 : this.params.refYear;
      const fileMonth = nextMonth.toString().padStart(2, '0');
      
      this.invoice.customFileName = `${this.invoice.client.name} - Nota ${this.invoice.number} - ${nextYear}${fileMonth}`;

      const config = new InvoiceItemsConfig(this.params);
      this.invoice.services = config.services;
      
      // Auto-update due date to 10th if it's still default or month changed
      const currentDue = this.invoice.dueDate;
      if (currentDue.getDate() === 10 || currentDue.getMonth() !== (this.params.refMonth)) {
          this.invoice.dueDate = new Date(this.params.refYear, this.params.refMonth, 10);
      }

      console.log('Invoice items calculated', this.invoice.services);
    });
  }

  get formattedDueDate(): string {
    if (!this.invoice || !this.invoice.dueDate) return '';
    const d = this.invoice.dueDate;
    return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  }

  onDueDateChange(value: any) {
    if (value && typeof value === 'string') {
      this.invoice.dueDate = new Date(value + 'T00:00:00');
    } else if (value && value.target && value.target.value) {
      this.invoice.dueDate = new Date(value.target.value + 'T00:00:00');
    }
  }

  addCustomItem() {
    if (!this.newCustomItem.description || this.newCustomItem.price <= 0) {
      alert('Descrição e preço são obrigatórios para itens customizados!');
      return;
    }

    this.params.customItems.push(new InvoiceItems(
      this.newCustomItem.description,
      this.newCustomItem.quantity,
      this.newCustomItem.price
    ));

    // Reset form
    this.newCustomItem = new InvoiceItems('', 1, 0);
    
    // Auto-recalculate
    if (this.invoice.client.name) {
      this.calculateInvoice();
    }
  }

  removeCustomItem(index: number) {
    this.params.customItems.splice(index, 1);
    this.calculateInvoice();
  }

  public updateNextInvoiceNumber() {
    this.invoiceRepo.getAll().subscribe(history => {
      if (history.length > 0) {
        const maxNumber = Math.max(...history.map(inv => inv.number || 0));
        this.invoice.number = Math.max(maxNumber + 1, 100300);
      } else {
        this.invoice.number = 100300;
      }
      if (this.invoice.client.name) {
        this.calculateInvoice();
      }
      this.focusClientSelect();
    });
  }
}

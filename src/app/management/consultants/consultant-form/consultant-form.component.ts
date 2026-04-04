import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultant } from '../../../classes/consultant.class';
import { IndexedDbConsultantRepository } from '../../../services/repositories/indexed-db-consultant.repository';

@Component({
  selector: 'app-consultant-form',
  templateUrl: './consultant-form.component.html',
  styleUrls: ['../../management.css']
})
export class ConsultantFormComponent implements OnInit {
  consultant: Consultant = new Consultant();
  isEdit: boolean = false;

  constructor(
    private consultantRepo: IndexedDbConsultantRepository,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.consultantRepo.getById(id).subscribe(data => {
        if (data) this.consultant = data;
      });
    }
  }

  saveConsultant(): void {
    if (!this.consultant.firstName || !this.consultant.lastName) {
      alert('Nome e sobrenome são obrigatórios!');
      return;
    }
    this.consultantRepo.save(this.consultant).subscribe(() => {
      this.router.navigate(['/management/consultants']);
    });
  }
}

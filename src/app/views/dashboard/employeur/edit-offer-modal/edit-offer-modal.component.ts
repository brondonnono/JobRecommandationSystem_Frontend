import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmButtonModalComponent } from '../../../../additionals-components/confirm-button-modal/confirm-button-modal.component';
import { EditItemModalComponent } from '../../../../additionals-components/edit-item-modal/edit-item-modal.component';
import { DataService } from '../../../../services/data.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-edit-offer-modal',
  templateUrl: './edit-offer-modal.component.html',
  styleUrls: ['./edit-offer-modal.component.scss']
})
export class EditOfferModalComponent implements OnInit {

  public textPattern: string = "[a-zA-Z]*";
  public competencePattern: string = "[a-zA-Z]*";
  public form = this.fb.group({
    libelle: [''],
    posteVise: [''],
    description: [''],
    dateExpiration: [''],
    typeOffre: [''],
    competence: ['']
  });

  public isLoading: boolean = false;
  public isAdding: boolean = false;
  public isError: boolean = false;
  public isSuccess: boolean = false;

  public credentials = {
    id: 0,
    employeur_id: parseInt(localStorage.getItem('employeur_id')),
    libelle: '',
    posteVise: '',
    description: '',
    dateExpiration: '',
    typeOffre: '',
    competences: null
  };

  public input_competence = '';

  public competences = [];

  constructor(
    private fb: FormBuilder,
    public notificationService: NotificationService,
    private dataService: DataService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.credentials.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.initData();
  }

  get f() {
    return this.form.controls;
  }

  public initForm(): void {
    this.form = this.fb.group({
      libelle: ['', Validators.pattern],
      posteVise: [''],
      description: [''],
      dateExpiration: [''],
      typeOffre: [''],
      competence: ['']
    });
  }

  public update() {
    this.credentials.competences = this.toString(this.competences);
    this.isLoading = true;
    this.dataService.updateOffre(this.credentials.id, this.credentials.employeur_id, this.credentials.libelle, this.credentials.description, this.credentials.dateExpiration, this.credentials.posteVise,  this.credentials.competences, this.credentials.typeOffre)
      .subscribe((res: any) => {
        this.isLoading = false;
        if (res.message) {
          this.isError = true;
          this.notificationService.danger('Un erreur inattendue est survenue lors de la modification de l\'offre; Vérifiez votre connexion à internet et rééssayez');
        } else {
          this.isSuccess = true;
          this.notificationService.success('Opération réussie');
          this.resetCredentials();
          this.router.navigateByUrl('/employeur/listeOffres');
        }
      }, (error: any) => {
        this.isError = true;
        this.isLoading = false;
        this.notificationService.danger('Une erreur inattendue est survenue lors de la modification de l\'offre; Vérifiez votre connexion à internet et rééssayez');
      });
  }

  initData() {
    this.isLoading = true;
    this.isError = false;
    this.dataService.getOffreById(this.credentials.id).subscribe((res: any) => {
      this.isLoading = false;
      if (res.message) {
        this.notificationService.info(res.message);
      } else {
        this.credentials.employeur_id = res.employeur_id;
        this.credentials.libelle = res.libelle;
        this.credentials.dateExpiration = res.dateExpiration.toString().split(' ')[0];
        this.credentials.description = res.description;
        this.credentials.posteVise = res.posteVise;
        this.credentials.typeOffre = res.typeOffre;
        this.credentials.competences = res.competencesRequises;
        console.log(this.credentials);
        this.convertData(this.credentials.competences);
      }
    }, (err: any) => {
      this.isLoading = false;
      this.isError = true;
      this.notificationService.danger("Une erreur inattendue est survenue, verifiez votre connexion à internet; si cela persiste contactez l\'administrateur");
      this.router.navigateByUrl('/employeur/listeOffres');
    });
  }

  public resetCredentials() {
    this.credentials = {
      id: 0,
      employeur_id: parseInt(localStorage.getItem('employeur_id')),
      libelle: '',
      posteVise: '',
      description: '',
      dateExpiration: '',
      typeOffre: '',
      competences: ''
    };
  }

  public addCompetence(label?: string) {
    let input = '';
    if (label) {
      input = label;
    } else {
      input = this.input_competence;
      this.input_competence = '';
    }
    let competence = {
      'id': this.competences.length + 1,
      'label': input,
      'experience': 1,
    };
    this.competences.push(competence);
  }

  public openConfirmButtonModal(id): void {
    if (id == -1) {
      this.notificationService.danger('indexOfBoundException: ' + id);
      return;
    }
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmButtonModalComponent, { class: 'modal-primary modal-sm' });
    bsModalRef.onHidden.subscribe(() => {
      const edit = bsModalRef.content.isSuccess;
      const remove = bsModalRef.content.isError;
      if (edit) {
        const bsModalRef: BsModalRef = this.modalService.show(EditItemModalComponent, { class: 'modal-primary modal-md' });
        bsModalRef.onHidden.subscribe(() => {
          const result = bsModalRef.content.isSuccess;
          const isError = bsModalRef.content.isError;
          if (result) {
            this.competences[id].experience = parseInt(result);
            this.notificationService.success('Opération réussie');
          }
          if (isError) {
            this.notificationService.danger('Echec de la modification, une erreur inconnue s\'est produite, vérifer votre connexion à internet et rééssayez');
          }
        });
      }
      if (remove) {
        this.competences.splice(id, 1);
      }
    });
  }

  public position(id: number): number {
    for (let i = 0; i < this.competences.length; i++) {
      const item = this.competences[i];
      if (item.id == id) {
        return i;
      }
    }
  }

  public convertData(data: string) {
    let comp = data.split(';');
    this.competences = [];
    comp.forEach(value => {
      this.addCompetence(value);
    });
  }

  public toString(table) {
    let value = table[0].label;
    for (let i = 1; i < table.length; i++) {
      value += ';' + table[i].label;
    }
    return value;
  }
}

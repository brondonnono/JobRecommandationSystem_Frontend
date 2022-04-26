import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../../services/data.service';
import { NotificationService } from '../../../../services/notification.service';
import { EditItemModalComponent } from '../../../../additionals-components/edit-item-modal/edit-item-modal.component';
import { ConfirmButtonModalComponent } from '../../../../additionals-components/confirm-button-modal/confirm-button-modal.component';

@Component({
  selector: 'app-create-offre',
  templateUrl: './create-offre.component.html',
  styleUrls: ['./create-offre.component.scss']
})
export class CreateOffreComponent implements OnInit {

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
    dateExpiration: new Date(),
    typeOffre: '',
    competences: ''
  };

  public input_competence = '';

  public competences = [];

  constructor(
    private fb: FormBuilder,
    public notificationService: NotificationService,
    private dataService: DataService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
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

  public create() {
    this.credentials.competences = this.toString(this.competences);
    this.isLoading = true;
    console.log(this.credentials);
    this.dataService.createOffre(this.credentials.employeur_id, this.credentials.description, this.credentials.competences, this.credentials.typeOffre, this.credentials.dateExpiration, this.credentials.libelle, this.credentials.posteVise)
      .subscribe((res: any) => {
        this.isLoading = false;
        if (res.message) {
          this.isError = true;
          this.notificationService.danger('Un erreur inattendue est survenue lors de la création de l\'offre; Vérifiez votre connexion à internet et rééssayez');
        } else {
          this.isSuccess = true;
          this.notificationService.success('Opération réussie');
          this.resetCredentials();
        }
      }, (error: any) => {
        this.isError = true;
        this.isLoading = false;
        this.notificationService.danger('Une erreur inattendue est survenue lors de la création de l\'offre; Vérifiez votre connexion à internet et rééssayez');
      });
  }

  public resetCredentials() {
    this.credentials = {
      id: 0,
      employeur_id: parseInt(localStorage.getItem('employeur_id')),
      libelle: '',
      posteVise: '',
      description: '',
      dateExpiration: new Date(),
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
    // let res = this.competences.find((item) => { item.id == id});
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

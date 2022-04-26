import { ConfirmButtonModalComponent } from './../../../../additionals-components/confirm-button-modal/confirm-button-modal.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditItemModalComponent } from '../../../../additionals-components/edit-item-modal/edit-item-modal.component';
import { DataService } from '../../../../services/data.service';
import { NotificationService } from '../../../../services/notification.service';
import { UploadPictureModalComponent } from '../../../../additionals-components/upload-picture-modal/upload-picture-modal.component';

@Component({
  selector: 'app-profil-employe',
  templateUrl: './profil-employe.component.html',
  styleUrls: ['./profil-employe.component.scss']
})
export class ProfilEmployeComponent implements OnInit {

  public textPattern: string = "[a-zA-Z]*";
  public competencePattern: string = "[a-zA-Z]*";
  public form = this.fb.group({
    nom: ['', Validators.pattern],
    sexe: [''],
    ville: ['', Validators.pattern],
    formation: [''],
    competence: ['', Validators.pattern]
  });

  public isLoading: boolean = false;
  public isAdding: boolean = false;
  public isError: boolean = false;
  public isSuccess: boolean = false;
  public isEditing: boolean = false;

  public credentials = {
    id: 0,
    user_id: 0,
    email: 'brondonnono@gmail.com',
    img: '',
    nom: '',
    sexe: '',
    villeResidence: '',
    competences: '',
    formations: []
  };

  public budgetImage: { file: File, name: string, url: string } = {
    file: null,
    name: '',
    url: 'assets/img/avatars/kev1.jpg'
  };

  public img = {
    src: 'assets/img/avatars/kev1.jpg',
    type: ''
  };

  public competences = [];
  public input_competence = '';
  public selectedFormation = '';

  constructor(
    private fb: FormBuilder,
    public notificationService: NotificationService,
    private dataService: DataService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getEmployeData();
  }

  get f() {
    return this.form.controls;
  }


  ///file picture

  public selectFile(event: any): void {
    const file: File = event.target.files[0];
    const validationStatus: boolean = this.validateFile(file);
    if (!validationStatus) {
      this.notificationService.danger('Veuillez selectionner une image!');
      this.budgetImage.file = null;
      this.budgetImage.url = '';
      return;
    }
    this.budgetImage.file = file;
    this.budgetImage.name = file.name;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      this.budgetImage.url = fileReader.result as string;
    };
  }

  public validateFile(file: File): boolean {
    const pattern: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
    return pattern.includes(file.type);
  }

  public initForm(): void {
    this.form = this.fb.group({
      nom: ['', Validators.pattern],
      sexe: [''],
      ville: ['', Validators.pattern],
      formation: [''],
      competence: ['', Validators.pattern]
    });
  }

  public send() {
    this.credentials.competences = this.toString(this.competences);
    if (localStorage.getItem('employe_id')) {
      this.update();
    } else {
      this.create();
    }
  }

  public create() {
    this.isLoading = true;
    this.dataService.createEmploye(this.credentials.user_id, this.credentials.nom, this.credentials.sexe, this.selectedFormation, this.credentials.competences, this.credentials.villeResidence)
      .subscribe((res: any) => {
        this.isLoading = false;
        if (res.message) {
          this.isError = true;
          this.notificationService.danger('Une erreur inattendue est survenue lors de la mise à jour de votre profil; Vérifiez votre connexion à internet et rééssayez');
        } else {
          this.isSuccess = true;
          this.notificationService.success('Opération réussie');
          this.resetCredentials();
          this.getEmployeData();
        }
      }, (error: any) => {
        this.isError = true;
        this.isLoading = false;
        this.notificationService.danger('Une erreur inattendue est survenue lors de la mise à jour de votre profil; Vérifiez votre connexion à internet et rééssayez');
      });
  }

  public update(): void {
    this.isLoading = true;
    this.dataService.updateEmploye(this.credentials.id, this.credentials.user_id, this.credentials.nom, this.credentials.sexe, this.selectedFormation, this.credentials.competences, this.credentials.villeResidence)
      .subscribe((res: any) => {
        this.isLoading = false;
        if (res.message) {
          this.isError = true;
          this.notificationService.danger('Une erreur inattendue est survenue lors de la mise à jour de votre profil; Vérifiez votre connexion à internet et rééssayez');
        } else {
          this.isSuccess = true;
          this.notificationService.success('Opération réussie');
          this.resetCredentials();
          this.selectedFormation = '';
          this.getEmployeData();
        }
      }, (error: any) => {
        this.isError = true;
        this.isLoading = false;
        this.notificationService.danger('Une erreur inattendue est survenue lors de la mise à jour de votre profil; Vérifiez votre connexion à internet et rééssayez');
      });
  }

  public resetCredentials() {
    this.credentials = {
      id: 0,
      user_id: 0,
      email: '',
      img: '',
      nom: '',
      sexe: '',
      villeResidence: '',
      competences: '',
      formations: []
    };
  }

  public getDatabaseCompetences() {
    // this.dataService.getCompetences().subscribe((res) => {
    //   if (res.message) {
    //     this.isLoading = false;
    //     this.notificationService.danger(res.message);
    //   } else {
    //     localStorage.setItem('comp', res.id);
    //   }
    // }, (err: any) => {
    //   this.isLoading = false;
    //   this.notificationService.danger(err.message);
    // });

  }

  public addFormation() {
    this.credentials.formations.push(this.selectedFormation.trim());
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

  public show(bool: boolean) {
    this.isEditing = bool;
  }

  public getEmployeData() {
    this.dataService.getEmployerById(parseInt(localStorage.getItem('employe_id'))).subscribe((res: any) => {
      if (res.message) {
        this.isLoading = false;
      } else {
        this.credentials.id = res.id;
        this.credentials.user_id = res.user_id;
        this.credentials.nom = res.nom;
        this.credentials.sexe = res.sexe;
        this.credentials.villeResidence = res.villeResidence;
        this.selectedFormation = res.formations;
        this.convertData(res.formations, 'toTableForm');
        this.convertData(res.competences, 'toTableComp');
      }
    }, (err: any) => {
      this.isLoading = false;
      this.notificationService.danger(err.message);
    });
  }

  public convertData(data: string, type: string) {
    if (type == 'toTableForm') {
      this.credentials.formations = data.split(';');
    } else {
      let comp = data.split(';');
      this.competences = [];
      comp.forEach(value => {
        this.addCompetence(value);
      });
    }
  }

  public toString(table) {
    let value = table[0].label;
    for (let i = 1; i < table.length; i++) {
      value += ';' + table[i].label;
    }
    return value;
  }

  public openUploadPictureModal() {
    const bsModalRef: BsModalRef = this.modalService.show(UploadPictureModalComponent, { class: 'modal-primary modal-sm' });
    bsModalRef.onHidden.subscribe(() => {
      const isUploaded = bsModalRef.content.isSuccess;
      const isNotUploaded = bsModalRef.content.isError;
      if (isUploaded) {
        this.getEmployeData();
        this.notificationService.success('Opération réussie');
      } else if (isNotUploaded) {
        this.notificationService.danger('Une erreur inattendue est survenue lors de la tentative de mise à jour de votre photo de profil. Vérifiez votre connexion à internet et rééssayez');
      }
    });

  }

}

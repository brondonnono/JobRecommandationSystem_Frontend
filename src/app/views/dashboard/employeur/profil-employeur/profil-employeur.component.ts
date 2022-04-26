import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../../services/data.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-profil-employeur',
  templateUrl: './profil-employeur.component.html',
  styleUrls: ['./profil-employeur.component.scss']
})
export class ProfilEmployeurComponent implements OnInit {

  public textPattern: string = "[a-zA-Z]*";
  public competencePattern: string = "[a-zA-Z]*";
  public form = this.fb.group({
    nom: ['', Validators.pattern],
    description: [''],
    ville: ['', Validators.pattern],
    Secteur_activite: ['']
  });

  public isLoading: boolean = false;
  public isAdding: boolean = false;
  public isError: boolean = false;
  public isSuccess: boolean = false;

  public credentials = {
    id: 0,
    user_id: 0,
    nom: '',
    description: '',
    ville: '',
    Secteur_activite: ''
  };

  constructor(
    private fb: FormBuilder,
    public notificationService: NotificationService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getEmployeurData();
  }

  get f() {
    return this.form.controls;
  }

  public initForm(): void {
    this.form = this.fb.group({
      nom: ['', Validators.pattern],
      description: [''],
      ville: ['', Validators.pattern],
      Secteur_activite: ['']
    });
  }

  public send() {
    if (localStorage.getItem('employeur_id')) {
      this.update();
    } else {
      this.create();
    }
  }

  public create() {
    this.isLoading = true;
    this.dataService.createEmployeur(this.credentials.user_id, this.credentials.nom, this.credentials.description, this.credentials.Secteur_activite, this.credentials.ville)
      .subscribe((res: any) => {
        this.isLoading = false;
        if (res.message) {
          this.isError = true;
          this.notificationService.danger('Une erreur inattendue est survenue lors de la mise à jour de votre profil; Vérifiez votre connexion à internet et rééssayez');
        } else {
          this.isSuccess = true;
          this.notificationService.success('Opération réussie');
          this.resetCredentials();
          this.getEmployeurData();
        }
      }, (error: any) => {
        this.isError = true;
        this.isLoading = false;
        this.notificationService.danger('Une erreur inattendue est survenue lors de la mise à jour de votre profil; Vérifiez votre connexion à internet et rééssayez');
      });
  }

  public update(): void {
    this.isLoading = true;
    this.dataService.updateEmployeur(this.credentials.id, this.credentials.user_id, this.credentials.nom, this.credentials.description, this.credentials.Secteur_activite, this.credentials.ville)
      .subscribe((res: any) => {
        this.isLoading = false;
        if (res.message) {
          this.isError = true;
          this.notificationService.danger('Une erreur inattendue est survenue lors de la mise à jour de votre profil; Vérifiez votre connexion à internet et rééssayez');
        } else {
          this.isSuccess = true;
          this.notificationService.success('Opération réussie');
          this.resetCredentials();
          this.getEmployeurData();
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
      nom: '',
      description: '',
      ville: '',
      Secteur_activite: ''
    };
  }

  public getEmployeurData() {
    this.dataService.getEmployeurById(parseInt(localStorage.getItem('employeur_id'))).subscribe((res: any) => {
      if (res.message) {
        this.isLoading = false;
      } else {
        this.credentials.id = res.id;
        this.credentials.user_id = res.user_id;
        this.credentials.nom = res.nom;
        this.credentials.description = res.description;
        this.credentials.ville = res.ville;
        this.credentials.Secteur_activite = res.Secteur_activité;
      }
    }, (err: any) => {
      this.isLoading = false;
      this.notificationService.danger(err.message);
    });
  }

}

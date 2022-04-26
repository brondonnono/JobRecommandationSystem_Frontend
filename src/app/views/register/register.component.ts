import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent {
  public form: FormGroup;
  public isLoading: boolean = false;
  public errors: boolean = false;
  public Cpswd: '';
  public credentials = {
    email: '',
    username: '',
    pswd: '',
    type: "0"
  };

  constructor(
    fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
    this.form = fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      username: [
        '',
        [Validators.required]
      ],
      password: [
        '',
        Validators.required
      ],
      Cpassword: [
        '',
        Validators.required
      ],
      type: [
        '',
        Validators.required
      ]
    });
  }

  ngOnInit(): void { }

  /**
   * Login the user based on the form values
   */
  register(): void {
    console.log(this.credentials);
    this.isLoading = true;
    this.errors = false;
    if (this.credentials.email == '') {
      this.isLoading = false;
      this.errors = true;
      this.notificationService.danger('Adresse email obligatoire');
      return;
    } else if (this.credentials.pswd == '') {
      this.isLoading = false;
      this.errors = true;
      this.notificationService.danger('Mot de passe obligatoire');
      return;
    } else if (this.credentials.type == "0") {
      this.isLoading = false;
      this.errors = true;
      this.notificationService.danger('Veuillez choisir un type de compte');
      return;
    } else if (this.credentials.username == '') {
      this.isLoading = false;
      this.errors = true;
      this.notificationService.danger('Nom d\'utilisateur obligatoire');
      return;
    } else if (this.Cpswd == '') {
      this.isLoading = false;
      this.errors = true;
      this.notificationService.danger('Veuillez confirmer votre mot de passe');
      return;
    }
    if (this.Cpswd == this.credentials.pswd) {
      this.authService.signUp(this.credentials.email, this.credentials.pswd, this.credentials.username, this.credentials.type)
        .subscribe((res: any) => {
          if (res.validation_errors) {
            this.errors = true;
            this.clearFormPasswords();
            if (res.validation_errors.email[0] == "The email must be a valid email address.") {
              this.isLoading = false;
              this.notificationService.danger("Veuillez entrer une adresse mail valide");
            } else if (res.validation_errors.password[0] == "The password must be at least 6 characters.") {
              this.isLoading = false;
              this.notificationService.danger("Votre mot de passe doit avoir au moins 6 caractères");
            } else if (res.validation_errors.email[0] == "The email must not be greater than 191 characters.") {
              this.isLoading = false;
              this.notificationService.danger("Votre adresse mail ne doit pas avoir plus de 191 caractères");
            }
          } else {
            this.isLoading = false;
            // Navigate to home page
            this.notificationService.success(res.message);
            this.router.navigate(['/login']);
          }
        }, (err: any) => {
          // This error can be internal or invalid credentials
          this.isLoading = false;
          this.errors = true;
          this.clearFormPasswords();
          this.notificationService.danger(err.message);
        });
    } else {
      this.isLoading = false;
      this.errors = true;
      this.clearFormPasswords();
      this.notificationService.danger("Les deux mots de passe doivent être identiques");
    }
  }

  private clearFormPasswords() {
    this.Cpswd = '';
    this.credentials.pswd = '';
  }

  /**
   * Getter for the form controls
   */
  get controls() {
    return this.form.controls;
  }

}
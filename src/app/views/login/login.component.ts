import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EmailResetPasswordModalComponent } from '../../additionals-components/email-reset-password-modal/email-reset-password-modal.component';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  // Variables
  @ViewChildren('input') input;
  public form: FormGroup;
  public isLoading: boolean = false;
  public errors: boolean = false;
  public credentials = {
    email: '',
    pswd: ''
  };

  constructor(
    fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    public modalService: BsModalService
  ) {
    this.form = fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }

  ngAfterViewInit(): void {
      this.input.first.nativeElement.focus();
  }

  ngOnInit(): void { }

  /**
   * Login the user based on the form values
   */
  login(): void {
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
    }
    this.authService.login(this.credentials.email, this.credentials.pswd)
      .subscribe((res: any) => {
        if (res.validation_errors || res.status == 401) {
          this.isLoading = false;
          this.errors = true;
          this.notificationService.danger(res.message);
        } else {
          // Store the access token in the localstorage
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('user_id', res.id);
          localStorage.setItem('user_type', res.type);
          console.log('result => ', res);
          console.log(localStorage.getItem('access_token'));
          this.isLoading = false;
          // Navigate to home page
          this.notificationService.success(res.message);
          this.router.navigate(['/dashboard']);
        }
      }, (err: any) => {
        // This error can be internal or invalid credentials
        this.isLoading = false;
        this.errors = true;
        this.notificationService.danger(err.message);
      });
  }


  public sendEmailResetPassord(): void {
    const bsModalRef: BsModalRef = this.modalService.show(EmailResetPasswordModalComponent, { class: 'modal-primary modal-md' });
    bsModalRef.onHidden.subscribe(() => {
      const sendSuccesfully = bsModalRef.content.isSuccess;
      const isError = bsModalRef.content.isError;
      if(sendSuccesfully) {
        this.notificationService.success('Le mail de réinitialisation de votre mot de passe a été envoyé avec succès à l\'addresse email que vous avez saisit.');
      }
      if(isError) {
        this.notificationService.danger('Echec de l\'envoi du mail, une erreur inconnue s\'est produite, veuillez saisir une adresse email valide ou vérifer votre connexion à internet');
      }
    })
  }

  /**
   * Getter for the form controls
   */
  get controls() {
    return this.form.controls;
  }

}

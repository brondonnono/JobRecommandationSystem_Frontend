import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { NotificationService } from '../../../../services/notification.service';
import { DateParserService } from '../../../../services/date-parser.service';

@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.component.html',
  styleUrls: ['./offre-detail.component.scss']
})
export class OffreDetailComponent implements OnInit {

  public currentOffer: any = null;
  public id: number = null;
  msg = '';
  public isLoading = false;
  public isSending = false;
  public isError = false;
  public isDeleting = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private notificationService: NotificationService,
    private dateParser: DateParserService
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.initData();
  }

  async initData() {
    this.isLoading = true;
    this.isSending = false;
    this.isError = false;
    await this.dataService.getOffreById(this.id).subscribe((res: any) => {
      this.isLoading = false;
      if (res.message) {
        this.notificationService.info(res.message);
      } else {
        this.currentOffer = res;
        this.currentOffer.dateExpiration = this.dateParser.convertToLocalFr(this.currentOffer.dateExpiration);
      }
    }, (err: any) => {
      this.isLoading = false;
      this.isError = true;
      this.notificationService.danger("Une erreur inattendue est survenue, verifiez votre connexion à internet; si cela persiste contactez l\'administrateur");
      this.router.navigateByUrl('/employe/offers');
    });
  }

  public sendCandidature() {
    this.isDeleting = false;
    this.isSending = true;
    this.isLoading = true;
    const id = parseInt(localStorage.getItem('employe_id'));
    this.dataService.createCandidate(id, this.id).subscribe((res: any) => {
      this.isSending = false;
      this.isLoading = false;
      if (res.message) {
        this.isError = true;
            this.notificationService.danger('Echec de l\'envoi de votre candidature, une erreur inconnue s\'est produite, vérifer votre connexion à internet et rééssayez');
      } else {
        this.isError = false;
        this.notificationService.success('Vote candidature a été envoyée');
      }
    }, (error) => {
      this.isSending = false;
      this.isLoading = false;
      this.isError = true;
      this.notificationService.danger('Echec de l\'envoi de votre candidature, une erreur inconnue s\'est produite, vérifer votre connexion à internet et rééssayez');
    });
    this.goto();
  }

  public goto() {
    this.router.navigateByUrl('/employe/offers');
  }

  public reject() {
    this.isDeleting = true;
    this.isSending = false;
    this.isLoading = true;
    const id = parseInt(localStorage.getItem('employe_id'));
    this.dataService.createOfferRejected(id, this.id).subscribe((res: any) => {
      this.isDeleting = false;
      this.isLoading = false;
      if (res.message) {
        this.isError = true;
            this.notificationService.danger('Echec du rejetée de l\'offre, une erreur inconnue s\'est produite, vérifer votre connexion à internet et rééssayez');
      } else {
        this.isError = false;
        this.notificationService.success('Offre rejetée');
      }
    }, (error) => {
      this.isDeleting = false;
      this.isLoading = false;
      this.isError = true;
      this.notificationService.danger('Echec du rejetée de l\'offre, une erreur inconnue s\'est produite, vérifer votre connexion à internet et rééssayez');
    });
    this.goto();
  }

  // public getExp(offer) {
  //   let tab = this.offer.experience.split('%');
  //   if (tab.length == 1) {
  //     this.res.value = tab;
  //     this.res.type = 'single';
  //   } else {
  //     for (let i = 0; i < tab.length; i++) {
  //       const item = tab[i];
  //       if (item == "-") {
  //         tab.splice(i, 1);
  //       }
  //     }
  //     this.res.value = tab;
  //     this.res.type = 'interval';
  //   }
  //   return this.res;
  // }
}

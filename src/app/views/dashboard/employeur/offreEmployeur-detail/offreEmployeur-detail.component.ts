import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { NotificationService } from '../../../../services/notification.service';
import { DateParserService } from '../../../../services/date-parser.service';

@Component({
  selector: 'app-offreEmployeur-detail',
  templateUrl: './offreEmployeur-detail.component.html',
  styleUrls: ['./offreEmployeur-detail.component.scss']
})
export class OffreEmployeurDetailComponent implements OnInit {

  public currentOffer: any = null;
  public id: number = null;
  public candidates = [];
  public offerCompetences = [];
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
    this.getCandidatesForOffer();
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
      this.router.navigateByUrl('/employeur/listeOffres');
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

  async getCandidatesForOffer() {
    await this.dataService.getRecommandedProfils(this.id).subscribe((res: any) => {
      if (res.message) {
        this.isLoading = false;
        this.notificationService.info(res.message);
      } else {
        this.isLoading = false;
        console.log('res =>', res);
        this.offerCompetences = res.offer_competences;

        // define type

        let typeTop: any;
        let typeOther: any;
        if (res.Size > 1) {
          typeTop = 'array';
        } else if (res.Size == 1) {
          typeTop = 'object';
        } else {
          typeTop = null;
        }
        if (res.Taille > 1) {
          typeOther = 'array';
        } else if (res.Taille == 1) {
          typeOther = 'object';
        } else {
          typeOther = null;
        }

        // check all types

        if (typeTop != null) {
          if (typeOther != null) {
            this.candidates = this.joinCandidatesTable(res.UsersTop, typeTop, res.OtherUsers, typeOther);
          } else {
            this.candidates = this.joinCandidatesTable(res.UsersTop, typeTop);
          }
        } else {
          if (typeOther != null) {
            this.candidates = this.joinCandidatesTable(res.OtherUsers, typeOther);
          } else {
            this.candidates = [];
          }
        }
        console.log(this.candidates);
      }
    }, (err: any) => {
      this.isLoading = false;
      this.isError = true;
      if (err.status == 404) {

      } else {
        this.notificationService.danger("Impossible de joindre le serveur, verifiez votre connexion à internet; si cela persiste contactez l\'administrateur");
      }
    });
  }

  public joinCandidatesTable(first?, typeFirst?, second?, typeSecond?) {
    if (first) {
      if (typeFirst == 'object') {
        first = Object.entries(first)[0][1];
        this.candidates.push(first);
      } else {
        first.forEach(item => {
          this.candidates.push(item);
        });
      }
    }
    if (second) {
      if (typeSecond == 'object') {
        second = Object.entries(second)[0][1];
        this.candidates.push(second);
      } else {
        second.forEach(item => {
          this.candidates.push(item);
        });
      }
    }
    return this.candidates;
  }

  public setStyle(rate: number) {
    let percent = this.getPercentage(rate);
    return 'width:' + percent + '%';
  }

  public getPercentage(rate: number) {
    return ((rate / this.offerCompetences.length) * 100).toString().split('.')[0];
  }

  public getProgressBarClass(rate: number) {
    const percent = parseInt(this.getPercentage(rate));
    console.log(percent);
    if (percent > 50) {
      return 'progress-bar bg-success';
    } else if (percent == 50) {
      return 'progress-bar bg-warning';
    } else {
      return 'progress-bar bg-danger';
    }
  }
}

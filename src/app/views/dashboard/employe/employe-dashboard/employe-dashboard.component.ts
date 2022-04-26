import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { NotificationService } from '../../../../services/notification.service';
@Component({
  selector: 'app-employe-dashboard',
  templateUrl: './employe-dashboard.component.html',
  styleUrls: ['./employe-dashboard.component.scss']
})
export class EmployeDashboardComponent implements OnInit {

  public offers = [];
  public top_offers = [];
  public bottom_offers = [];
  public isError1: boolean = false;
  public isError2: boolean = false;
  public id: number = 0;
  public isLoading: boolean = true;
  public isError: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  async ngOnInit(): Promise<void> {
    this.id = this.getEmployeByUserId();
    if (this.id != 0) {
      if(this.top_offers.length == 0 || this.bottom_offers.length == 0){
        await this.getRecommandedOffers();
      }
    }
  }

  private getEmployeByUserId(): number {
    this.isLoading = true;
    let result = 0;
    this.dataService.getEmployerByUserId(parseInt(localStorage.getItem('user_id'))).subscribe((res: any) => {
      if (res.message) {
        this.isLoading = false;
        this.notificationService.danger(res.message);
      } else {
        localStorage.setItem('employe_id', res.id);
        result = res.id;
        return result;
      }
    }, (err: any) => {
      this.isLoading = false;
      this.isError = true;
      if (err.status == "500" || err.status == 500) {
        this.notificationService.danger('Une erreur inconnue s\'est produite, contactez l\'administrateur et fournissez lui se code d\'erreur: 500');
      }
      this.notificationService.danger("Impossible de joindre le serveur, verifiez votre connexion à internet; si cela persiste contactez l\'administrateur");
    });
    if (result == 0) {
      result = parseInt(localStorage.getItem('employe_id'));
    }
    return result;
  }

  private getRecommandedOffers() {
    this.isLoading = true;
    this.dataService.getRecommandedOffres(this.id).subscribe((res: any) => {
      this.isLoading = false;
      if (res.message) {
        this.notificationService.info(res.message);
      } else {
        console.log('result => ', res);
        this.getOffersDetails(res);
      }
    }, (err: any) => {
      this.isLoading = false;
      this.isError = true;
      if (err.status == "500" || err.status == 500) {
        this.notificationService.danger('Une erreur inconnue s\'est produite, contactez l\'administrateur et fournissez lui se code d\'erreur: 500');
      }
      this.notificationService.danger("Impossible de joindre le serveur, verifiez votre connexion à internet; si cela persiste contactez l\'administrateur");
    });
  }

  private async getOffersDetails(recommandation) {
    if (recommandation.Size != 0) {
      let tab: any[] = Object.entries(recommandation.Offres);
      for await (const offer of tab) {
        const id: number = offer[1].offre_id;
        await this.dataService.getOffreById(id).subscribe((res: any) => {
          if (res.message) {
            this.isLoading = false;
            this.isError1 = true;
            this.notificationService.info(res.message);
          } else {
            this.top_offers.push(res);
            if (this.top_offers.length == 0) {
              this.isError1 = true;
            }
            this.isError = false;
            this.isError1 = false;
          }
        }, (err: any) => {
          this.isLoading = false;
          this.isError1 = true;
          this.notificationService.danger(err.message);
        });
      }
    } else {
      this.isError1 = true;
    }
    if (recommandation.Taille != 0) {
      let tab: any[] = Object.entries(recommandation.AutresOffres);
      for await (const offer of tab) {
        const id: number = offer[1].offre_id;
        await this.dataService.getOffreById(id).subscribe((res: any) => {
          if (res.message) {
            this.isError2 = true;
            this.isLoading = false;
            this.notificationService.info(res.message);
          } else {
            this.bottom_offers.push(res);
            if (this.bottom_offers.length == 0) {
              this.isError2 = true;
            }
            this.isError = false;
            this.isError2 = false;
          }
        }, (err: any) => {
          this.isLoading = false;
          this.isError2 = true;
          this.notificationService.danger(err.message);
        });
      }
    } else {
      this.isError2 = true;
    }
  }

  public seeMore(id: number) {
    this.router.navigateByUrl('/employe/detail/' + id);
  }

}

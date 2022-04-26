import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-employeur-dashboard',
  templateUrl: './employeur-dashboard.component.html',
  styleUrls: ['./employeur-dashboard.component.scss']
})
export class EmployeurDashboardComponent implements OnInit {

  public profils = [];
  public top_profils = [];
  public bottom_profils = [];

  public mesOffres = [];
  public profilOccurenceForOffer = {
    top_occ: [],
    bottom_occ: []
  };
  public top_offers = [];
  public bottom_offers = [];

  public id: number = 0;
  public isLoading: boolean = false;
  public errors: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.id = this.getEmployeurByUserId();
    if (this.id != 0) {
      this.mesOffres = this.getEmployeurOffres();
      this.getRecommandedProfils();
    }
  }

  private getEmployeurByUserId(): number {
    this.isLoading = true;
    let result = 0;
    this.dataService.getEmployeurByUserId(parseInt(localStorage.getItem('user_id'))).subscribe((res: any) => {
      if (res.message) {
        this.isLoading = false;
        this.notificationService.danger(res.message);
      } else {
        localStorage.setItem('employeur_id', res.id);
        result = res.id;
        return result;
      }
    }, (err: any) => {
      this.isLoading = false;
      this.errors = true;
      if (err.status == "500" || err.status == 500) {
        this.notificationService.danger("Impossible de joindre le serveur, verifiez votre connexion à internet");
      }
      
    });
    if (result == 0) {
      result = parseInt(localStorage.getItem('employeur_id'));
    }
    return result;
  }

  public getEmployeurOffres(): any {
    // 
    this.dataService.getOffresByEmployeurId(this.id).subscribe((res: any) => {
      if (res.message) {
        this.isLoading = false;
        this.notificationService.info(res.message);
      } else {
        this.mesOffres = res;
        this.getRecommandedProfils();
      }
    }, (err: any) => {
      this.isLoading = false;
      this.errors = true;
      if (err.status == "500" || err.status == 500) {
        this.notificationService.danger("Impossible de joindre le serveur, verifiez votre connexion à internet");
      }
    });
    this.mesOffres = [];
    return this.mesOffres;
  }

  private getRecommandedProfils() {
    for (let i = 0; i < this.mesOffres.length; i++) {
      const id = this.mesOffres[i].id;
      this.dataService.getRecommandedProfils(id).subscribe((res: any) => {
        if (res.message) {
          this.isLoading = false;
          this.notificationService.info(res.message);
        } else {
          this.profils = res;
          this.assignProfils(this.profils);
        }
      }, (err: any) => {
        this.isLoading = false;
        this.errors = true;
        if (err.status == "500") {
          this.notificationService.danger("Impossible de joindre le serveur, verifiez votre connexion à internet");
        }
      });
    }
  }

  private assignProfils(profilsRecommanded) {
    if (profilsRecommanded.Size != 0) {
      const id = profilsRecommanded.offer_id;
      this.mesOffres.forEach(offre => {
        if (offre.id == id) {
          this.top_offers.push(offre);
          this.profilOccurenceForOffer.top_occ.push({
            id: id,
            nb: profilsRecommanded.Size as number
          });
        }
      });
    }
    if (profilsRecommanded.Taille != 0) {
      const id = profilsRecommanded.offer_id as number;
      this.mesOffres.forEach(offre => {
        if (offre.id == id) {
          this.bottom_offers.push(offre);
          this.profilOccurenceForOffer.bottom_occ.push({
            id: id,
            nb: profilsRecommanded.Taille as number
          });
        }
      });
    }
    this.isLoading = false;
  }

  public getOccurenceForOffer(id, position) {
    if (position == 'top') {
      let occurence: number;
      this.profilOccurenceForOffer.top_occ.forEach(occ => {
        if (occ.id == id) {
          occurence = occ;
        }
      });
      return occurence;
    } else {
      let occurence: any;
      this.profilOccurenceForOffer.bottom_occ.forEach(occ => {
        if (occ.id == id) {
          occurence = occ;
        }
      });
      return occurence;
    }
  }

  public seeMore(id: number) {
    this.router.navigateByUrl('/employeur/myOfferDetails/' + id);
  }

}

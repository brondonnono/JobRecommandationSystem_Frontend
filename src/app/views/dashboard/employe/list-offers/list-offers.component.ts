import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss']
})
export class ListOffersComponent implements OnInit {

  public tableData = [];

  public isLoading: boolean = true;
  public isError: boolean = false;
  public isSuccess: boolean = false;

// pagination elements

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: 'Précédent',
      nextLabel: 'Suivant',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `Vous êtes sur la page`
  };
  config = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.tableData.length
  };

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  pageChanged(event){
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.getOffersList();
    this.config.totalItems = this.tableData.length;
  }

  public getOffersList() {
    this.dataService.getOffres()
      .subscribe((res: any) => {
        this.isLoading = false;
        if (res.message) {
          this.isError = true;
        } else {
          this.isSuccess = true;
          this.tableData = this.filterOffers(res);
          this.config.totalItems = this.tableData.length;
        }
      }, (error: any) => {
        this.isError = true;
        this.isLoading = false;
        this.notificationService.danger('Une erreur inattendue est survenue lors de la récupération des données; Vérifiez votre connexion à internet et rééssayez');
      });
  }

  public getEmployeRejectOffers() {
    let rejectedOffers = [];
    this.isLoading = true;
    this.dataService.getOfferRejectedByEmployerID(parseInt(localStorage.getItem('employe_id'))).subscribe((res: any)=> {
      this.isLoading = false;
      if (res.message) {
        this.isError = true;
        console.log('msg => ', res.message);
        return -1;
      } else {
        rejectedOffers = res;
        console.log('rejectedOffers => => ', rejectedOffers);
      }
    });
    return rejectedOffers;
  }

  public filterOffers(offers: any) {
    let rejectedOffers: any = null;
    rejectedOffers = this.getEmployeRejectOffers();
    let result = [];
    while (rejectedOffers.length) {
      console.log(rejectedOffers);
    }
    console.log('employe_id => ', localStorage.getItem('employe_id'), '\n');
    console.log('offers', result);
    return result;
  }

  public seeMore(id: number) {
    this.router.navigateByUrl('/employe/detail/'+id);
  }

  public supprimer(id: number) {
    this.reject(id);
    let pos = this.position(id);
    this.tableData.forEach((item) => {
      if (item.id == id) {
        this.tableData.splice(pos,1);
      }
    })
  }

  public position(id: number): number {
    for (let i = 0; i < this.tableData.length; i++) {
      const item = this.tableData[i];
      if (item.id == id) {
        return i;
      }
    }
  }

  public reject(id: number) {
    this.isLoading = true;
    const employe_id = parseInt(localStorage.getItem('employe_id'));
    this.dataService.createOfferRejected(employe_id, id).subscribe((res: any) => {
      this.isLoading = false;
      if (res.message) {
        this.isError = true;
            this.notificationService.danger('Echec du rejetée de l\'offre, une erreur inconnue s\'est produite, vérifer votre connexion à internet et rééssayez');
      } else {
        this.isError = false;
        this.notificationService.success('Offre rejetée');
      }
    }, (error) => {
      this.isLoading = false;
      this.isError = true;
      this.notificationService.danger('Echec du rejetée de l\'offre, une erreur inconnue s\'est produite, vérifer votre connexion à internet et rééssayez');
    });
  }
}

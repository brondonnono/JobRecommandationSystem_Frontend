import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { DateParserService } from '../../../../services/date-parser.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-display-offres',
  templateUrl: './display-offres.component.html',
  styleUrls: ['./display-offres.component.scss']
})
export class DisplayOffresComponent implements OnInit {

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
    private dateParser: DateParserService,
    private router: Router
  ) { }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.getOffersList();
    this.config.totalItems = this.tableData.length;
  }

  public getOffersList() {
    const employeur_id = parseInt(localStorage.getItem('employeur_id'));
    this.dataService.getOffresByEmployeurId(employeur_id)
      .subscribe((res: any) => {
        this.isLoading = false;
        if (res.message) {
          this.isError = true;
        } else {
          this.isSuccess = true;
          res.forEach(item => {
            item.dateExpiration = this.dateParser.convertToLocalFr(item.dateExpiration);
            this.tableData.push(item);
          })
          this.config.totalItems = this.tableData.length;
        }
      }, (error: any) => {
        this.isError = true;
        this.isLoading = false;
        if (error.status == 404) {
        } else {
          this.notificationService.danger('Une erreur inattendue est survenue lors de la récupération des données; Vérifiez votre connexion à internet et rééssayez');
        }
      });
  }

  public supprimer(id: number) {
    this.remove(id);
    let pos = this.position(id);
    this.tableData.forEach((item) => {
      if (item.id == id) {
        this.tableData.splice(pos, 1);
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

  public remove(id: number) {
    this.isLoading = true;
    this.dataService.deleteOffre(id).subscribe((res: any) => {
      this.isLoading = false;
      this.isError = false;
      this.notificationService.success('Offre supprimée');
    }, (error) => {
      this.isLoading = false;
      this.isError = true;
      if (error.status == 404) {
        this.isError = true;
      } else {
        this.notificationService.danger('Echec de la suppression de l\'offre, une erreur inconnue s\'est produite, vérifer votre connexion à internet et rééssayez');
      }
    });
  }

  public seeMore(id: number) {
    this.router.navigateByUrl('/employeur/myOfferDetails/' + id);
  }

  public edit(id: number): void {
    this.router.navigateByUrl('/employeur/editOffer/' + id);
  }
}

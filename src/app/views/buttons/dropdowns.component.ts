import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  templateUrl: 'dropdowns.component.html',
  styleUrls: ['dropdowns.component.scss']
})
export class DropdownsComponent implements OnInit {

  @ViewChild('table', { static: true }) table: HTMLTableElement;
 
  public offer = {
    posteVise: 'SALES SUPERVISOR',
    ville: 'Yaoundé',
    description: 'descripiton de l\'offre',
    libelle: 'Recherche d\'un SALES SUPERVISOR',
    metier: 'Commercial, vente',
    secteur_activite: 'Agroalimentaire, industrie, production, fabrication, autres',
    type_contrat: 'CDI',
    formations: 'Bac+3',
    langues: [
      {
        libelle: 'Anglais',
        niveau: 'Bon niveau'
      },
      {
        libelle: 'Français',
        niveau: 'Bon niveau'
      }
    ],
    missions: [
      'Participer à la réalisation des objectifs du département commercial',
      'Participer à la mise en place de la politique commerciale et des déclinaisons stratégiques qui l’accompagne',
      'Apporter un soutien au Directeur Commercial dans la mise en place de l’orientation stratégique globale.',
      'Manager et accompagner la Force de vente',
      'Concevoir et produire les offres commerciales'
    ],
    profil_recherche: [
      'Justifier d’une bonne expérience dans le domaine des vins et spiritueux, de la vente, la planification, la stratégie, le Management.'
    ],
    date_line: new Date('10/06/2022'),
    competencesRequises: [
      {
        id: 1,
        libelle: 'Angular'
      },
      {
        id: 2,
        libelle: 'ReactJS'
      },
      {
        id: 3,
        libelle: 'VueJS'
      },
      {
        id: 4,
        libelle: 'WordPress'
      },
      {
        id: 5,
        libelle: 'Joomla'
      },
      {
        id: 6,
        libelle: 'Drupal'
      }
    ],
    nbrePoste: 1,
    experience: '5%-%10'
  };

  public tableData = [];

  public data = [
    {
      id: 1,
      username: 'Yiorgos Avraamu',
      macthRate: 5,
      stat: {}
    },
    {
      id: 2,
      username: 'Avram Tarasios',
      macthRate: 5,
      stat: {}
    },
    {
      id: 3,
      username: 'Quintin Ed',
      macthRate: 5,
      stat: {}
    },
    {
      id: 4,
      username: 'Enéas Kwadwo',
      macthRate: 4,
      stat: {}
    },
    {
      id: 5,
      username: 'Agapetus Tadeáš',
      macthRate: 3,
      stat: {}
    },
    {
      id: 6,
      username: 'Friderik Dávid',
      macthRate: 3,
      stat: {}
    }
  ];

  public res = {
    type: 'single',
    value: []
  };

  public getExp() {
    let tab = this.offer.experience.split('%');
    if (tab.length == 1) {
      this.res.value = tab;
      this.res.type = 'single';
      console.log('single');
    } else {
      for (let i = 0; i < tab.length; i++) {
        const item = tab[i];
        if (item == "-") {
          tab.splice(i, 1);
        }
      }
      this.res.value = tab;
      this.res.type = 'interval';
    }
    return this.res;
  }

  public getUserCompetenceRate(offerCompetences, userId: number) {
    let userMatchRate = this.data[userId-1].macthRate;
    console.log('rate: ', (userMatchRate / offerCompetences.length) * 100);
    return (userMatchRate / offerCompetences.length) * 100;
  }

  public getStatData(offerCompetences, userId: number) {
    return {
      rate: this.getUserCompetenceRate(offerCompetences, userId).toString().split('.')[0],
      minus: offerCompetences.length - this.data[userId-1].macthRate,
      style: 'width: '+this.getUserCompetenceRate(offerCompetences, userId).toString().split('.')[0]+'%'
    };
  }

  public consulterProfil(id: number) {
    console.log('consulter => ', id);
  }

  public supprimerCandidature(id: number) {
    this.table.deleteRow(id);
    console.log('supprimer => ', id);
  }

  public validerCandidature(id: number) {
    console.log('valider => ', id);
  }

  ngOnInit() {
    this.getExp();
    this.getTableData();
  }

  public getTableData() {
    this.data.forEach(item => {
      // item.stat = this.getStatData(this.offer.competencesRequises, item.id);
      this.tableData.push(item);
    });
    console.log(this.tableData);
    return this.tableData;
  }

  public actualize() {
    this.getTableData();
  }

  public tableActions() {
  }

}

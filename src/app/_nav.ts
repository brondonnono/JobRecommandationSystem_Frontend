import { INavData } from '@coreui/angular';

export const employeNavItems: INavData[] = [
  {
    name: 'Tableau de bord',
    url: '/dashboard',
    icon: 'icon-chart'
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Compte'
  },
  {
    name: 'Mon Profil',
    url: '/employe/profil',
    icon: 'icon-user'
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Offres'
  },
  {
    name: 'Les offres',
    url: '/employe',
    icon: 'icon-briefcase',
    children: [
      {
        name: 'Toutes les offres',
        url: '/employe/offers',
        icon: 'icon-list'
      }
    ]
  }
];
export const employeurNavItems: INavData[] = [
  {
    name: 'Tableau de bord',
    url: '/dashboard',
    icon: 'icon-chart'
  },
  {
    title: true,
    name: 'Compte'
  },
  {
    name: 'Mon Profil',
    url: '/employeur/profil',
    icon: 'icon-user'
  },
  {
    title: true,
    name: 'Offres'
  },
  {
    name: 'Gérer les offres',
    url: '/employeur',
    icon: 'icon-briefcase',
    children: [
      {
        name: 'Créer une offre',
        url: '/employeur/createOffre',
        icon: 'icon-plus'
      },
      {
        name: 'Liste des offres',
        url: '/employeur/listeOffres',
        icon: 'icon-list'
      }
    ]
  },
  {
    title: true,
    name: 'Historiques',
  },
  {
    name: 'Historique',
    url: '/charts',
    icon: 'icon-book-open'
  }
];

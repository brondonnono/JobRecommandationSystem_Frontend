import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }


  // Employe methods

  public getEmployes() {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getEmployers', options);
  }

  public getEmployerById(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getEmployerByID/'+id, options);
  }

  public getEmployerByUserId(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getEmployerByUserId/'+id, options);
  }

  public createEmploye(user_id: number, nom: string, sexe: string, formations: string, competences: string, villeResidence: string, DateNais?: Date, cv?: string) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.apiUrl + '/createEmployer', {
      user_id: user_id,
      nom: nom,
      sexe: sexe,
      DateNais: DateNais,
      formations: formations,
      competences: competences,
      villeResidence: villeResidence,
      cv: cv
    }, options);
  }

  public updateEmploye(id:number, user_id: number, nom: string, sexe: string, formations: string, competences: string, villeResidence: string, DateNais?: Date, cv?: string) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(environment.apiUrl + '/updateEmployer/'+ id, {
      user_id: user_id,
      nom: nom,
      sexe: sexe,
      DateNais: DateNais,
      formations: formations,
      competences: competences,
      villeResidence: villeResidence,
      cv: cv
    }, options);
  }

  public deleteEmployer(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(environment.apiUrl + '/deleteEmployer/'+id, options);
  }


  // Candidate methods

  public getCandidates() {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getCandidates', options);
  }

  public createCandidate(employe_id: number, offre_id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.apiUrl + '/createCandidate', {
      employe_id: employe_id,
      offre_id: offre_id
    }, options);
  }

  public getCandidateByID(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getCandidateByID/'+id, options);
  }

  public getCandidateByOffreID(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getCandidateByOffreID/'+id, options);
  }

  public deleteCandidate(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(environment.apiUrl + '/deleteCandidate/'+id, options);
  }


  //Offre methods

  public getRecommandedOffres(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getRecommandedOffres/'+id, options);
  }

  public createOffre(employeur_id: number, description: string, competencesRequises: string, typeOffre: string, dateExpiration: Date, libelle: string, posteVise: string) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.apiUrl + '/createOffre', {
      employeur_id: employeur_id,
      description: description,
      competencesRequises: competencesRequises,
      typeOffre: typeOffre,
      dateExpiration: dateExpiration,
      libelle: libelle,
      posteVise: posteVise

    }, options);
  }

  public updateOffre(id:number, employeur_id: number, libelle: string, desciption: string, dateExpiration: string, posteVise: string, competencesRequises: string, typeOffre: string) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.apiUrl + '/updateOffre/'+ id, {
      employeur_id: employeur_id,
      libelle: libelle,
      desciption: desciption,
      dateExpiration: dateExpiration,
      posteVise: posteVise,
      competencesRequises: competencesRequises,
      typeOffre: typeOffre
    }, options);
  }

  public uploadFile(file: any, userId: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.apiUrl + '/uploadImg/', {
      img: file,
      user_id: userId
    }, options);
  }

  // public updateOffre(id:number, employeur_id: number, description: string, competencesRequises: string, typeOffre: string, dateExpiration: Date, libelle: string, posteVise: string) {
  //   const options = {
  //     headers: new HttpHeaders({
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.put(environment.apiUrl + '/updateOffre/'+ id, {
  //     employeur_id: employeur_id,
  //     description: description,
  //     competencesRequises: competencesRequises,
  //     typeOffre: typeOffre,
  //     dateExpiration: dateExpiration,
  //     libelle: libelle,
  //     posteVise: posteVise

  //   }, options);
  // }

  public getOffres() {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getOffres', options);
  }

  public getOffreById(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getOffre/'+id, options);
  }

  public deleteOffre(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(environment.apiUrl + '/deleteOffre/'+id, options);
  }

  public getOffresByEmployeurId(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getOffresByEmployeurId/'+id, options);
  }


  //Employeur methods

  public getEmployeurs() {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getEmployeurs', options);
  }

  public getEmployeurById(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getEmployeurByID/'+id, options);
  }

  public createEmployeur(user_id: number, nom: string, desciption: string, Secteur_activité: string, ville: string) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.apiUrl + '/createEmployeur', {
      user_id: user_id,
      nom: nom,
      desciption: desciption,
      Secteur_activité: Secteur_activité,
      ville: ville
    }, options);
  }

  public updateEmployeur(id:number, user_id: number, nom: string, desciption: string, Secteur_activité: string, ville: string) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(environment.apiUrl + '/updateEmployeur/'+ id, {
      user_id: user_id,
      nom: nom,
      desciption: desciption,
      Secteur_activité: Secteur_activité,
      ville: ville
    }, options);
  }

  public deleteEmployeur(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(environment.apiUrl + '/deleteEmployeur/'+id, options);
  }

  public getEmployeurByUserId(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getEmployeurByUserId/'+id, options);
  }

  public getRecommandedProfils(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getRecommandedProfilsForOffer/'+id, options);
  }


  //offerRejected methods

  public getOffersRejected() {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getOffersRejected', options);
  }

  public createOfferRejected(employe_id: number, offre_id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.apiUrl + '/createOfferRejected', {
      employe_id: employe_id,
      offre_id: offre_id
    }, options);
  }

  public getOfferRejectedByID(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getOfferRejectedByID/'+id, options);
  }

  public getOfferRejectedByEmployerID(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.apiUrl + '/getOfferRejectedByEmployerID/'+id, options);
  }

  public deleteOfferRejected(id: number) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(environment.apiUrl + '/deleteOfferRejected/'+id, options);
  }
}

import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateParserService {
  constructor() {}

  parseToLocalFr(date: Date): string {
    const options: any = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  }

  convertToLocalFr(date: string): string {
    const options: any = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
  }

  public getFormattedDate(dateString: string): string {
    const newDate = new Date(dateString);
    return new DatePipe('en-US').transform(dateString, 'dd/MM/yyyy');
  }

  public formDateFormatter(date : string) : string{
    var dataSplit = date.split('/');
    var dateConverted;

    if (dataSplit[2].split(" ").length > 1) {

        var hora = dataSplit[2].split(" ")[1].split(':');
        dataSplit[2] = dataSplit[2].split(" ")[0];
    }
    return new Date(Number.parseInt(dataSplit[2]), Number.parseInt(dataSplit[1])-1, Number.parseInt(dataSplit[0])+1).toISOString().substring(0,10);
  }
}

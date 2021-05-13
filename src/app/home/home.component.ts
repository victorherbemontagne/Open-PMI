import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { data } from 'src/environments/data';

import {HttpClient} from "@angular/common/http";
import { BreakpointObserver} from '@angular/cdk/layout';

// import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

// export interface contactCard {
//   Dpt:string;
//   Dpt num: string;

//   "Adresse":"25 Avenue du 6 Juin",
//   "Ville":"Caen",
//   "Code postal":"14000",
//   "Téléphone PMI":"02 31 57 14 31",
//   "Type de source":"SI",
//   "Source":"https://www.calvados.fr/accueil/annuaire-pratique/carte-des-cpef.html",
//   "Personne contactée (PC)":"NaN",
//   "Courriel PC ":"NaN",
//   "Tel. PC":"NaN",
//   "Personne répondante (PR)":"NaN",
//   "Courriel PR":"NaN",
//   "Tel. PR":"NaN"
// }

export class HomeComponent implements OnInit {

  showForm = false;
  deptNumber = "";
  telNumber = "";
  adress = "";
  emailUser = "";
  nameUser = "";
  queryUser = "";
  queryProposed = false;
  year;
  showMobileNav = false;
  public bMobile = false;

  resultQuery: { Dpt: string; "Dpt num": string; Adresse: string; Ville: string; "Code postal": string; "Téléphone PMI": string; "Type de source": string; Source: string; "Personne contactée (PC)": string; "Courriel PC ": string; "Tel. PC": string; "Personne répondante (PR)": string; "Courriel PR": string; "Tel. PR": string; }[] | undefined;

  // options = ["01 - Ain - Bourg-en-Bresse", "02 - Aisne - Laon", "03 - Allier - Moulins", "04 - Alpes-de-Haute-Provence - Digne", "05 - Hautes-Alpes - Gap", "06 - Alpes Maritimes - Nice", "07 - Ardèche - Privas", "08 - Ardennes - Charleville-Mézières", "09 - Ariège - Foix", "10 - Aube - Troyes", "11 - Aude - Carcassonne", "12 - Aveyron - Rodez", "13 - Bouches-du-Rhône - Marseille", "14 - Calvados - Caen", "15 - Cantal - Aurillac", "16 - Charente - Angoulême", "17 - Charente-Maritime - La Rochelle", "18 - Cher - Bourges", "19 - Corrèze - Tulle", "2A - Corse-du-Sud - Ajaccio", "2B - Haute Corse - Bastia", "21 - Côte-d'Or - Dijon", "22 - Côtes d'Armor - St-Brieuc", "23 - Creuse - Guéret", "24 - Dordogne - Périgueux", "25 - Doubs - Besançon", "26 - Drôme - Valence", "27 - Eure - Evreux", "28 - Eure-et-Loir - Chartres", "29 - Finistère - Quimper", "30 - Gard - Nîmes", "31 - Haute Garonne - Toulouse", "32 - Gers - Auch", "33 - Gironde - Bordeaux", "34 - Hérault - Montpellier", "35 - Ille-et-Vilaine - Rennes", "36 - Indre - Châteauroux", "37 - Indre-et-Loire - Tours", "38 - Isère - Grenoble", "39 - Jura - Lons-le-Saunier", "40 - Landes - Mont-de-Marsan", "41 - Loir-et-Cher - Blois", "42 - Loire - St-Étienne", "43 - Haute Loire - Le Puy", "44 - Loire Atlantique - Nantes", "45 - Loiret - Orléans", "46 - Lot - Cahors", "47 - Lot-et-Garonne - Agen", "48 - Lozère - Mende", "49 - Maine-et-Loire - Angers", "50 - Manche - St-Lô", "51 - Marne - Châlons-sur-Marne", "52 - Haute Marne - Chaumont", "53 - Mayenne - Laval", "54 - Meurthe-et-Moselle - Nancy", "55 - Meuse - Bar-le-Duc", "56 - Morbihan - Vannes", "57 - Moselle - Metz", "58 - Nièvre - Nevers", "59 - Nord - Lille", "60 - Oise - Beauvais", "61 - Orne - Alençon", "62 - Pas-de-Calais - Arras", "63 - Puy-de-Dôme - Clermont-Ferrand", "64 - Pyrénées Atlantiques - Pau", "65 - Hautes Pyrénées - Tarbes", "66 - Pyrénées Orientales - Perpignan", "67 - Bas-Rhin - Strasbourg", "68 - Haut-Rhin - Colmar", "69 - Rhône - Lyon", "70 - Haute Saône - Vesoul", "71 - Saône-et-Loire - Mâcon", "72 - Sarthe - Le Mans", "73 - Savoie - Chambéry", "74 - Haute Savoie - Annecy", "75 - Paris - Paris", "76 - Seine Maritime - Rouen", "77 - Seine-et-Marne - Melun", "78 - Yvelines - Versailles", "79 - Deux-Sèvres - Niort", "80 - Somme - Amiens", "81 - Tarn - Albi", "82 - Tarn-et-Garonne - Montauban", "83 - Var - Toulon", "84 - Vaucluse - Avignon", "85 - Vendée - La Roche-sur-Yon", "86 - Vienne - Poitiers", "87 - Haute Vienne - Limoges", "88 - Vosges - Épinal", "89 - Yonne - Auxerre", "90 - Territoire de Belfort - Belfort", "91 - Essonne - Evry", "92 - Hauts-de-Seine - Nanterre", "93 - Seine-St-Denis - Bobigny", "94 - Val-de-Marne - Créteil", "95 - Val-D\'Oise - Pontoise", "971 - Guadeloupe - Basse-Terre", "972 - Martinique - Fort-de-France", "973 - Guyane - Cayenne", "974 - La-Reunion - Saint-Denis", "976 - Mayotte - Mamoudzou"];
  // filteredOptions!: Observable<string[]>;
  // myControl = new FormControl();

  constructor(public formBuilder: FormBuilder, public httpClient: HttpClient, breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe('(max-width: 991px)').subscribe(result => {
			this.bMobile = result.matches;
		  });

   }
  

  ngOnInit(): void {
    var d = new Date();
    this.year = d.getFullYear();

    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }



  
  submit(){
    if(!(this.emailUser == null || this.emailUser == "")){
      this.sendMessage();
    }
  }

  sendMessage(){
    const route = environment.server_url + '/admin/contact/pmi';
    const formData = new FormData();
    console.log("Paramer to send the email :");
    console.log(this.emailUser);
    console.log(this.nameUser);
    console.log(this.deptNumber);
    console.log(this.telNumber);
    console.log(this.adress);
    
    formData.append('email', this.emailUser)
    formData.append('name', this.nameUser)
    formData.append('deptNumber', this.deptNumber)
    formData.append('telephone', this.telNumber)
    formData.append('adress', this.adress)
    ;
    //const headers = {}
  
    this.httpClient.post(route, formData).toPromise()
      .then((value: any) =>{
        if( value['res'].toString() == 'true' ){
            this.emailUser = "";
            this.deptNumber = "";
            this.telNumber = "";
            this.adress = "";
            this.nameUser = "";
            alert('Merci nous allons étudier votre proposition et revenons vers vous le plus rapidement possible!')
        }
        else{
            alert('Message non envoyé. Veuillez réessayez!')
          }
        })
        .catch(
          (error) =>{
            alert('Erreur de notre côté ... réessayez plus tard s\'il vous plait ')
          }
      );
    };

    searchPMI(){
      console.log("Starting a query to find PMI..");
      console.log("Query ---", this.queryUser);
      const query =  this.queryUser
      const number_dept = 0
      try {
        const number_dept  = Number(query)
      } catch (error) {
        const number_dept = 1
        console.log("Error what have been input is not good");
        
      }
      const elmt = data[1]

      console.log(elmt);
      

      this.queryProposed = true
      this.resultQuery = elmt;
    }

    scroll(el) {
      console.log("scrolling to: " + el);
      document.getElementById(el).scrollIntoView({behavior: 'smooth'});
      this.showMobileNav = false;
    }


}

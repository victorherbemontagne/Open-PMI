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
  displayedQuery = ''; // Used to display the query to the user
  queryProposed = false;
  
  year;
  showMobileNav = false;
  public bMobile = false;

  resultQuery: { Dpt: string; "Dpt num": string; Adresse: string; Ville: string; "Code postal": string; "Téléphone PMI": string; "Type de source": string; Source: string; "Personne contactée (PC)": string; "Courriel PC ": string; "Tel. PC": string; "Personne répondante (PR)": string; "Courriel PR": string; "Tel. PR": string; }[] | undefined;

  number_to_show = 10;
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
      if (this.queryUser.length > 2){
        alert("Vous devez rentrer un numéro de département")
      }
      else{
        this.resultQuery = [];
        this.queryProposed = false;
        const query =  this.queryUser

        const number_dept  = Number(query)
        
        const elmt = data[number_dept]

        this.queryProposed = true
        this.resultQuery = elmt;
        this.displayedQuery = this.queryUser
      }
    }

    scroll(el: string) {
      console.log("scrolling to: " + el);
      var elmt = document.getElementById(el)
      if (elmt){
        elmt.scrollIntoView({behavior: 'smooth'});
      }
      else{
        console.log("elmt in scroll doesn't exists.. passing..");
      }
      this.showMobileNav = false;
    };

    increaseShow(){
      this.number_to_show += 10;
    };

    openMap(contact){
      const adress = contact['Adresse'];
      const postalCode = contact['Code postal']
      const query = encodeURIComponent(adress+","+postalCode)
      const url = "https://www.google.com/maps/search/?api=1&query="+query;
      console.log("Url found -- " + url);
      
      window.open(url, "_blank");
    }


}

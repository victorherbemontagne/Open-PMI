import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { data } from 'src/environments/data';

import {HttpClient} from "@angular/common/http";

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

  resultQuery = [];



  constructor(public formBuilder: FormBuilder, public httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  
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
      const elmt = data[number_dept]

      console.log(elmt);
      

      this.queryProposed = true
      this.resultQuery = elmt;
    }
}

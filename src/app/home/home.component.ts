import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  showForm = false;
  deptNumber = "";
  telNumber = "";
  adress = "";
  emailUser = "";
  nameUser = "";



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
    }
}

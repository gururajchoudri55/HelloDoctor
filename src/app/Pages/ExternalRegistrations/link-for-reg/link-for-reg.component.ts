import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { SharedService } from '../../services/shared.service';
import Labels from '../../Lables/Registrations/regilabels.json';

@Component({
  selector: 'app-link-for-reg',
  templateUrl: './link-for-reg.component.html',
  styleUrls: ['./link-for-reg.component.css']
})
export class LinkForRegComponent implements OnInit {

  constructor(private CommonService: CommonService, private SharedService: SharedService) { }
  public typename: any;
  public address: any;
  public notes: any;
  public email: any;
  public username: any;
  public password: any;
  languageid: any;
  countrymanagerid: any;
  loader: boolean | undefined;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  currentUrl: any;
  labels: any;


  ngOnInit(): void {
    this.address = "https://voiladoc.org/registration/#/Login";
    if (this.languageid == 1) {
      this.notes = "Please Click Above Link And Fill The Details";
    }
    else {
      this.notes = "Veuillez cliquer sur le lien ci-dessus et commencer votre processus d'inscription.";
    }

    this.languageid = sessionStorage.getItem("LanguageID");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.currentUrl = window.location.href;
    this.countrymanagerid = sessionStorage.getItem("Commacountryid");

  }

  public GetTypeName(even: any) {
    this.typename = even.target.value;
  }



  public sendmails() {
    if (this.languageid == 1) {
      var entity = {
        'emailto': this.email,
        'emailsubject': 'Voiladoc Registrations',
        'emailbody': 'Dear ' + this.username + ',' + "<br><br>" + "Thank you for your interest in the Voiladoc. Please click on the link below to begin your registration process. <br><br>" + "Link : " + this.address + "/" + sessionStorage.getItem("countryID") + "<br><br>" + 'Username :' + this.username + "<br>" + 'Password :' + this.password + "<br><br>" + "For your security, don’t share your passwords with Anyone. For any help, please contact your Voiladoc advisor or do reply to this mail. " + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team'
      }
      this.CommonService.sendemailsForLinkRegistrations(entity).subscribe(async data => {

      })
    }
    else {
      var entity = {
        'emailto': this.email,
        'emailsubject': 'Inscriptions Voiladoc',
        'emailbody': 'Chère / Cher  ' + this.username + ',' + "<br><br>" + "Merci de votre interêt pour Voiladoc. Veuillez cliquer sur le lien ci-dessous pour vous connecter à la page d’enregistrement. <br><br>" + "Lien : " + this.address + "/" + sessionStorage.getItem("countryID") + "<br><br>" + 'Nom d’utilisateur : ' + this.username + "<br>" + 'Mot de passe  : ' + this.password + "<br><br>" + "Pour votre sécurité, ne divulguez pas votre mot de passe. Si vous avez besoin d’aide veuillez contacter votre conseiller Voiladoc ou répondre à ce courriel." + "<br><br>" + 'Amicalement,' + "<br>" + 'L’équipe de Voiladoc' + '<br>' + 'www.voiladoc.mg' + '<br>' + 'Support : +261340795048'
      }
      this.CommonService.sendemailsForLinkRegistrations(entity).subscribe(async data => {

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "sendemailsForLinkRegistrations", error);
      })

    }

  }
  public pp: any;

  public Insertdetails() {
    
    if (this.typename == "" || this.typename == undefined) {
    }
    else if (this.password != undefined) {
      var valpassword = this.CommonService.strongpassword(this.password);
      if (valpassword == false) {
        this.pp = 1;
      }

      else {
        
        this.loader = true;
        var entity = {
          'TypeID': this.typename,
          'EmailID': this.email,
          'AddressLink': this.address + "/" + sessionStorage.getItem("countryID"),
          'Notes': this.notes,
          'UserName': this.username,
          'Password': this.password,
          'CountryManagerID': this.countrymanagerid
        }
        this.CommonService.InsertLinkForRegistrations(entity).subscribe(async data => {
          if (data != 0) {

            await this.sendmails();

            this.showPopup = 1;
            this.messageID = 76;
            this.typeofPopUp = 1;

            location.href = "#/Registrations/LinkFordash"

          }
          else {

            this.showPopup = 1;
            this.messageID = 90
            this.typeofPopUp = 2
            this.loader = false;
          }
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "InsertLinkForRegistrations", error);
          this.loader = false;
        })
      }
    }
  }
  valid: boolean | undefined;
  public isValidpassword(password: string): boolean {
    ;
    try {
      let pattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$');
      this.valid = pattern.test(password);
      ;
      return this.valid;
    } catch (TypeError) {
      return false;
    }
  }
}

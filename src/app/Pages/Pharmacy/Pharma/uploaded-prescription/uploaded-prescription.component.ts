import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Prescriptions/prescriptionlabels.json';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/Pages/services/common.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploaded-prescription',
  templateUrl: './uploaded-prescription.component.html',
  styleUrls: ['./uploaded-prescription.component.css'],
})
export class UploadedPrescriptionComponent implements OnInit, OnDestroy {
  @Input() OrdersList: any;
  @Input() typeID: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  details: any;
  pharmacyID: any;
  languageID: any;
  medicineList: any;
  loader: boolean | undefined;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  photosList: any;
  typeOfAttchment: any;
  comments: any;
  amount: any;
  labels: any;
  currentUrl: any;
  pharmacyName: any;
  emailSubject: any;
  cclist: any = [];
  emailattchementurl: any = [];
  bcclist: any = [];
  private url: string = '';
  private host = environment.API_URL;
  phoneno: any;
  msg: any;
  emailid: any;
  photoAmount: any;

  constructor(
    private PharmacyService: PharmacyService,
    private SharedService: SharedService,
    private CommonService: CommonService,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnDestroy(): void {
    this.details = '';
    this.OrdersList = '';
  }

  ngOnInit(): void {
    debugger;
    this.loader = true;
    this.currentUrl = window.location.href;
    this.pharmacyID = sessionStorage.getItem('pharmacyid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.pharmacyName = sessionStorage.getItem('user');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];

    console.log('orders123', this.OrdersList);
    this.details = this.OrdersList;

    if (this.typeID == 7 || this.typeID == 8) {
      this.getPhotos();
    }
  }

  getPhotos(data: any = '') {
    debugger;
    this.details = data || this.OrdersList;
    this.photoAmount = this.details?.photoPrescriptionAmount;
    this.photosList = [];
    this.PharmacyService.GetPharmacyAppointmentPhotos(
      this.details.id
    ).subscribe(
      (data) => {
        this.loader = false;
        this.photosList = data;
        this.typeOfAttchment = data[0].typeID;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetPharmacyAppointmentPhotos',
          error
        );
      }
    );
  }

  openNewwindow(photo: any) {
    location.href = '#/Shared/view/' + btoa(photo);
    window.location.reload();
  }

  files: File[] = [];
  attchmentUrl: any = [];
  folderName: any;

  onSelect(event: any) {
    this.loader = true;
    this.showPopup = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.attchmentUrl.splice(this.files.indexOf(event), 1);
  }

  uploadsAttchments() {
    this.folderName = 'Images/SupportPhoto';
    this.PharmacyService.AllFilesUploads(this.files, this.folderName).subscribe(
      (res) => {
        this.attchmentUrl.push(res);
        this.showPopup = 1;
        this.messageID = 11;
        this.typeofPopUp = 1;
        console.log('supportphoto', this.attchmentUrl);
        this.loader = false;
      }
    );
  }

  public updateamount() {
    debugger;
    this.showLoader.emit();
    (this.phoneno = this.details.mobileNumber),
      (this.emailid = this.details.emailID);
    var entity = {
      ID: this.details.id,
      PhotoPrescriptionAmount: this.amount,
      SubPhotoUrl: this.attchmentUrl[0],
      SubRemarks: this.comments,
    };
    if (this.languageID == 1) {
      this.msg = `${this.pharmacyName} has set you an update on medications and price.Please open the voiladoc app`;
    } else {
      this.msg = `${this.pharmacyName} vous a établi une mise à jour sur les médicaments et leur prix. Veuillez ouvrir l'app Voiladoc`;
    }
    this.PharmacyService.UpdatePatient_TextMedicineDetailsPhotoAmount(
      entity
    ).subscribe(
      (data) => {
        this.close.emit((this.messageID = 34));
        this.sendingSMSPharmacy(this.phoneno, this.msg);
        this.sendEmailPharmacy();
        this.notification();
        //this.router.navigate([`/Pharmacy/Precriptions/`]);

        // this.SharedService.sendPharmacySMS(this.details, 6, 1)
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'UpdatePatient_TextMedicineDetailsPhotoAmount',
          error
        );
      }
    );
  }

  smsMobileNo: any;
  smsDesc: any;
  async sendingSMSPharmacy(phoneno: any, msg: any) {
    debugger;
    // return true;
    this.CommonService.SendTwillioSMS(this.phoneno, this.msg).subscribe(
      async (data) => {
        console.log('Sms success', data);
        return true;
      },
      (error) => {
        console.log('sms failure', error);
      }
    );
  }

  public async sendEmailPharmacy() {
    if ((this, this.languageID == 1)) {
      this.emailSubject = `pharmacy update`;
    } else {
      this.emailSubject = `pharmacy update`;
    }
    var entity = {
      emailto: this.emailid,
      emailsubject: this.emailSubject,
      emailbody: this.msg,
      attachmenturl: this.emailattchementurl,
      cclist: this.cclist,
      bcclist: this.bcclist,
    };
    this.url = this.host + '/Doctor/sendemail';
    this.http.post(this.url, entity).subscribe(
      (data) => {
        console.log('Email Sent');
      },
      (error) => {
        console.log('EMail Error', error);
      }
    );
  }

  patientid: any;
  id: any;
  public async notification() {
    debugger;
    var entity = {
      PatientID: this.patientid,
      Notification: this.emailSubject,
      Description: this.msg,
      NotificationTypeID: 10,
      Date: new Date(),
      LanguageID: this.languageID,
      AppointmentID: this.id,
    };
    this.CommonService.InsertNotifications(entity).subscribe(
      async (data) => {
        console.log('notication', data);
      },
      (error) => {
        console.log('notication respone', error);
      }
    );
  }
}

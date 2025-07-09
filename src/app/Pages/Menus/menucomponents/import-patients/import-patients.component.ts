import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import * as XLSX from 'xlsx';
import Labels from '../../../Lables/Report/reportlabels.json';
import Swal from 'sweetalert2';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';




@Component({
  selector: 'app-import-patients',
  templateUrl: './import-patients.component.html',
  styleUrls: ['./import-patients.component.css']
})
export class ImportPatientsComponent implements OnInit {
  languageid: any;
  loader: boolean | undefined;
  currentUrl: any;
  exceptionList: any;
  p: any;
  search: any;
  count: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  typeid: any;
  labels:any;
  swalmessagenullinsert: any = {
    "1": "No file added",
    "6": "Aucun fichier ajouté"
  };
  swalok: any = {
    "1": "OK",
    "6": "D'accord"
  };
  
  constructor(private MenuService: MenuService, private SharedService: SharedService, private DoctorService :DoctorService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.loader = true;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getexceptions();
    this.GetDoctors();
    this.GetHospitalClinics();
    this.GetClinics()
  }


  dummlist: any;
  dummlist1: any;
  hospitalcliniclist: any;
  hosdd = {}

  public GetHospitalClinics() {
    debugger
    this.MenuService.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {

        this.dummlist = data;
        this.dummlist1 = this.dummlist.filter((x: { hospital_ClinicID: number; }) => x.hospital_ClinicID == 1)
        this.hospitalcliniclist = this.dummlist1.filter((x: { id: number; }) => x.id != 590 && x.id != 614 && x.id != 613 && x.id != 612)

        this.hosdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.labels.search,
        };


      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetHospital_ClinicForAdminByAdmin",error);
      }
    )
  }

  clinidd = {}
  cliiclist: any;

  public GetClinics() {
    this.MenuService.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {

        this.dummlist = data;
        this.dummlist1 = this.dummlist.filter((x: { hospital_ClinicID: number; }) => x.hospital_ClinicID == 2)
        this.cliiclist = this.dummlist1.filter((x: { id: number; }) => x.id != 590 && x.id != 614 && x.id != 613 && x.id != 612)

        this.clinidd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.labels.search,
        };


      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetHospital_ClinicForAdminByAdmin",error);
      }
    )
  }




  doctorlist: any;
  docdd = {};
  public GetDoctors() {

    this.MenuService.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      data => {


        this.doctorlist = data;

        this.docdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'doctorName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.labels.search,
        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDoctorForAdminByLanguageID",error);
      }
    )
  }
  provider: any;

  GetDoctorName(item: any) {
    debugger
    this.provider = item.id
  }
  GetHosptilaname(item2: any) {
    debugger
    this.provider = item2.id
  }
  GetClinic(item2: any) {
    debugger
    this.provider = item2.id
  }



  //To Get Exception List

  public getexceptions() {
    this.MenuService.GetImportPatients_Exceptions().subscribe(
      data => {
        this.loader = false;
        this.exceptionList = data;
        this.count = this.exceptionList.length;
      },
      error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetImportPatients_Exceptions", error);
      }
    );
  }
  //Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }







  file: any;

  contactdata: any=[];
  arrayBuffer: any;
  incomingfile(event: any) {

    this.file = event.target.files[0];
    let a = this.file.name;
    var characters = a.substr(a.length - 5);
    if (characters == ".xlsx") {
      let fileReader = new FileReader();
      fileReader.onload = e => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)

          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });

        var first_sheet_name = workbook.SheetNames[0];

        var worksheet = workbook.Sheets[first_sheet_name];

        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        this.contactdata = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      };
      fileReader.readAsArrayBuffer(this.file);
    } else {
      // Swal.fire("Imported file format not supported.");
    }
  }






  public qwerty: any = [];
  data: any;

  public Upload_file() {
    debugger
    this.loader = true;
    if( this.contactdata.length ==0){
      this.loader = true;
        //this.typeid=''
           Swal.fire({   
        title:this.swalmessagenullinsert[this.languageid],
        confirmButtonText: this.swalok[this.languageid]
      });
      this.loader = false;
    }
    else{
      for (let i = 0; i < this.contactdata?.length; i++) {
      
        // this.contactdata[i]["ProviderName"] = this.provider
        
        var entity = {
          "PatientName": this.contactdata[i].FirstName,
          "LastName": this.contactdata[i].LastName,
          "MobileNumber":this.contactdata[i].MobileNumber,
          "EmailID": this.contactdata[i].EmailID,
          'DoctorID': this.provider,
          'LanguageID': this.languageid,
          'TypeID':this.typeid
  
          // "Address": this.contactdata[i].Addresse,
          // "DateOfBirth": this.contactdata[i].Datedenaissance,
          // "BloodGroup": this.contactdata[i].Groupesanguin,
          // "Gender": this.contactdata[i].Sexe,
          // "Height": this.contactdata[i].Hauteur,
          // "Weight": this.contactdata[i].Poids,
          // "BMI": this.contactdata[i].IMC,
          // "PrimaryCareProvider": this.contactdata[i].Medecintraitant,
          // "MedicalHistory": this.contactdata[i].Antécédentsmédicauxetdechirurgicaux,
          // "SurgeryHistory": this.contactdata[i].Traitementsdelongueduree,
          // "FamilyHistory": this.contactdata[i].Antedentsfamiliaux,
          // "VaccinationStatus": this.contactdata[i].Statutvaccinal,
          // "SpecialDiet": this.contactdata[i].Regimeparticulier,
          // "DoYouDrinkAlchohal": this.contactdata[i].Alcool,
          // "AreYouASmoker": this.contactdata[i].Fumeur,
          // "DoYouExescise": this.contactdata[i].Execicephysique,
          // 'Pinno': 0,
          // 'Medicalinsurance': this.contactdata[i].Nomdelassurance,
          // 'Allergies': this.contactdata[i].Allergies,
          // 'NationalIdentityNo': this.contactdata[i].Numérodecartedidentité,
        }
        
        this.qwerty.push(entity);
      }
      this.MenuService.InsertpatientImportExcel1(this.qwerty).subscribe(data => {
        //this.typeid=''
        this.data = data;
        if (data == "Success") {
  
          this.getexceptions();
  
          this.contactdata = [];
          this.qwerty = [];
          this.loader = false;
          
          this.showPopup = 1;
          this.messageID = 77;
          this.typeofPopUp = 1
  
          // this.contactdata = []
        }
        else{
          this.showPopup = 1;
          this.messageID = 78;
          this.typeofPopUp = 1
          this.loader = false;
          this.contactdata = [];
          this.qwerty = [];
          
        }
  
      },
        error => {
          
          
          this.showPopup = 1;
          this.messageID = 78;
          this.typeofPopUp = 1
         
          this.contactdata = [];
          this.qwerty = [];
  
          
         
          this.SharedService.insertexceptions(this.currentUrl,"InsertpatientImportExcel",error);
        });
    }
    
  
  }
  patientid:any;
  public patientwalletdetails() {
    debugger
      var entity = {
        'PatientID': this.patientid,
        'WalletAmount': 0
      }
      this.DoctorService.InsertPatientWalletDetails(entity).subscribe(data => {
      })
    }

    importpatients(mobileNumber:any,emailID:any){
      Swal.fire({
        title: this.labels.title,
        text: this.labels.text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText
      }).then((result :any) => {
        if (result.isConfirmed) {
          this.DoctorService.DeleteImportPatientsExceptions(mobileNumber,emailID).subscribe(res => {
            let test = res;
            this.ngOnInit();
          })
          this.showPopup = 1;
          this.messageID = 75;
          this.typeofPopUp = 1;
        }
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "DeleteHospital_Clinic", error);
      })
    }


    deleteAllData(){
      debugger
      Swal.fire({
        title: this.labels.title,
        text: this.labels.text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText
      }).then((result :any) => {
        if (result.isConfirmed) {
          this.DoctorService.DeleteAllImportPatientsExceptions().subscribe(res => {
            let test = res;
            this.ngOnInit();
          })
          this.showPopup = 1;
          this.messageID = 75;
          this.typeofPopUp = 1;
        }
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "DeleteHospital_Clinic", error);
      })
    }
  }


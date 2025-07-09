import { Component, Input, OnInit } from '@angular/core';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';

@Component({
  selector: 'app-test-packages',
  templateUrl: './test-packages.component.html',
  styleUrls: ['./test-packages.component.css']
})
export class TestPackagesComponent implements OnInit {

  constructor(private DiagnosticService: DiagnosticService) { }

  @Input() Details:any;

  diagnosticID: any;
  languageID: any;
  testList: any;
  ngOnInit(): void {
    this.diagnosticID = sessionStorage.getItem('diagnosticid');
    this.languageID = sessionStorage.getItem('LanguageID');



  }




}

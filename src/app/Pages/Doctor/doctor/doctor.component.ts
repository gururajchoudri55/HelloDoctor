import { Component, OnInit } from '@angular/core';
import { defineLocale } from "ngx-bootstrap/chronos";
import { nbLocale } from "ngx-bootstrap/locale";
defineLocale("nb", nbLocale);

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
   
  }

}

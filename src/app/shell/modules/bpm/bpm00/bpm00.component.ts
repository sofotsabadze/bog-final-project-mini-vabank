import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ISearchForm } from './search-form';
import { NgForOf } from "@angular/common";
import { Router } from "@angular/router";
import { FirebaseService } from "../../../../firebase-service";

@Component({
  selector: 'app-bpm00',
  templateUrl: './bpm00.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  styleUrls: ['./bpm00.component.css'],
})
export class Bpm00Component implements OnInit {

  searchForm: FormGroup<ISearchForm> = new FormGroup<ISearchForm>({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    clientId: new FormControl(''),
  });

  records: any[] = [];
  displayedRecords: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.searchForm = this.fb.group<ISearchForm>({
      firstname: this.fb.control<string | null>(null),
      lastname: this.fb.control<string | null>(null),
      clientId: this.fb.control<string | null>(null),
    });

    this.firebaseService.fetchClients().then((data) => {
      this.records = data ? Object.values(data) : [];
      this.displayedRecords = [...this.records];
      console.log('Fetched Records:', this.displayedRecords);
    }).catch((error) => {
      console.error('Error fetching clients data:', error);
    });
  }

  onSearch() {
    const formValues = this.searchForm.value;

    this.displayedRecords = this.records.filter((record) => {
      const matchesFirstname = formValues.firstname
          ? record.firstName.toLowerCase().includes(formValues.firstname.toLowerCase())
          : true;
      const matchesLastname = formValues.lastname
          ? record.lastName.toLowerCase().includes(formValues.lastname.toLowerCase())
          : true;
      const matchesClientId = formValues.clientId
          ? record.clientId?.toString().includes(formValues.clientId)
          : true;

      return matchesFirstname && matchesLastname && matchesClientId;
    });

    console.log('Filtered Records:', this.displayedRecords);
  }

  onAddClient() {
    this.router.navigate(['/bpm/bpm01']).then(() =>
        console.log("Navigate to client registration")
    );
  }

  onRowClick(record: any) {
    this.router.navigate(['/krn/krnicp']).then(() => console.log('Navigate to profile'));
  }
}
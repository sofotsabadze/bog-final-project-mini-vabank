import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ISearchForm } from './search-form';
import {NgForOf} from "@angular/common";  // Adjust the path as needed

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

  records = [
    { name: 'Test 1', role: 'Tester', bpmValue: 17 },
    { name: 'Test 2', role: 'Tester', bpmValue: 21 },
    { name: 'Test 3', role: 'Tester', bpmValue: 20 },
    { name: 'Test 4', role: 'Tester', bpmValue: 18 },
    { name: 'Test 5', role: 'Tester', bpmValue: 1 },
  ];

  displayedRecords = [...this.records];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group<ISearchForm>({
      firstname: this.fb.control<string | null>(null),
      lastname: this.fb.control<string | null>(null),
      clientId: this.fb.control<string | null>(null),
    });
  }

  onSearch() {
    const formValues = this.searchForm.value;

    this.displayedRecords = this.records.filter((record) => {
      const matchesFirstname = formValues.firstname
        ? record.name.toLowerCase().includes(formValues.firstname.toLowerCase())
        : true;
      const matchesLastname = formValues.lastname
        ? record.role.toLowerCase().includes(formValues.lastname.toLowerCase())
        : true;
      const matchesClientId = formValues.clientId
        ? record.bpmValue.toString().includes(formValues.clientId)
        : true;

      return matchesFirstname && matchesLastname && matchesClientId;
    });

    console.log('Filtered Records:', this.displayedRecords);
  }
}

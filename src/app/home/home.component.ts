import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  studentForm!: FormGroup;
  updateForm!:FormGroup;
  studentData:any=[]

  constructor(private httpClient: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.studentForm = new FormGroup({
      eNumber: new FormControl(""),
      sName: new FormControl(""),
      mlMarks: new FormControl(""),
      dpMarks: new FormControl(""),
      bctMarks: new FormControl("")
    });
    this.updateForm = new FormGroup({
      id: new FormControl(""),
      eNumber: new FormControl(""),
      sName: new FormControl(""),
      mlMarks: new FormControl(""),
      dpMarks: new FormControl(""),
      bctMarks: new FormControl("")
    });
  }
  studentDataAdd() {
    let data = this.studentForm.value;
    console.log(data);
    this.httpClient.post("http://localhost:3000/addData", data).subscribe((response) => {
      console.log(response)
    }, (error) => {
      console.log(error)
    })
  }
  showData(){
    this.httpClient.get("http://localhost:3000/showData").subscribe((response)=>{
      this.studentData=response;
    })
  }

  updateData() {
    let data = this.updateForm.value;
    this.httpClient.put(`http://localhost:3000/updateData/${data.id}`, data).subscribe(
      (response) => {
        console.log(response);
        this.showData(); // Refresh the data after updating a student
      },
      (error) => {
        console.log(error);
      }
    );
  }
  setUpdateForm(student: any) {
    this.updateForm.setValue({
      id: student._id,
      eNumber: student.eNumber,
      sName: student.sName,
      mlMarks: student.mlMarks,
      dpMarks: student.dpMarks,
      bctMarks: student.bctMarks
    });
  }


  deleteData(value:any){
    console.log(value);
    this.httpClient.delete( `http://localhost:3000/deleteData/${value}`).subscribe((response)=>{
      console.log(response)
    })
  }
}

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from 'src/app/service/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {

  data={
    to:"",
    subject:"",
    message:""
  }

  flag=false;

  constructor(private emailService:EmailService, private snack:MatSnackBar) {}

  doSubmitForm() {
    console.log("Trying to submit form");
    console.log("Data: ", this.data);

    if(this.data.to=='' || this.data.subject=='' || this.data.message=='') {
      this.snack.open("Fields cannot be empty!!", "OK");
      return;
    }

    this.flag=true;
    this.emailService.sendEmail(this.data).subscribe(
      response=>{
        console.log(response);
        this.flag=false;
        this.snack.open("Send Success", "OK");
      },
      error=>{
        console.log(error);
        this.flag=false;
        this.snack.open("Error", "OK");
      }
    )
  }

}

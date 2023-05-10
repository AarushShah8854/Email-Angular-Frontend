import { ViewEncapsulation } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private userService:UserService, private _snackBar:MatSnackBar){}

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  };

  formSubmit() {
    console.log(this.user);
    if(this.user.username=="" || this.user.username==null) {
      // alert("User is required!!");
      this._snackBar.open("Username is required.", "", {
        duration:2000
      });
      return;
    }

    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        //Success
        console.log(data);
        //alert("Successfully registered");
        Swal.fire({
          title:'Success',
          text:"User is registered with id: " + data.id + " & Username: " + data.username,
          icon:"success",
          confirmButtonText:"OK"
        });
      },
      (error) => {
        //Error
        console.log(error);
        //alert("Something went wrong");
        this._snackBar.open("Something went wrong.","", {
          duration:2000
        })
      }
    );
  }

}

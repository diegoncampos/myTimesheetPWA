import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationsService } from 'src/app/services/notifications.service';
import { AuthenticationService } from "../../services/authentication-service.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public confPass: boolean = false;
  public login = {email:'', password: '', confPassword: ''}

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
  }

  signUp() {
    if (this.login.password === this.login.confPassword) {
      this.authService.RegisterUser(this.login.email, this.login.password)
      .then((res) => {
        this.router.navigate(['home']);
      }).catch((error) => {
        // window.alert(error.message)
        this.notificationsService.showMessage(error.message);
      })
    }
    else {
      this.notificationsService.showMessage("Password and Confirm Password have to be the same")
      this.confPass = true;
    }
    
  }

}

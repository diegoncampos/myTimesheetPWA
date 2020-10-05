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

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
  }

  signUp(email, password) {
    this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        this.router.navigate(['home']);
      }).catch((error) => {
        // window.alert(error.message)
        this.notificationsService.showMessage(error.message);
      })
  }

}

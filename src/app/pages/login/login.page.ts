import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationsService } from 'src/app/services/notifications.service';
import { AuthenticationService } from "../../services/authentication-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public showIcon: string = "eye";
  public user = {email: '', password: ''};

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = {email: '', password: ''};
  }

  logIn() {
    this.authService.SignIn(this.user.email, this.user.password)
      .then((res) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res ));
          this.router.navigate(['home']);
        }
      }).catch((error) => {
        // window.alert(error.message)
        this.notificationsService.showMessage(error.message);
      })
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
    this.showIcon = this.showIcon === "eye" ? "eye-off" : "eye";
   }

}

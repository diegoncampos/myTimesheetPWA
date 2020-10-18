import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationsService } from 'src/app/services/notifications.service';
import { AuthenticationService } from "../../services/authentication-service.service";
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public confPass: boolean = false;
  public login = {name: '', email:'', password: '', confPassword: ''}
  public showIconPass: string = "eye";
  public showIconCPass: string = "eye";

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private notificationsService: NotificationsService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  signUp() {
    if (this.login.password === this.login.confPassword) {
      this.authService.RegisterUser(this.login.email, this.login.password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res));
        //Create user
        let user:User = {
          email: res.user.email,
          displayName: this.login.name,
          photoURL: '',
          groupId: 1,
          times: []
        }
        this.userService.newUser(res.user.uid, user).then( () => {
          this.notificationsService.showMessage("User created succesfully!")
        })
        .catch((e) => {
          // Error!
          this.notificationsService.showMessage(e)
        });;

        this.router.navigate(['home']);
      }).catch((error) => {
        // window.alert(error.message)
        this.notificationsService.showMessage(error.message);
        console.log("singup error", error.message)
      })
    }
    else {
      this.notificationsService.showMessage("Password and Confirm Password have to be the same")
      this.confPass = true;
    }
    
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    if (input.name == 'password') {
      this.showIconPass = this.showIconPass === "eye" ? "eye-off" : "eye";
    }
    else if (input.name == 'confPassword') {
      this.showIconCPass = this.showIconCPass === "eye" ? "eye-off" : "eye";
    }
  }

}

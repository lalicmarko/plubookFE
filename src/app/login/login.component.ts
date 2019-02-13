import { Component, OnInit } from '@angular/core';
import {RESTAPI} from '../shared/rest-api-calls';
import {LoginDTO} from '../shared/models/dto/login.dto';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DataService} from '../shared/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email: string;
  private password: string;

  constructor(private http: HttpClient, private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
  }

  login() {
    const body = {
      'email': this.email,
      'password': this.password
    };

    this.http.post(RESTAPI.getSignInURL(), body).subscribe(
      (response: LoginDTO) => {
        if (response) {
          if (response.token) {
            localStorage.setItem('X-AUTH-TOKEN', response.token);
            localStorage.setItem('loggedUser', JSON.stringify(response.user))
            this.dataService.changeLoggedUser(response.user);
            console.log('************************');
            this.router.navigateByUrl('/feed');
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}

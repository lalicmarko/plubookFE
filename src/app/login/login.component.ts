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
  private username: string;
  private password: string;

  constructor(private http: HttpClient, private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
  }

  login() {
    const body = {
      'username': this.username,
      'password': this.password
    };

    this.http.post(RESTAPI.getSignInURL(), body).subscribe(
      (response: LoginDTO) => {
        console.log('LOGIN RESPONSE: ' + JSON.stringify(response));
        if (response) {
          if (response.token) {
            localStorage.setItem('X-AUTH-TOKEN', response.token);
            this.dataService.changeLoggedUser(response.user);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}

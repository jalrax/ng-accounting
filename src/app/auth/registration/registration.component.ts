import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'sert-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(private usersService: UsersService,
              private router: Router,
              private title: Title,
              private meta: Meta) {
    title.setTitle('Регистрация');
    meta.addTags([
      {name: 'keywords', content: 'регистрация'},
      {name: 'description', content: 'Страница регистрации'},
    ]);
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.firbiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);

    this.usersService.createNewUser(user)
      .subscribe(() => {
      });
    this.router.navigate(['/login'], {
      queryParams: {
        canLogin: true
      }
    });
  }

  firbiddenEmails(control: FormControl): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if (user) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        });
    });
  }
}

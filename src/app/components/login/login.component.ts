import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessages: any[] = [];


  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      ['username']:['',Validators.required],
      ['password']:['',Validators.required]
    })
  }


      // Update the login method
  login(): void {
    if (this.loginForm.valid) {
      const credentials = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      };
      console.log(credentials);

      this.authService.login(credentials).subscribe({
        next: (response) => {
  

          if (response.token) {
            console.log('Login successful:', response.userName);
            console.log('Login successful:', response.token);
            this.authService.setAuthToken(response.token);
            this.router.navigate(['/dashboard']);


            // Further actions on successful login, e.g., navigate to another page
          } else {
            console.error('Login failed:', response?.error || response);
            // Handle login failure, e.g., display an error message
          }
        },
        error: (error) => {
          console.error('HTTP error:', error);
          this.errorMessages =[ error];
        },
        complete: () => {
          // Handle completion if needed
        }
      });
    } else {
      // Handle form validation errors, e.g., display validation messages
      console.error('Form is invalid');
    }
  }


}

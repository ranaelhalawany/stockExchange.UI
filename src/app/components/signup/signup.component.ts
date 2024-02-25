import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessages: any[] = [];


  constructor(private fb: FormBuilder,private authService: AuthService,  private router: Router) { }

  ngOnInit(): void {
    this.signupForm=this.fb.group({
      ['username']:['',Validators.required],
      ['password']:['',Validators.required]
    })
  }


      // Update the login method
      signup(): void {
        if (this.signupForm.valid) {
          const credentials = {
            username: this.signupForm.get('username')?.value,
            password: this.signupForm.get('password')?.value
          };
          console.log(credentials);

          this.authService.signup(credentials).subscribe({
            next: (response) => {
      

              if (response.token) {
                console.log('signup successful:', response.userName);
                console.log('signup successful:', response.token);
                this.authService.setAuthToken(response.token);
                this.router.navigate(['/dashboard']);


                // Further actions on successful signup, e.g., navigate to another page
              } else {
                console.error('signup failed:', response?.error || response);
                // Handle login failure, e.g., display an error message
              }
            },
            error: (error) => {
              console.error('HTTP error:', error);
              this.errorMessages = error;
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

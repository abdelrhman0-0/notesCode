import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ISourceOptions } from 'tsparticles';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public _AuthService:AuthService, public _Router:Router) { }

  id = "tsparticles";
    err = '';
  /* or the classic JavaScript object */
  particlesOptions:ISourceOptions = {
      background: {
          color: {
              value: "#F5F5F5"
          }
      },
      fpsLimit: 60,
      interactivity: {
          events: {
              onClick: {
                  enable: true,
                  mode: "push"
              },
              onHover: {
                  enable: true,
                  mode: "repulse"
              },
              resize: true
          },
          modes: {
              bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40
              },
              push: {
                  quantity: 4
              },
              repulse: {
                  distance: 200,
                  duration: 0.4
              }
          }
      },
      particles: {
          color: {
              value: "#F05454"
          },
          links: {
              color: "#F05454",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1
          },
          collisions: {
              enable: true
          },
          move: {
              direction: "none",
              enable: true,
              outModes: "bounce",
              random: false,
              speed: 3,
              straight: false
          },
          number: {
              density: {
                  enable: true,
                  area: 800
              },
              value: 80
          },
          opacity: {
              value: 0.5
          },
          shape: {
              type: "triangle"
          },
          size: {
              random: true,
              value: 5
          }
      },
      detectRetina: true
  };


LoginForm:FormGroup = new FormGroup({
   
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required])
})

checkIfLoggedIn(){
    if(this._AuthService.isLoggedin()){
        this._Router.navigate(['/home']);
    }
}

pressLoginForm(LoginForm:any){

if(LoginForm.valid){
    this._AuthService.login(LoginForm.value).subscribe((res)=>{
        if(res.message === 'success'){
            localStorage.setItem('token',res.token);
            this._Router.navigate(['home']);
        }else {
            this.err = res.message
        }
    })
}
// console.log(LoginForm);


}


  ngOnInit(): void {
    this.checkIfLoggedIn()
  }

}

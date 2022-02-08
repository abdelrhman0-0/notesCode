import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISourceOptions } from 'tsparticles';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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


registerForm:FormGroup = new FormGroup({
    first_name:new FormControl(null,[Validators.required]),
    last_name:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*\d)[0-9a-zA-Z]{8,}$/)])
})

pressRegisterForm(registerForm:any){
// console.log(registerForm.get('first_name')?.errors);
if(registerForm.valid){
    this._AuthService.register(registerForm.value).subscribe((res)=>{
        if(res.message === 'success'){
            this._Router.navigate(['login']);
        }else {
            this.err = res.errors.email.message
        }
    })
}

}

  ngOnInit(): void {



}
  }



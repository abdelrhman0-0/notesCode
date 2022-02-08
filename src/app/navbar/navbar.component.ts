import { Component, OnInit,DoCheck } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  isLogged = true;


  constructor(public _AuthService:AuthService) { }


  logout(){
    this.isLogged = false;
    this._AuthService.logout().subscribe(res=>{
      console.log(res);
      
    });
    localStorage.clear();
  }

  ngOnInit(): void {
    
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if(this._AuthService.isLoggedin()){
      this.isLogged=true;
    }else{
      this.isLogged = false;
    }
  }

}

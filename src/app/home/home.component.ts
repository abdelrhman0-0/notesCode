import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {

  token:any;
  decoded:any;
  userData:any;
  noteData:any; 
  notes:any;
  isLoading = false;
  noteID:any;
  
  constructor(public _NotesService:NotesService,private _Router:Router) {

   }
  
   updateNoteForm = new FormGroup({
     title:new FormControl(null,Validators.required),
     desc:new FormControl(null,Validators.required)
   })
   
   addNoteForm = new FormGroup({
     title:new FormControl(null,Validators.required),
     desc:new FormControl(null,Validators.required)
   })

   addNote(addNoteForm:any){
       
     this.noteData = {
       title:addNoteForm.value.title,
       desc:addNoteForm.value.desc,
       citizenID:this.decoded._id,
       token:this.token
     }
     this._NotesService.addNote(this.noteData).subscribe(res=>{
     
      if(res.message == 'success'){
    
        this.addNoteForm.reset();

        // this._Renderer2.listen(this.addCloseButton?.nativeElement,'click',()=>{

        // })
        $('#exampleModal').modal('hide');

        this.getAllNotes()
        

      }
     })
    }
     
   


  getUserData(){
    try {
      this.token = localStorage.getItem('token');
      this.decoded = jwt_decode(this.token);
    } catch (error) {
      localStorage.clear();
      this._Router.navigate(['/login']);
    }
   
    this.userData = {
      token:this.token,
      userID:this.decoded._id
    }
  }

  getAllNotes(){
    this.isLoading=true;
    this._NotesService.getUserNotes(this.userData).subscribe(res=>{
      console.log(res);
      if(res.message=='success'|| res.message== 'no notes found'){
      this.isLoading=false;
      this.notes = res.Notes;
      
      
      }else{
        localStorage.clear();
        this._Router.navigate(['/login']);
      }
      
      
    })
  }

  getID(noteID:any){
    this.noteID = noteID;
    console.log(noteID);
    
      
  }

  deleteNote(){
    let SpecificNoteData = {
      Headers:new HttpHeaders({

      }),
      body:{

        token:this.token,
        NoteID:this.noteID
      }
    }
    this._NotesService.deleteNote(SpecificNoteData).subscribe(res=>{
      if(res.message == 'deleted'){
        $('#deleteModal').modal('hide');
        this.getAllNotes();

      }
      
    })
  }


  setValueToForm(note:any){

    this.updateNoteForm.setValue({title:note.title,desc:note.desc});
  
  }

  updateNote(){
    let data = {
      title:this.updateNoteForm.value.title,
      desc:this.updateNoteForm.value.desc,
      token:this.token,
      NoteID:this.noteID
    }
    this._NotesService.updateNote(data).subscribe(res=>{
      
      if(res.message == 'updated'){
        $('#editModal').modal('hide');
        this.getAllNotes()
      }
      
    })

    
  }

  ngOnInit(): void {
    
    this.getUserData()
    this.getAllNotes()
   
    
    
  }



}

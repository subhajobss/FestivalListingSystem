import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn:'root'})
export class FestivalListService{

    constructor(private http : HttpClient){}

    getFestivalList():Observable<any>{       
        return this.http.get<any>('http://localhost:3000/api/v1/festivals');
    }
}

export interface MusicFestival{
    name : string;
    bands : Band[]
  }
  
  export interface Band {
    name : string;
    recordLabel : string;
  }
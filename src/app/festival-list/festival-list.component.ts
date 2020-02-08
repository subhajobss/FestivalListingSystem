import { Component, OnInit } from '@angular/core';
import { MusicFestival, Band, FestivalListService } from './festival-list.service';

@Component({
  selector: 'app-festival-list',
  templateUrl: './festival-list.component.html',
  styleUrls: ['./festival-list.component.scss']
})
export class FestivalListComponent implements OnInit {
  
  festivals;
  lables = new Map<string, Map<string, Set<string>>>();
  
  constructor(private festivalListService : FestivalListService) { }

  ngOnInit() {
    this.fetchFestivals();
    this.sortFestivalList();
  }

  fetchFestivals(){
    this.festivalListService.getFestivalList().subscribe(response =>{
      this.festivals = response;
      this.modifyResponseFormat();
    },error=>{
      throw new Error(error.message);
    });
  }

  modifyResponseFormat(){
    this.festivals.forEach((fest :MusicFestival) => {
      fest.bands.map((band : Band) => {
        if(this.lables.get(band.recordLabel)){
          // if lables already has a label, just add new band details
          let bandDetails  = this.lables.get(band.recordLabel);
          // check if bandDetails already has the same band
          // if true -> Just add festival details to the existing band
          // else set new band and associated festivals
          if(!bandDetails.get(band.name)){
            // create new festSet everytime
            const festSet = new Set<string>();
            festSet.add(fest.name);
            bandDetails.set(band.name,festSet);           
          }else{
            bandDetails.get(band.name).add(fest.name);
          }
        }else{
          // Add new label to label list
          const newBandMap = new Map<string, Set<string>>();
          const festSet = new Set<string>();
          new Set([...festSet.add(fest.name)].sort());
         
          newBandMap.set(band.name,festSet)
            //band.recordLabel -> label name
          this.lables.set(band.recordLabel,newBandMap);          
        }
      });
    });
  }

  sortFestivalList(){
   // Map.prototype.forEach((value, key, map) 
    this.lables.forEach(bandList => {
      bandList.forEach((festivals,bandName,bandMap) => {
        bandMap.set(bandName, new Set([...festivals].sort()));
      });
    });

   
  }
}

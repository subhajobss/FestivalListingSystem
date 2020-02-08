import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalListComponent } from './festival-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { FestivalListService } from './festival-list.service';
import { Observable, of } from 'rxjs';
class MockFestivalListService  {
  getFestivalList() : Observable<any> {
    return of({});
  }
}
describe('FestivalListComponent', () => {
  let component: FestivalListComponent;
  let fixture: ComponentFixture<FestivalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [{provide : FestivalListService, useClass : MockFestivalListService}],
      declarations: [ FestivalListComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivalListComponent);
    component = fixture.componentInstance;
    let festService: any = fixture.debugElement.injector.get(FestivalListService);
    const data =  [
      {name : 'Omega Fest',
       bands:[
        {
          name : 'P',
          recordLabel : 'Label 1'
        }]
      },
      {
       name : 'Beta Fest',
       bands:[      
         {
          name : 'K',
          recordLabel : 'Label 2'
        }
       ]
      }];
    spyOn(festService, 'getFestivalList').and.returnValue(of(data));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should test if recordLabels is defined', () =>{
    component.festivals = [
      {name : 'Omega Fest',
       bands:[
        {
          name : 'P',
          recordLabel : 'Label 1'
        }]
      },
      {
       name : 'Beta Fest',
       bands:[      
         {
          name : 'K',
          recordLabel : 'Label 2'
        }
       ]
      }];
      component.modifyResponseFormat();
      expect(component.lables).toBeDefined();
  });
  it('should test if recordLabels is populated when fetchFestivals is called', () => {
    component.fetchFestivals();
      component.modifyResponseFormat();
      //console.log(JSON.stringify(component.lables));
      expect(component.lables.size).toBe(2);
  });
});

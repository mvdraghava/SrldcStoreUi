import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllsrvsComponent } from './allsrvs.component';

describe('AllsrvsComponent', () => {
  let component: AllsrvsComponent;
  let fixture: ComponentFixture<AllsrvsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllsrvsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllsrvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

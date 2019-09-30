import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllsivsComponent } from './allsivs.component';

describe('AllsivsComponent', () => {
  let component: AllsivsComponent;
  let fixture: ComponentFixture<AllsivsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllsivsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllsivsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

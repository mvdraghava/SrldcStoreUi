import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrvComponent } from './srv.component';

describe('SrvComponent', () => {
  let component: SrvComponent;
  let fixture: ComponentFixture<SrvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

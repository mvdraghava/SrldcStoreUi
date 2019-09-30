import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesrvComponent } from './createsrv.component';

describe('CreatesrvComponent', () => {
  let component: CreatesrvComponent;
  let fixture: ComponentFixture<CreatesrvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesrvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesrvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

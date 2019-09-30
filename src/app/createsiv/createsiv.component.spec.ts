import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesivComponent } from './createsiv.component';

describe('CreatesivComponent', () => {
  let component: CreatesivComponent;
  let fixture: ComponentFixture<CreatesivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

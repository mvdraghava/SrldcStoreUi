import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SivComponent } from './siv.component';

describe('SivComponent', () => {
  let component: SivComponent;
  let fixture: ComponentFixture<SivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

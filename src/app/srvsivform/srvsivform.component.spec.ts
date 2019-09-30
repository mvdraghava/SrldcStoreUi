import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrvsivformComponent } from './srvsivform.component';

describe('SrvsivformComponent', () => {
  let component: SrvsivformComponent;
  let fixture: ComponentFixture<SrvsivformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrvsivformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrvsivformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

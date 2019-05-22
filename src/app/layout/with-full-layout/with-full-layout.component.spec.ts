import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithFullLayoutComponent } from './with-full-layout.component';

describe('WithFullLayoutComponent', () => {
  let component: WithFullLayoutComponent;
  let fixture: ComponentFixture<WithFullLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithFullLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithFullLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

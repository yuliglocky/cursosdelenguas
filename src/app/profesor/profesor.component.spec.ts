import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfesorComponent } from './profesor.component';

describe('ProfesorComponent', () => {
  let component: ProfesorComponent;
  let fixture: ComponentFixture<ProfesorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ProfesorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

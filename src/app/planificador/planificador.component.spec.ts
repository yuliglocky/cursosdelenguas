import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlanificadorComponent } from './planificador.component';

describe('PlanificadorComponent', () => {
  let component: PlanificadorComponent;
  let fixture: ComponentFixture<PlanificadorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlanificadorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

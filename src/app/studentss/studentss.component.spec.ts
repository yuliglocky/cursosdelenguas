import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentssComponent } from './studentss.component';

describe('StudentssComponent', () => {
  let component: StudentssComponent;
  let fixture: ComponentFixture<StudentssComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StudentssComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

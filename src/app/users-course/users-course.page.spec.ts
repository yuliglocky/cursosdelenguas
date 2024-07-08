import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersCoursePage } from './users-course.page';

describe('UsersCoursePage', () => {
  let component: UsersCoursePage;
  let fixture: ComponentFixture<UsersCoursePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

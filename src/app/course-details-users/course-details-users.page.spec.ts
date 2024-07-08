import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseDetailsUsersPage } from './course-details-users.page';

describe('CourseDetailsUsersPage', () => {
  let component: CourseDetailsUsersPage;
  let fixture: ComponentFixture<CourseDetailsUsersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

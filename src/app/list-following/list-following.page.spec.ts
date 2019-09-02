import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFollowingPage } from './list-following.page';

describe('ListFollowingPage', () => {
  let component: ListFollowingPage;
  let fixture: ComponentFixture<ListFollowingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFollowingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFollowingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

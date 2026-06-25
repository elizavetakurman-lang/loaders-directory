import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoaderDialog } from './add-loader-dialog';

describe('AddLoaderDialog', () => {
  let component: AddLoaderDialog;
  let fixture: ComponentFixture<AddLoaderDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLoaderDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AddLoaderDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

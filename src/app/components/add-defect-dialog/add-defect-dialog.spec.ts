import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefectDialog } from './add-defect-dialog';

describe('AddDefectDialog', () => {
  let component: AddDefectDialog;
  let fixture: ComponentFixture<AddDefectDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDefectDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDefectDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

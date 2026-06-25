import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDefectDialog } from './edit-defect-dialog';

describe('EditDefectDialog', () => {
  let component: EditDefectDialog;
  let fixture: ComponentFixture<EditDefectDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDefectDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDefectDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

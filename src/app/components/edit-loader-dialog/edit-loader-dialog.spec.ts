import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoaderDialog } from './edit-loader-dialog';

describe('EditLoaderDialog', () => {
  let component: EditLoaderDialog;
  let fixture: ComponentFixture<EditLoaderDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLoaderDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EditLoaderDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

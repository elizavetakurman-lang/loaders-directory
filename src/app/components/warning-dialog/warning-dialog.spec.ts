import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningDialog } from './warning-dialog';

describe('WarningDialog', () => {
  let component: WarningDialog;
  let fixture: ComponentFixture<WarningDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarningDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(WarningDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

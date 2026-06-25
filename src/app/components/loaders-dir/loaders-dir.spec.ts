import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadersDir } from './loaders-dir';

describe('LoadersDir', () => {
  let component: LoadersDir;
  let fixture: ComponentFixture<LoadersDir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadersDir],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadersDir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, inject, model, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { LoadersService } from '../../services/loaders.service';
import { LoaderDefect } from '../../models/loader-defect';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface DialogData {
  loaderId: number;
}

@Component({
  selector: 'app-add-loader-dialog',
  imports: [MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-defect-dialog.html',
  styleUrl: './add-defect-dialog.scss',
})
export class AddDefectDialog {
  readonly dialogRef = inject(MatDialogRef<AddDefectDialog>);
  loadersService = inject(LoadersService);
  loadersData = this.loadersService.loadersDefects;
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly loaderId = model(this.data.loaderId);

  defectForm = new FormGroup({
    dateOfProblemIdentification: new FormControl<Date | null>(null),
    dateOfProblemSolved: new FormControl<Date | null>(null),
    durationOfDefectInMinutes: new FormControl<number | null>(null),
    reasonOfDefect: new FormControl<string>(''),
  });

  onSave() {
    this.defectForm.disable();
    const formData = this.defectForm.value;
    const request = { ...formData, loaderId: this.loaderId() };
    this.loadersService.addDefect(request).subscribe((_) => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}

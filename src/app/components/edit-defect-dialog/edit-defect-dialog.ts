import { Component, inject, model, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { LoadersService } from '../../services/loaders.service';
import { Loader } from '../../models/loader';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoaderDefect } from '../../models/loader-defect';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-edit-defect-dialog',
  imports: [MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './edit-defect-dialog.html',
  styleUrl: './edit-defect-dialog.scss',
})
export class EditDefectDialog implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditDefectDialog>);
  loadersService = inject(LoadersService);
  defectsData = this.loadersService.loadersDefects;
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly id = model(this.data.id);
  choosenDefect = signal<LoaderDefect | undefined>(undefined);

  defectForm = new FormGroup({
    dateOfProblemIdentification: new FormControl<Date | null>(null),
    dateOfProblemSolved: new FormControl<Date | null>(null),
    durationOfDefectInMinutes: new FormControl<number | null>(null),
    reasonOfDefect: new FormControl<string>(''),
  });

  ngOnInit(): void {
    this.choosenDefect.set(this.defectsData().find((defect) => defect.id === this.id()));

    this.defectForm.patchValue({
      dateOfProblemIdentification: this.choosenDefect()?.dateOfProblemIdentification,
      dateOfProblemSolved: this.choosenDefect()?.dateOfProblemSolved,
      durationOfDefectInMinutes: this.choosenDefect()?.durationOfDefectInMinutes,
      reasonOfDefect: this.choosenDefect()?.reasonOfDefect,
    });
  }

  onSave() {
    this.defectForm.disable();
    const formData = this.defectForm.value;
    const requestData = {
      ...formData,
      id: this.choosenDefect()?.id,
    };
    this.loadersService.editDefect(requestData).subscribe((_) => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}

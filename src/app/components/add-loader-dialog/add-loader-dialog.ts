import { Component, inject, model, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { LoadersService } from '../../services/loaders.service';
import { Loader } from '../../models/loader';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-add-loader-dialog',
  imports: [MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-loader-dialog.html',
  styleUrl: './add-loader-dialog.scss',
})
export class AddLoaderDialog {
  readonly dialogRef = inject(MatDialogRef<AddLoaderDialog>);
  loadersService = inject(LoadersService);
  loadersData = this.loadersService.loaders;
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  loaderForm = new FormGroup({
    brand: new FormControl<string>(''),
    number: new FormControl<string>(''),
    capacity: new FormControl<number | null>(null),
    isActive: new FormControl<boolean>(true),
    user: new FormControl<string>(''),
  });

  onSave() {
    this.loaderForm.disable();
    const formData = this.loaderForm.value;
    this.loadersService.addLoader(formData).subscribe((_) => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}

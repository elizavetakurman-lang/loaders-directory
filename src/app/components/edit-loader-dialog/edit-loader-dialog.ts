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
  selector: 'app-edit-loader-dialog',
  imports: [MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './edit-loader-dialog.html',
  styleUrl: './edit-loader-dialog.scss',
})
export class EditLoaderDialog implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditLoaderDialog>);
  loadersService = inject(LoadersService);
  loadersData = this.loadersService.loaders;
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly id = model(this.data.id);
  choosenLoader = signal<Loader | undefined>(undefined);

  loaderForm = new FormGroup({
    brand: new FormControl<string>(''),
    number: new FormControl<string>(''),
    capacity: new FormControl<number | null>(null),
    isActive: new FormControl<boolean>(true),
    user: new FormControl<string>(''),
  });

  ngOnInit(): void {
    this.choosenLoader.set(this.loadersData().find((loader) => loader.id === this.id()));

    this.loaderForm.patchValue({
      brand: this.choosenLoader()?.brand,
      number: this.choosenLoader()?.number,
      capacity: this.choosenLoader()?.capacity,
      isActive: this.choosenLoader()?.isActive,
      user: this.choosenLoader()?.user,
    });
  }

  onSave() {
    this.loaderForm.disable();
    const formData = this.loaderForm.value;
    const requestData = {
      ...formData,
      id: this.choosenLoader()?.id,
    };
    this.loadersService.editLoader(requestData).subscribe((_) => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}

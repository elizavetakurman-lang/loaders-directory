import { Component, inject, signal } from '@angular/core';
import { MatDialogRef, MatDialogTitle, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadersService } from '../../services/loaders.service';
import { Loader } from '../../models/loader';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  message: string;
}

@Component({
  selector: 'app-warning-dialog',
  imports: [MatDialogTitle, MatDialogModule, MatButtonModule],
  templateUrl: './warning-dialog.html',
  styleUrl: './warning-dialog.scss',
})
export class WarningDialog {
  loadersService = inject(LoadersService);
  dialogRef = inject(MatDialogRef<WarningDialog>);
  choosenLoader = signal<Loader | undefined>(undefined);
  loadersData = this.loadersService.loaders;
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly id = signal(this.data.id);
  readonly message = signal(this.data.message);

  ngOnInit(): void {
    this.choosenLoader.set(this.loadersData().find((loader) => loader.id === this.id()));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

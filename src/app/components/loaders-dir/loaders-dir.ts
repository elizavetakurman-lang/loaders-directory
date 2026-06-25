import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadersService } from '../../services/loaders.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { Loader } from '../../models/loader';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { EditLoaderDialog } from '../edit-loader-dialog/edit-loader-dialog';
import { AddLoaderDialog } from '../add-loader-dialog/add-loader-dialog';
import { WarningDialog } from '../warning-dialog/warning-dialog';
import { AddDefectDialog } from '../add-defect-dialog/add-defect-dialog';
import { EditDefectDialog } from '../edit-defect-dialog/edit-defect-dialog';
@Component({
  selector: 'app-loaders-dir',
  imports: [FormsModule, MatAnchor, MatIconModule, MatTableModule, DatePipe, MatTooltipModule, MatIconButton],
  templateUrl: './loaders-dir.html',
  styleUrl: './loaders-dir.scss',
})
export class LoadersDir implements OnInit {
  readonly loadersDataSource = new MatTableDataSource<Loader>([]);
  loadersService = inject(LoadersService);
  readonly dialog = inject(MatDialog);
  loaderNumberFilterValue = signal<string>('');
  choosenLoaderDefects = this.loadersService.loadersDefects;
  choosenLoaderId = signal<number | undefined>(undefined);

  ngOnInit(): void {
    this.loadersService.getAllLoaders();
    console.log(this.choosenLoaderDefects());
    this.loadersService.loaders$.subscribe((data) => {
      this.loadersDataSource.data = data;
    });
  }

  onFilter() {
    const filterValue = this.loaderNumberFilterValue();
    this.loadersDataSource.filter = filterValue.trim().toLowerCase();
  }

  resetFilter() {
    this.loaderNumberFilterValue.set('');
    this.onFilter();
  }

  displayedColumns: string[] = ['id', 'brand', 'number', 'capacity', 'isActive', 'modifiedAt', 'user', 'options'];
  displayedColumns1: string[] = [
    'id',
    'dateOfProblemIdentification',
    'dateOfProblemSolved',
    'durationOfDefectInMinutes',
    'reasonOfDefect',
    'options',
  ];

  showLoaderDefect(loader: Loader) {
    this.choosenLoaderId.set(loader.id);
    this.loadersService.getLoaderDefect(loader.id);
  }

  openEditLoaderDialog(loaderId: number) {
    const dialogRef = this.dialog.open(EditLoaderDialog, {
      data: { id: loaderId },
    });
  }

  openAddLoaderDialog() {
    const dialogRef = this.dialog.open(AddLoaderDialog);
  }

  deleteLoader(loaderId: number) {
    const dialogRef = this.dialog.open(WarningDialog, {
      data: { id: loaderId, message: 'погрузчика' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadersService.deleteLoader(loaderId).subscribe();
      }
    });
  }

  openAddDefectDialog() {
    const dialogRef = this.dialog.open(AddDefectDialog, {
      data: { loaderId: this.choosenLoaderId() },
    });
  }

  openEditDefectDialog(defectId: number) {
    const dialogRef = this.dialog.open(EditDefectDialog, {
      data: { id: defectId },
    });
  }

  deleteDefect(defectId: number) {
    const dialogRef = this.dialog.open(WarningDialog, {
      data: { id: defectId, message: 'информацию о простое' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadersService.deleteDefect(defectId).subscribe();
      }
    });
  }
}

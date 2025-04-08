import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BatchDialogComponent } from './batch-dialog/batch-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly dialog: MatDialog) { }
  openBatchDialog() {
    this.dialog.open(BatchDialogComponent, {
      disableClose: true,
      panelClass: 'custom-dialog-panel',
      backdropClass: 'custom-dialog-backdrop'
    });
  }
}

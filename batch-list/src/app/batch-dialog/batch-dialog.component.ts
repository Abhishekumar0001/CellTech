import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Part } from '../model/batch-part.model';

@Component({
  selector: 'app-batch-dialog',
  templateUrl: './batch-dialog.component.html',
  styleUrls: ['./batch-dialog.component.scss']
})
export class BatchDialogComponent {
  searchControl = new FormControl('');
  permanentlyRemovedSet: Set<string> = new Set();
  originalPartsList: Part[] = [
    { partName: 'Antenna', price: 15 },
    { partName: 'Drive XTP', price: 49 },
    { partName: 'Keyboard', price: 25 },
    { partName: 'LCD', price: 119 },
    { partName: 'System board Test 1', price: 80 },
    { partName: 'System board Test 2', price: 87 },
    { partName: 'System board Test 3', price: 97 },
    { partName: 'System board Test 4', price: 110 },
    { partName: 'System board Test 5', price: 60 },
    { partName: 'System board Test 6', price: 78 },
    { partName: 'System board Test 7', price: 96 }
  ];
  partsList = [...this.originalPartsList];
  selectedParts: any[] = [];
  addedSet: Set<string> = new Set();
  constructor(
    public dialogRef: MatDialogRef<BatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.permanentlyRemovedSet = new Set(this.data.removedPartNames);
    this.searchControl.valueChanges.subscribe((value: any) => {
      this.partsList = this.originalPartsList.filter(p =>
        p.partName.toLowerCase().includes(value.toLowerCase())
      );
    });
  }
  isDisabled(partName: string): boolean {
    return this.data.addedParts.includes(partName) || this.addedSet.has(partName);
  }
  wasPreviouslyAdded(partName: string): boolean {
    return this.data.addedParts.includes(partName);
  }
  addPart(part: Part): void {
    this.selectedParts.push({ ...part });
    this.addedSet.add(part.partName);
  }
  removePart(part: Part): void {
    if (!this.permanentlyRemovedSet.has(part.partName)) {
      this.selectedParts.push({ partName: part.partName, price: '', removed: true });
      this.permanentlyRemovedSet.add(part.partName);
      this.addedSet.add(part.partName);
    }
  }
  save(): void {
    this.dialogRef.close(this.selectedParts);
  }
  cancel(): void {
    this.dialogRef.close();
  }
}

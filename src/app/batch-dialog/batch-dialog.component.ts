import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Part } from '../model/batch-part.model';
import partListData from '../model/part-list.json'; // Importing JSON data

@Component({
  selector: 'app-batch-dialog',
  templateUrl: './batch-dialog.component.html',
  styleUrls: ['./batch-dialog.component.scss']
})
export class BatchDialogComponent {
  searchControl = new FormControl(''); // FormControl for search input
  originalPartsList: Part[] = (partListData as Part[])
  partsList = [...this.originalPartsList]; // Copy of the original parts list for filtering
  selectedParts: any[] = []; // Array of selected parts to pass to the batch list
  addedSet: Set<string> = new Set(); // Set to track added parts
  permanentlyRemovedSet: Set<string> = new Set(); // Set to track permanently removed parts
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

  // Method to check if a part is disabled
  isDisabled(partName: string): boolean {
    return this.data.addedParts.includes(partName) || this.addedSet.has(partName);
  }

  // Method to check if a part is added previously or not
  wasPreviouslyAdded(partName: string): boolean {
    return this.data.addedParts.includes(partName);
  }

  //addPart method to add a part to the selected parts list
  addPart(part: Part): void {
    this.selectedParts.push({ ...part }); //Add content to this variable which will be passed to the batch list
    this.addedSet.add(part.partName); // Add to addedSet in order to track the added parts
  }

  // Method to set remove as true to a part and add it to the selected parts list also set permanentlyRemovedSet to track the removed parts
  removePart(part: Part): void {
    if (!this.permanentlyRemovedSet.has(part.partName)) {
      this.selectedParts.push({ partName: part.partName, price: '', removed: true });
      this.permanentlyRemovedSet.add(part.partName);
    }
  }

  isPartAddedOrRemoved(): boolean {  //to make save disabled if no part is added or removed
    return this.permanentlyRemovedSet.size > 0 || this.addedSet.size > 0;
  }

  save(): void {
    this.dialogRef.close(this.selectedParts);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

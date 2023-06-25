
import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-winner-poppup',
  templateUrl: './winner-poppup.component.html',
  styleUrls: ['./winner-poppup.component.scss']
})
export class WinnerPoppupComponent {

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {winer: string, player: boolean, cells: Array<HTMLElement>},
    public dialogRef: MatDialogRef<WinnerPoppupComponent>
    ){}

    reset(){
      this.data.cells.forEach(element => {
        element.textContent = '';
        element.classList.remove('text-white')
      });
      this.dialogRef.close();
    }
}

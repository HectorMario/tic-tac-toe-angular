import { Component, AfterViewInit } from '@angular/core';
import { WinnerPoppupComponent } from './winner-poppup/winner-poppup.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'tic-tac-toe-angular';
  cells: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  options: Array<string> = ['x', 'o'];
  select: boolean = false;
  possibilities!: Array<HTMLElement>
  winConditions: Array<Array<number>> = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
    [0, 1, 2]
  ]
  winner: boolean = false;
  player: boolean = true;

  constructor(
    private dialog: MatDialog
  ) { }
  ngAfterViewInit() {
    this.possibilities = Array.from(document.querySelectorAll('.possibilities'));
  }
  changeSelect(option: string) {
    if (option == 'o') {
      this.select = true;
    } else {
      this.select = false;
    }
  }
  putSelect(event: Event) {
    this.player = true;
    let element = event.target as HTMLElement;
    if (element && this.select == false && element.textContent == '') {
      element.textContent = "x";
      element.classList.add('text-red-500');
      this.winControl();
    } else if (element && this.select == true && element.textContent == '') {
      element.textContent = "o";
      element.classList.add('text-white');
      this.winControl();
    }

  }

  turnPC() {
    this.player = false;
    const elementsArray: Array<HTMLElement> = Array.from(this.possibilities);
    const control: boolean = elementsArray.every(obj => obj['textContent'] !== '');
    if (!control) {
      let numberRandom: number = Math.floor(Math.random() * 9);
      const choosePc: HTMLElement = this.possibilities[numberRandom];
      if (choosePc.textContent == "" && this.select == false) {
        choosePc.textContent = 'o';
        choosePc.classList.add('text-white');
        this.winControl();
      } else if (choosePc.textContent == "" && this.select == true) {
        choosePc.textContent = 'x';
        choosePc.classList.add('text-red-500');
        this.winControl();
      } else {
        this.turnPC()
      }
    }
  }

  winControl() {
    let controlPosibility: Array<string | null> = [];
    let continueExecution = true;

    this.winConditions.forEach(conditions => {
      if (continueExecution) {
        controlPosibility = [];
        conditions.forEach(condition => {
          if (this.possibilities[condition].textContent !== '') {
            controlPosibility.push(this.possibilities[condition].textContent)
          }
        });
        if (controlPosibility.length == 3) {
          const iqual: boolean = controlPosibility.every(option => option == controlPosibility[0])
          if (iqual) {
            continueExecution = false;
            this.openPoppup(controlPosibility[0])
            return; 
          } else {
            controlPosibility = [];
          }
        }

      }
    });

    if (this.player && continueExecution) {
      this.turnPC();
    }
  }

  openPoppup(winer: string | null): void {
    const dialogRef = this.dialog.open(WinnerPoppupComponent, {
      data: {winer: winer, player: this.player, cells: this.possibilities}
    })
  }

  resetCells(){
    this.possibilities.forEach(element => {
      element.textContent = '';
      element.classList.remove('text-white')
    });
  }
}

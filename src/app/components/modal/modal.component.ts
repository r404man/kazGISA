import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ContentComponent } from './content/content.component';

export interface DialogData {
  title: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title!: string;
  @Output() newTitle = new EventEmitter<string>();

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ContentComponent, {
      width: '250px',
      data: { title: this.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.length !== 0) {
        this.newTitle.emit(result);
      }
    });
  }
  ngOnInit(): void {}
}

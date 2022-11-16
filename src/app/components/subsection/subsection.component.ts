import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subsection } from 'src/app/interfaces/Subsection';
import { TreeService } from 'src/app/services/tree.service';

@Component({
  selector: 'app-subsection',
  templateUrl: './subsection.component.html',
  styleUrls: ['./subsection.component.scss'],
})
export class SubsectionComponent implements OnInit {
  @Input() subsection!: Subsection;
  @Output() removeSubsectionFromList = new EventEmitter<Subsection>();
  @Output() changeTitle = new EventEmitter<Subsection>();

  constructor(private treeService: TreeService) {}

  newTitleHandler(data: any) {
    this.subsection.title = data;
    this.changeTitle.emit(this.subsection);
  }

  removeSubsection() {
    this.removeSubsectionFromList.emit(this.subsection);
  }

  ngOnInit(): void {}
}

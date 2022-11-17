import { Component, OnInit, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Section } from 'src/app/interfaces/Section';
import { TreeService } from 'src/app/services/tree.service';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  tree!: Observable<any>;

  sections!: Observable<Section[]>;

  constructor(private treeService: TreeService) {}

  addSection() {
    let section: Section = {
      id: Math.random(),
      title: `${Math.random()}`,
      subsections: [],
    };

    this.treeService.addSection(section);
  }

  handleRemoveSection(data: Section) {
    this.treeService.removeSection(data);
  }

  ngOnInit(): void {
    this.sections = this.treeService.sections;
  }
}

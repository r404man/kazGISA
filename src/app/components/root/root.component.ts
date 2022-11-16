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

  sections: Section[] = [];

  constructor(private treeService: TreeService) {}

  addSection() {
    let section: Section = {
      id: Math.random(),
      title: `${Math.random()}`,
      subsections: [],
    };

    this.treeService.addSection(section);

    this.treeService.tree.asObservable().subscribe((data) => {
      this.sections = data.root.sections;
    });
  }

  handleRemoveSection(data: Section) {
    this.treeService.removeSection(data);
    this.sections = this.sections.filter((item) => item.id !== data.id);
  }

  ngOnInit(): void {
    this.tree = this.treeService.getTree();
    this.tree.subscribe((data) => {
      this.sections = data.sections;
    });
  }
}

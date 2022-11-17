import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Section } from 'src/app/interfaces/Section';
import { Subsection } from 'src/app/interfaces/Subsection';
import { TreeService } from 'src/app/services/tree.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  @Input() section!: Section;
  @Output() removeSection = new EventEmitter<Section>();

  subsections: Subsection[] = [];

  panelOpenState = false;

  constructor(private treeService: TreeService) {}

  addSubsection() {
    let subsection: Subsection = {
      id: Math.random(),
      title: `${Math.random()}`,
    };

    this.treeService.addSubsection(this.section.id, subsection);
  }

  remove() {
    this.removeSection.emit(this.section);
  }

  newTitleHandler(data: any) {
    this.treeService.editSection(this.section, data);
  }

  handleRemoveSubsection(data: Subsection) {
    this.treeService.removeSubsection(this.section.id, data);
  }

  handleSubsectionTitle(data: any) {
    this.treeService.editSubsection(data, this.section.id);
  }

  ngOnInit(): void {
    this.subsections = this.section.subsections;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { Section } from '../interfaces/Section';
import { Subsection } from '../interfaces/Subsection';
import { Root } from '../interfaces/Root';

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  sectionsSource = new BehaviorSubject<Section[]>([]);
  sections = this.sectionsSource.asObservable();

  constructor() {}

  getTree() {
    const tree = JSON.parse(localStorage.getItem('tree')!);
    if (tree === null) {
      localStorage.setItem('tree', JSON.stringify([]));
    } else {
      localStorage.setItem('tree', JSON.stringify(tree));
      this.sectionsSource.next(tree);
    }
  }

  updateStorage() {
    localStorage.setItem('tree', JSON.stringify(this.sectionsSource.value));
  }

  addSection(section: any) {
    const currentSections = this.sectionsSource.value;
    const updatedSections = [...currentSections, section];
    this.sectionsSource.next(updatedSections);

    this.updateStorage();
  }

  removeSection(section: Section) {
    const currentSections = this.sectionsSource.value;
    const updatedSections = currentSections.filter(
      (item) => item.id !== section.id
    );
    this.sectionsSource.next(updatedSections);

    this.updateStorage();
  }

  editSection(section: Section, newTitle: string) {
    const currentSections = this.sectionsSource.value;
    currentSections.filter((item) => item.id === section.id)[0].title =
      newTitle;
    const updatedSections = currentSections;
    this.sectionsSource.next(updatedSections);

    this.updateStorage();
  }

  addSubsection(sectionId: number, subsection: Subsection) {
    const currentSections = this.sectionsSource.value;
    const updatedSections = currentSections.map((item) => {
      if (item.id === sectionId) {
        return { ...item, subsections: [...item.subsections, subsection] };
      } else {
        return { ...item };
      }
    });
    this.sectionsSource.next(updatedSections);

    this.updateStorage();
  }

  removeSubsection(sectionId: number, subsection: Subsection) {
    const currentSections = this.sectionsSource.value;
    const updatedSections = currentSections.map((item) => {
      if (item.id === sectionId) {
        return {
          ...item,
          subsections: [
            ...item.subsections.filter((item) => item.id !== subsection.id),
          ],
        };
      } else {
        return { ...item };
      }
    });

    this.sectionsSource.next(updatedSections);

    this.updateStorage();
  }

  editSubsection(subsection: Subsection, sectionId: number) {
    const currentSections = this.sectionsSource.value;
    const updatedSections = currentSections.map((item) => {
      if (item.id === sectionId) {
        return {
          ...item,
          subsections: [
            ...item.subsections.map((item) => {
              if (item.id === subsection.id)
                return { ...item, title: subsection.title };
              return { ...item };
            }),
          ],
        };
      }
      return { ...item };
    });

    this.sectionsSource.next(updatedSections);

    this.updateStorage();
  }
}

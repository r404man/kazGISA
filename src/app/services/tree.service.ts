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

  getTree() {}

  addSection(section: any) {
    const currentSections = this.sectionsSource.value;
    const updatedSections = [...currentSections, section];
    this.sectionsSource.next(updatedSections);
  }

  removeSection(section: Section) {
    const currentSections = this.sectionsSource.value;
    const updatedSections = currentSections.filter(
      (item) => item.id !== section.id
    );
    this.sectionsSource.next(updatedSections);
  }

  editSection(section: Section, newTitle: string) {
    const currentSections = this.sectionsSource.value;
    currentSections.filter((item) => item.id === section.id)[0].title =
      newTitle;
    const updatedSections = currentSections;
    this.sectionsSource.next(updatedSections);
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
  }
}

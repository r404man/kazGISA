import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Section } from '../interfaces/Section';
import { Subsection } from '../interfaces/Subsection';
import { Root } from '../interfaces/Root';

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  tree = new BehaviorSubject<any>(null);

  root: Root = JSON.parse(localStorage.getItem('tree')!)!.root;

  constructor() {}

  getTree() {
    let x = JSON.parse(localStorage.getItem('tree')!);
    this.tree.next(x);
    return of(x);
  }

  addSection(section: Section) {
    let x = JSON.parse(localStorage.getItem('tree')!);
    x.sections.push(section);
    console.log(x);
    localStorage.setItem('tree', JSON.stringify(x));

    this.tree.next({
      root: { id: 0, title: 'Root', sections: [...x.sections] },
    });
  }

  removeSection(section: Section) {
    let sections: any[] = [];

    this.tree.asObservable().subscribe((data) => {
      sections = data.root.sections.filter(
        (sec: Section) => sec.id !== section.id
      );
    });

    this.tree.next({ root: { id: 0, title: 'Root', sections: [...sections] } });
    // localStorage.setItem('tree', JSON.stringify(this.root));
  }

  editSection(section: Section, newTitle: string) {
    let sections: any[] = [];
    // this.tree.asObservable().subscribe((data) => {
    //   sections = data.sections.map((item: Section) => {
    //     console.log(item);
    //   });
    // });

    // this.tree.next({ root: { id: 0, title: 'Root', section: [...sections] } });
    // this.root.sections.map((item: Section) => {

    //   if (item.id === section.id) {
    //     section.title = newTitle;
    //   }
    //   return item;
    // });

    // localStorage.setItem('tree', JSON.stringify(this.root));
  }

  addSubsection(sectionId: number, subsection: Subsection) {
    let x = JSON.parse(localStorage.getItem('tree')!);
    x.sections = x.sections.filter((item: Section) => item.id === sectionId)[0];

    console.log(x);
    localStorage.setItem('tree', JSON.stringify(x));

    this.tree.next({
      root: { id: 0, title: 'Root', sections: [...x.sections] },
    });

    // this.root.sections
    //   .filter((item) => item.id === sectionId)[0]!
    //   .subsections.push(subsection);

    // localStorage.setItem('tree', JSON.stringify(this.root));
  }

  removeSubsection(sectionId: number, subsection: Subsection) {
    let x = this.root.sections.filter((item) => item.id === sectionId);
    x[0].subsections = x[0].subsections.filter(
      (item) => item.id !== subsection.id
    );

    localStorage.setItem('tree', JSON.stringify(this.root));
  }

  editSubsection(subsection: Subsection, sectionId: number) {
    let x = this.root.sections.filter((item) => item.id === sectionId);
    x[0].subsections = x[0].subsections.map((item) => {
      if (item.id === subsection.id) {
        return { ...item, title: subsection.title };
      }
      return item;
    });

    localStorage.setItem('tree', JSON.stringify(this.root));
  }
}

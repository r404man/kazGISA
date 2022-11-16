import { Subsection } from './Subsection';

export interface Section {
  id: number;
  title: string;
  subsections: Subsection[];
}

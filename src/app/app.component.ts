import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Root } from './interfaces/Root';
import { TreeService } from './services/tree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test';

  constructor(private treeService: TreeService) {}

  ngOnInit(): void {
    let tree = JSON.parse(localStorage.getItem('tree')!);

    let root: Root = {
      id: 0,
      title: 'Root',
      sections: [],
    };

    if (tree === null) {
      localStorage.setItem('tree', JSON.stringify(root));
    } else {
      this.treeService.tree.next(tree);
    }
  }
}

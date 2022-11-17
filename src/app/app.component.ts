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
    this.treeService.getTree();
  }
}

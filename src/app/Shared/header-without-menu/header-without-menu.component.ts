import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-without-menu',
  templateUrl: './header-without-menu.component.html',
  styleUrls: ['./header-without-menu.component.scss'],
})
export class HeaderWithoutMenuComponent implements OnInit {

  @Input() title = '';

  constructor() { }

  ngOnInit() {}

}

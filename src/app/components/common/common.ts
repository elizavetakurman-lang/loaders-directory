import { Component } from '@angular/core';
import { LoadersDir } from '../loaders-dir/loaders-dir';
import { Header } from '../header/header';
import { SideNav } from '../side-nav/side-nav';

@Component({
  selector: 'app-common',
  imports: [LoadersDir, Header, SideNav],
  templateUrl: './common.html',
  styleUrl: './common.scss',
})
export class Common {}

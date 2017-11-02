import { Component } from '@angular/core';

interface Page {
  href: string;
  title?: string;
  label?: string;
}

@Component({
  selector: 'app-nav',
  template: `
    <div *ngFor="let page of pages" class="nav">
      <a [href]="page.href" [title]="page.title || page.label">{{page.label}}</a>
    </div>
  `
})
export class NavComponent {
  pages: Page[] = [
    {href: '', title: 'Home', label: 'Home'},
    {href: 'tutorial/toh-intro', label: 'Tutorial Intro'},
    {href: 'hero-form', label: 'Hero Form'},
    {href: 'questionnaire', title: 'Questionnaire: job application for heroes', label: 'Questionnaire'},
    {href: 'tutorial/toh-pt1', title: 'The Hero Editor', label: 'Tutorial Editor'},
    {href: 'tutorial/toh-pt2', label: 'Tutorial Master/Detail'},
    {href: 'awesome-fortune', label: 'Awesome Fortune'},
    {href: 'long-story', label: 'The Long Story'},
    {href: 'not-a-doc', title: 'This doc will not be found', label: 'Bad Doc'},
  ];
}

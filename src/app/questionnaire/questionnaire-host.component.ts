import { Component, OnInit } from '@angular/core';

import { AnswerService } from 'app/questionnaire/answer.service';
import { QuestionControlService } from './controls/question-control.service';
import { QuestionnaireService } from './questionnaire.service';

@Component({
  selector: 'app-questionnaire-host',
  template: `
    <div>
      <h2>Job Application for Heroes</h2>
      <app-questionnaire [questions]="questions"></app-questionnaire>
    </div>
  `,
  providers: [
    AnswerService,
    QuestionControlService,
    QuestionnaireService,
  ]
})
export class QuestionnaireHostComponent implements OnInit {
  questions: any[];

  constructor(private qService: QuestionnaireService) { }

  ngOnInit() {
    this.questions = this.qService.getQuestions();
  }
}

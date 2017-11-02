import { QuestionBase } from './question-base';

export class DropdownQuestion extends QuestionBase {
  controlType = 'dropdown';

  // Options of the dropdown (<select>)
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}

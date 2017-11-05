import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-shape]',//note the [] 
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeXComponent implements OnInit {

  @Input()
  height: number = 50;
  @Input()
  width: number = 75;
  @Input()
  isSelected: boolean = false;
  @Input()
  title: string = "hello";

  constructor() { }

  ngOnInit() {
  }

  doClick() {
    
    this.width += 30;
    this.height += 30;
  }

}

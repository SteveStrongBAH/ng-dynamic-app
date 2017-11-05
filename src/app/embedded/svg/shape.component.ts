import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-shape]',//note the [] 
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {

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
    console.log("Width", this.width);
  }

  doClick() {
    alert("you clicked the shape")
  }

}

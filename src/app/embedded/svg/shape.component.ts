import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-shape]',//note the [] 
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {

  height: number = 50;
  width: number = 75;
  isSelected: boolean = false;
  title: string = "hello";

  constructor() { }

  ngOnInit() {
  }

  doClick() {
    alert("you clicked the shape")
  }

}

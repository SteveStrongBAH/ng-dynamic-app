import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

//https://teropa.info/blog/2016/12/12/graphics-in-angular-2.html

import { ShapeComponent} from './shape.component'

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent implements OnInit {
  cx:Number = 300;
  cy:Number = 100;

  circleX = 400;
  circleY = 150;
  circleR = 50;

  @ViewChild('svgcanvas',  { read: ViewContainerRef }) svgCanvas;

  ViewDocument:HTMLElement = null;
  SVGRoot:SVGSVGElement = null;

  constructor(private vcr: ViewContainerRef, private resolve: ComponentFactoryResolver) { }

  ngOnInit() {
    this.ViewDocument = this.vcr.element.nativeElement as HTMLElement;
    this.SVGRoot = this.ViewDocument.querySelector('#root') as SVGSVGElement;
  }

  doAddCircle() {

    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
    newElement.setAttribute("cx", `${this.circleX}`);
    newElement.setAttribute("cy", `${this.circleY}`);
    newElement.setAttribute("r", `${this.circleR}`);
    newElement.setAttribute("style", 'fill:green; ');
    this.SVGRoot.appendChild(newElement);  
    
    this.circleX += 20;
    this.circleY += 10;
    this.circleR += 5;
  }

  doAddShapeComponent(event$) {

    let toolboxComponent = this.resolve.resolveComponentFactory(ShapeComponent);
    let cmpRef: any = this.svgCanvas.createComponent(toolboxComponent);

    setTimeout(function () {
      if (cmpRef.instance && cmpRef.instance.hasOwnProperty('title')) {
        cmpRef.instance.title = "Hello SVG";
      }
    }, 1000);
  }

}

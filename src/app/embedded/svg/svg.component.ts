import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

//https://teropa.info/blog/2016/12/12/graphics-in-angular-2.html

import { ShapeXComponent} from './shape.component'

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css'],
})
export class SvgComponent implements OnInit {
  cx:number = 300;
  cy:number = 100;

  circleX:number = 400;
  circleY:number = 150;
  circleR:number = 50;

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

  doAddShapeXComponent(event$) {

    let toolboxComponent = this.resolve.resolveComponentFactory(ShapeXComponent);
    let cmpRef: any = this.svgCanvas.createComponent(toolboxComponent);
    let instance: ShapeXComponent = cmpRef.instance;
    console.log(instance);

    setTimeout(_ => {
      if (instance && instance.hasOwnProperty('title')) {
        instance.title = "Hello SVG";
        console.log(instance);
      }
    }, 100);
  }

}

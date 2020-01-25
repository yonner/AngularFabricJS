import { Component, OnInit, Input } from '@angular/core';
import { PathModel } from '../path-Model';
import { fabric } from 'fabric'

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit {

  @Input() parentCanvas:any;

  @Input() path : PathModel;

  line : fabric.Line;

  X : number;

  constructor() { }

  ngOnChanges()
  {
    console.log("change");
  }

  ngOnInit() {

    this.X =(( (this.path.toLocation.location.positionX + 30)- (this.path.fromLocation.location.positionX + 30)) / 2 ) + this.path.fromLocation.location.positionX;
    var text = new fabric.IText(this.path.hazard, {
      left: this.X,
      top: this.path.fromLocation.location.positionY,   
      fontSize: 20
    });

    this.line = new fabric.Line([this.path.fromLocation.location.positionX + 30, this.path.fromLocation.location.positionY+ 30, this.path.toLocation.location.positionX+ 30, this.path.toLocation.location.positionY+ 30], {
      fill: 'black',
      stroke: 'black',
      strokeWidth: 5,
      selectable: false,
      evented: false,
      opacity: 0.3
    });

    this.parentCanvas.add(this.line);
    
    this.parentCanvas.add(text);
  }

}

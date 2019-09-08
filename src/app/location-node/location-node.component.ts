import { Component, OnInit , Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import { fabric } from 'fabric'
import { LocationModel } from '../Location-Model';

@Component({
  selector: 'app-location-node',
  templateUrl: './location-node.component.html',
  styleUrls: ['./location-node.component.css']
})
export class LocationNodeComponent implements OnInit {

  @Input() parentCanvas:any;

  @Input() id:number;

  @Input() location : LocationModel;

  @Output() sendDataToParent = new EventEmitter<LocationModel>();

  @ViewChild('myDiv', {static:false}) myDiv: ElementRef;

  circle: fabric.Circle;

  constructor() { }

    ngOnInit() {

    if (this.circle == null)
    {
      this.circle = new fabric.Circle({
        radius: 30,
        fill: '#e8e490',
        left: this.location.location.positionX,
        top: this.location.location.positionY,
        opacity: 0.7,
        stroke: '#e6bd4e',
        strokeWidth: 2,
        strokeUniform: true,
        selectable: true
      });
    }

    var rect = new fabric.Rect({
      width: 20,
      height: 20,
      left: this.location.location.positionX + 50,
      top: this.location.location.positionY + 50,
      stroke: '#aaf',
      strokeWidth: 1,
      fill: '#faa',
      selectable: false
    });

    var text = new fabric.IText(this.location.id, {
      left: this.location.location.positionX+ 15,
      top: this.location.location.positionY + 15,   
      fontSize: 20
    });

    rect.on('mousedown', () => {this.sendDataToParent.emit(this.location);});

    this.parentCanvas.add(rect);


    this.parentCanvas.add(this.circle);

    this.parentCanvas.add(text);
    
    this.parentCanvas.bringToFront(rect)
  }

  mousedown()
  {
      console.log('an object was clicked! ');
      this.sendDataToParent.emit(this.location);
  }

  ngAfterViewInit() {
  
    console.log(this.myDiv); 
  }

  _sendDataToParent() {
    this.sendDataToParent.emit(this.location);
  }

}

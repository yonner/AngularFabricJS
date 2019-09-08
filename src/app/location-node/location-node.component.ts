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

  circle2: fabric.Circle;

  constructor() { }

  ngOnInit() {
//    this.parentCanvas.add(new fabric.IText('Hello Fabric!'+this.id));

    /*var circle2 = new fabric.Circle({
      radius: 30,
      fill: '#e8e490',
      left: 30  + (this.id * 200),
      top:30,
      opacity: 0.7,
      stroke: '#e6bd4e',
      strokeWidth: 3,
      strokeUniform: true
    });*/

    if (this.circle2 == null)
    {
      this.circle2 = new fabric.Circle({
        radius: 30,
        fill: '#e8e490',
        left: this.location.location.positionX  /*+ (this.id * 200)*/,
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


    this.parentCanvas.add(this.circle2);

    this.parentCanvas.add(text);
    
    this.parentCanvas.bringToFront(rect)
  }

  mousedown()
  {
      console.log('an object was clicked! ');
      this.sendDataToParent.emit(this.location);
  }

  ngAfterViewInit() {
    
    //this.myDiv.nativeElement.style.left = 30 + 'px';
    //this.myDiv.nativeElement.style.top= 30 + 'px';

    console.log(this.myDiv); 
  }

  _sendDataToParent() {
    //this.sendDataToParent.emit(this.id);
    this.sendDataToParent.emit(this.location);
  }

}

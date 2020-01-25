import { Component, OnInit , Input, Output, EventEmitter, ElementRef, ViewChild, Inject} from '@angular/core';
import { fabric } from 'fabric'
import { LocationModel } from '../Location-Model';
import { PathmanagerService } from '../pathmanager.service';
import { PathModel} from '../path-Model';

@Component({
  selector: 'app-location-node',
  templateUrl: './location-node.component.html',
  styleUrls: ['./location-node.component.css']
})
export class LocationNodeComponent implements OnInit {

  @Input() parentCanvas:any;

  @Input() id:number;

  @Input() location : LocationModel;

  @Input() paths : PathModel[];

  circle: fabric.Circle;

  constructor(private pathManager : PathmanagerService) { }

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
        name: "node-circle",
        selectable: false //true
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

    var joinrect = new fabric.Rect({
      width: 20,
      height: 20,
      left: this.location.location.positionX -10,
      top: this.location.location.positionY + 50,
      stroke: '#aaf',
      strokeWidth: 1,
      fill: '#afa',
      selectable: false
    });

    var text = new fabric.IText(this.location.id, {
      left: this.location.location.positionX+ 15,
      top: this.location.location.positionY + 15,   
      fontSize: 20,
      selectable: false
    });

    rect.on('mousedown', () => {
      this.pathManager.addLocationFromCurrentLocation(this.location);
    });


    /*
      When the join path rect is clicked we need to allow select mode
    */
    joinrect.on('mousedown', () => {
      this.pathManager.selectFrom = true;

      this.circle.set('fill', 'red');
      this.pathManager.canvas.renderAll();
      
      this.pathManager.addPath(this.location);
    });

    this.pathManager.canvas.on('mouse:over', (e) => {
      //
    });

    this.parentCanvas.add(rect);

    this.parentCanvas.add(joinrect);

    this.parentCanvas.add(this.circle);

    this.parentCanvas.add(text);
    
    this.parentCanvas.bringToFront(rect)
  }

  mousedown()
  {
      console.log('an object was clicked! ');
  }

  ngAfterViewInit() {
    //
  }

  _sendDataToParent() {
    //
  }

}

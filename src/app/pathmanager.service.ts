import { Injectable } from '@angular/core';
import {LocationModel} from './Location-Model';
import {LocationPosition} from './locationPosition-Model';
import {PathModel} from './path-Model'
import { fabric } from 'fabric'
import { Canvas } from 'fabric/fabric-impl';

@Injectable({
  providedIn: 'root'
})
export class PathmanagerService {

  public locations : LocationModel[] = [];

  public canvas: Canvas;
  public nextId: number;

  public selectFrom : boolean = false;

  pathModel : PathModel;

  constructor() { 

    var lm : LocationModel = { location: ( new LocationPosition(), { positionX: 30, positionY:30}), paths : [], fromLocation: null, id: '1'};

    this.locations.push(lm);
  }

  updateCurrentMouse(e: fabric.IEvent)
  {
    if (this.selectFrom)
    {
      console.log(e.pointer.x + "," +e.pointer.y);

      this.pathModel.toLocation.location.positionX = e.pointer.x;
      this.pathModel.toLocation.location.positionY = e.pointer.y;
    }
  }

  resizeCanvas ()
  {
    // resize the canvas
    this.canvas.setWidth( (this.locations.length + 1 )* 230);
    this.canvas.setHeight( 500 );
    this.canvas.calcOffset();
  }

  addPath(data : LocationModel)
  {
    var lm : LocationModel = { location: ( new LocationPosition(), { positionX: 0, positionY: 0}), paths: [], fromLocation: data, id: this.nextId + ''};
    var pm :  PathModel = { toLocation: lm, fromLocation : data , hazard: 'something', dir: 2};
    data.paths.push(pm);

    this.pathModel = pm;
  }

  addLocationFromCurrentLocation(data : LocationModel){

        this.nextId++;
     
        if (data.paths.length == 0){

          this.resizeCanvas();

          var lm : LocationModel = { location: ( new LocationPosition(), { positionX: 30 + (data.location.positionX + 200), positionY: data.location.positionY}), paths: [], fromLocation: data, id: this.nextId + ''};
          var pm :  PathModel = { toLocation: lm, fromLocation : data , hazard: 'something', dir: 0};
          data.paths.push(pm);

        } else if (data.paths.length > 0){
          var lm : LocationModel = { location: ( new LocationPosition(), { positionX: 30 + (data.location.positionX + 200), positionY: data.location.positionY + (data.paths.length * 80) }), paths: [], fromLocation: data, id: this.nextId + ''};
          var pm :  PathModel = { toLocation: lm, fromLocation : data , hazard: 'something', dir: 1};
    
          data.paths.push(pm);
        }
      
        this.locations.push(lm);
    
        console.log(data);
      }
}

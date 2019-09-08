import { Component, OnInit , Output} from '@angular/core';
import { fabric } from 'fabric'
import { LocationModel } from './Location-Model';
import { LocationPosition } from './locationPosition-Model';
import { throwError, NEVER } from 'rxjs';
import { PathModel } from './path-Model';
import { PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'angular-fabric';
  canvas:any;

  nodes:number[];

  locations : LocationModel[] = [];

  canvasWidth: number;

  nextId: number;

  ngOnInit() {

    this.nextId = 1;

    //this.nodes = [1,2,3];
    this.nodes = [1];

    //this.locations[] 
    //this.locations.push(new LocationModel(), { location: ( new LocationPosition(), { positionX: 30, positionY:30}), paths: null});

//    var pm :  PathModel = { toLocation: 1, fromLocation : 1 };

    var lm : LocationModel = { location: ( new LocationPosition(), { positionX: 30, positionY:30}), paths : [], fromLocation: null, id: '1'};

    this.locations.push(lm);

    this.canvasWidth = 500;

    this.canvas = new fabric.Canvas('myCanvas');

    this.canvas.hoverCursor = 'pointer';
  }

    someFunction(data){

      var lm : LocationModel = { location: ( new LocationPosition(), { positionX: 30, positionY:80}), paths : [], fromLocation: null, id: "1"};

      this.locations[0]= lm;

      this.canvas.clear();


    // resize the canvas
//    this.canvas.setWidth( (this.nodes.length + 1 )* 200);
    this.canvas.setWidth( (this.locations.length + 1 )* 230);
    this.canvas.setHeight( 500 );
    this.canvas.calcOffset();

    this.nextId++;

    var lm : LocationModel = { location: ( new LocationPosition(), { positionX: 30 + (data.location.positionX + 200), positionY:30}), paths: [], fromLocation: data, id: this.nextId + ''};

    if (data.paths.length == 0){
      var pm :  PathModel = { toLocation: lm, fromLocation : data , hazard: 'something', dir: 0};

  //    lm.paths.push(pm);
      data.paths.push(pm);
    } else if (data.paths.length == 1){
      var pm :  PathModel = { toLocation: lm, fromLocation : data , hazard: 'something', dir: 1};

      data.paths.push(pm);

      //adjust child locations
      //lm.location.positionY -=50;
      this.adjustChildren(lm.fromLocation);
    }
    
    this.locations.push(lm);

//    this.nodes.push(this.nodes.length + 1);
    console.log(data);
  }

  adjustChildren(location: LocationModel) {

      if (location)
      {
        location.location.positionY +=80;

        this.adjustChildren(location.fromLocation);

      }else{
        
        return;
      }
  }

}

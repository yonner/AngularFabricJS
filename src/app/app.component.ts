import { Component, OnInit , Output} from '@angular/core';
import { fabric } from 'fabric'
import { LocationModel } from './Location-Model';
import { LocationPosition } from './locationPosition-Model';
import { throwError, NEVER } from 'rxjs';
import { PathModel } from './path-Model';
import { PathmanagerService } from './pathmanager.service';
//import { PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'angular-fabric';

 // nodes:number[];

//  canvasWidth: number;

  constructor(private pathManager : PathmanagerService) { }


  ngOnInit() {

    this.pathManager.nextId = 1;

    //this.nodes = [1,2,3];
  //  this.nodes = [1];

/*    this.canvasWidth = 500;

    this.pathManager.canvas = new fabric.Canvas('myCanvas');

    this.pathManager.canvas.hoverCursor = 'pointer';
    */

   this.pathManager.canvas = new fabric.Canvas('myCanvas');

   this.pathManager.canvas.hoverCursor = 'pointer';

   this.pathManager.canvas.on('mouse:over', (e) => {
  });


  this.pathManager.canvas.on('mouse:move', (e) => {

    this.pathManager.updateCurrentMouse(e);
    
  });

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

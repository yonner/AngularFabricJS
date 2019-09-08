import {LocationModel} from './Location-Model';

export class PathModel {
    toLocation : LocationModel;
    fromLocation : LocationModel;
    //toLocation : number;
    //fromLocation : number;
    hazard : string;
    dir: number;
}

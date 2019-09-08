
import {PathModel} from './path-Model';
import {LocationPosition} from './locationPosition-Model';


export class LocationModel {
    
    public paths : PathModel[];

    public location: LocationPosition;

    public fromLocation: LocationModel;

    public id: string;
}
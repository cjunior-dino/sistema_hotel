import {ModelBase} from './model-base';

export class Room extends ModelBase{
    //TypeRoom?: number; verificar a necessidade de ser incluido ou não esse Choice e o tipo do mesmo
    daily_rate?: number;
    capacity?: number;
    type_room?: number
    description?: String
}


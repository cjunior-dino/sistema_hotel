
import {ModelBase} from './model-base';
import {Position} from './position';

export class Employee extends ModelBase {

//user?: number; verificar a inclusão ou não desse item de autenticação e o tipo do mesmo
salary?: number;
level?: number;
position?: number | string | Position;
}

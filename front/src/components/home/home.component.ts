import {Component, EventEmitter} from '@angular/core';
import {Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

class Pessoa {
    photo: string;
    name?: string;
    age?: number;
    occupation?: string;
}

@Component({
    selector: 'app-home',
    imports: [
        FormsModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true
})
export class HomeComponent {
    //@imput() public title: string = '';
    //@imput() public titleChange: EventEmitter<string> = new EventEmitter<string>();
    public pessoa: Pessoa = {
        photo: 'https://img.freepik.com/fotos-premium/melhor-foto-aleatoria_865967-88889.jpg',
    }
    public listHobbies: string[] = ['Programar', 'Ler', 'Correr', 'Jogar futebol', 'Estudar']

   // public changeTitle(): void {
    //    this.titleChange.emit(this.pessoa.name);
   // }
   // public deleteHobbies() {
    //    this.listHobbies.pop();
   // }


}

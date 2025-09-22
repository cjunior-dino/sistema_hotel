import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {NgClass} from '@angular/common';

interface Menu {
    title: string;
    route: string;
    isCurrent?: boolean;
}

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MatButton, NgClass],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone:true
})
export class AppComponent {
    public menuList: Menu[] = [
        {title:'Usuários', route:'/users', isCurrent:false},
        {title:'Reservas', route:'/reservation', isCurrent:false},
        {title:'Quartos', route:'/room', isCurrent:false},
        {title:'Serviços', route:'/service', isCurrent:false},
        {title:'Funcionários', route:'/employee', isCurrent:false},
        {title:'Cargos', route:'/position', isCurrent:false},
        {title:'Check-in', route:'/check', isCurrent:false},
        {title:'Pagamentos', route:'/payment', isCurrent:false},
        {title:'Metodos de pagamentos', route:'/payment-method', isCurrent:false},


    ]

    public router: Router = new Router();
    constructor() {
        this.menuList[0].isCurrent = true;
    }

    public changeMenu(item: Menu) {
        this.menuList.forEach((menu) =>menu.isCurrent = menu.route === item.route
        );
        this.goToPage(item.route);

    }

    public goToPage(route: string) {
        this.router.navigate([route]).then();
    }

}

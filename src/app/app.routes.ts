import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProduceComponent } from './produce/produce.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "produce",
        component: ProduceComponent
    }
];

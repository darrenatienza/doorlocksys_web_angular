import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IctInventoryComponent } from './ict-inventory.component';


const routes: Routes = [
    {
        path: '',
        component: IctInventoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IctInventoryRoutingModule {}

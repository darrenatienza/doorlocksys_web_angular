import { SgPanelComponent } from '../sg-panel/sg-panel.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
    {
        path: '',
        component: SgPanelComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SgPanelRoutingModule {}

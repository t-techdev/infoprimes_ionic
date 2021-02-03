import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'broker',
        children: [
          {
            path: '',
            loadChildren: '../broker/broker.module#BrokerPageModule'
          }
        ]
      },
      {
        path: 'my-profile',
        children: [
          {
            path: '',
            loadChildren: '../my-profile/my-profile.module#MyProfilePageModule'
          }
        ]
      },
      {
        path: 'reclamation',
        children: [
          {
            path: '',
            loadChildren: '../reclamation/reclamation.module#ReclamationPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

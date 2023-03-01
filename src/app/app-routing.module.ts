import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'posts',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: '**',
    redirectTo: '/posts',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

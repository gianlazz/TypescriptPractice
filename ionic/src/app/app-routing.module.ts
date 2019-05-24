import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [TutorialGuard]
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [TutorialGuard]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'timeline', loadChildren: './timeline/timeline.module#TimelinePageModule' },
  { path: 'people', loadChildren: './people/people.module#PeoplePageModule' },
  { path: 'person', loadChildren: './person/person.module#PersonPageModule' },
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

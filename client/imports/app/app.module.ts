import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home';
import { TGenComponent } from './tgen/tgen';
//import { TodoAddComponent } from './todo-add/todo-add.component';
//import { TodoListComponent } from './todo-list/todo-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'homePage',
        component: HomeComponent
      },
      {
        path: 'tGen',
        component: TGenComponent
      },
//      {
//        path: 'todoList',
//        component: TodoListComponent
//      },
//      {
//        path: 'todoAdd',
//        component: TodoAddComponent
//      },
      // Home Page
      {
        path: '',
        redirectTo: '/homePage',
        pathMatch: 'full'
      },
      // 404 Page
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    TGenComponent,
//    TodoAddComponent,
//    TodoListComponent,
    PageNotFoundComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
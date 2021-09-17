import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { JokesComponent } from './jokes/jokes.component';
import { LibraryComponent } from './library/library.component';

const routes: Routes = [
  {path: "", redirectTo:"jokes", pathMatch: "full"},
  {path:"jokes", component: JokesComponent},
  {path:"library", component: LibraryComponent},
  {path:"add-joke", component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

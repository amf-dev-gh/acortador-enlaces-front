import { Component } from '@angular/core';
import { CreateLinkComponent } from "./create-link/create-link.component";
import { UpdateLinkComponent } from "./update-link/update-link.component";
import { ExpandLinkComponent } from "./expand-link/expand-link.component";
import { NgClass } from '@angular/common';

export type forms = 'create' | 'update' | 'expand';

@Component({
  selector: 'app-home',
  imports: [CreateLinkComponent, UpdateLinkComponent, ExpandLinkComponent, NgClass],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  protected showform: forms = 'create';

  changeForm(form: forms) {
    this.showform = form;
  }

}

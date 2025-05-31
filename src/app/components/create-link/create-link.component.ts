import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { urlValidator } from '../../validators/url-validator';
import { ApiService } from '../../services/api.service';
import { SpinnerComponent } from "../../utils/spinner/spinner.component";

@Component({
  selector: 'app-create-link',
  imports: [ReactiveFormsModule, SpinnerComponent],
  templateUrl: './create-link.component.html'
})
export class CreateLinkComponent {

  private fb: FormBuilder = inject(FormBuilder);
  protected createForm: FormGroup = this.fb.group({
    url: ['', [Validators.required, Validators.minLength(5), urlValidator]]
  });

  private apiService = inject(ApiService);

  protected generatedId: string = '1a2b3c';
  protected errorMessage: string = 'La URL ingresada ya existe en la base de datos';

  createId() {
    console.log(this.createForm.get('url')?.value)
  }

}

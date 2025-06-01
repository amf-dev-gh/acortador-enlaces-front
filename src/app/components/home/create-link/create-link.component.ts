import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { urlValidator } from '../../../validators/url-validator';
import { ApiService } from '../../../services/api.service';
import { SpinnerComponent } from "../../../utils/spinner/spinner.component";

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

  protected isloading: boolean = false;
  protected generatedId: string = '';
  protected errorMessage: string = '';

  createId() {
    if (this.createForm.invalid || this.isloading) return;
    this.isloading = true;
    this.errorMessage = '';
    this.generatedId = '';
    const url = this.createForm.get('url')?.value;
    this.apiService.createId(url).subscribe({
      next: data => {
        this.isloading = false;
        this.generatedId = data.id;
      },
      error: () => {
        this.isloading = false;
        this.errorMessage = 'Error al generar el identificador';
      }
    })
  }

}

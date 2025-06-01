import { Component, inject } from '@angular/core';
import { SpinnerComponent } from "../../../utils/spinner/spinner.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { urlValidator } from '../../../validators/url-validator';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-update-link',
  imports: [SpinnerComponent, ReactiveFormsModule],
  templateUrl: './update-link.component.html'
})
export class UpdateLinkComponent {

  private fb: FormBuilder = inject(FormBuilder);
  protected updateForm: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]],
    url: ['', [Validators.required, Validators.minLength(5), urlValidator]]
  });

  private apiService = inject(ApiService);

  protected isloading: boolean = false;
  protected updatedUrl: string = '';
  protected errorMessage: string = '';

  updateUrl() {
    if (this.updateForm.invalid || this.isloading) return;
    this.isloading = true;
    this.errorMessage = '';
    this.updatedUrl = '';
    const id = this.updateForm.get('id')?.value;
    const url = this.updateForm.get('url')?.value;

    this.apiService.updateLink(id, url).subscribe({
      next: data => {
        this.isloading = false;
        this.updatedUrl = data.url;
      },
      error: error => {
        this.isloading = false;
        console.error(error.status === 404)

        if (error.status === 404) {
          this.errorMessage = `No existe el ID: ${id}`;
          return;
        }

        if (error.status === 409) {
          this.errorMessage = 'La URL ya existe en la base de datos';
          return;
        }

        this.errorMessage = 'Error en el servidor';
      }
    })
  }


}

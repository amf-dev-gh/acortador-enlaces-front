import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { SpinnerComponent } from "../../../utils/spinner/spinner.component";

@Component({
  selector: 'app-expand-link',
  imports: [SpinnerComponent, ReactiveFormsModule],
  templateUrl: './expand-link.component.html'
})
export class ExpandLinkComponent {

  private fb: FormBuilder = inject(FormBuilder);
  protected getUrlForm: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]]
  });

  private apiService = inject(ApiService);

  protected isloading: boolean = false;
  protected fetchedUrl: string = '';
  protected errorMessage: string = '';

  getUrl() {
    if (this.getUrlForm.invalid || this.isloading) return;
    this.isloading = true;
    this.errorMessage = '';
    this.fetchedUrl = '';
    const id = this.getUrlForm.get('id')?.value;
    this.apiService.getUrlById(id).subscribe({
      next: data => {
        this.isloading = false;
        this.fetchedUrl = data.url;
      },
      error: () => {
        this.isloading = false;
        this.errorMessage = `No existe el ID: ${id}`;
      }
    })
  }

}

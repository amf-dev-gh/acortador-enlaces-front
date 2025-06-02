import { Component, inject, input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-redirect',
  imports: [],
  templateUrl: './redirect.component.html'
})
export class RedirectComponent implements OnInit {

  protected linkId = input<string>('');
  private apiService = inject(ApiService);

  protected notFoundError: boolean = false;
  protected serverError: boolean = false;
  protected invalidId: boolean = false;

  protected fetchedUrl: string = '';

  ngOnInit(): void {
    const id = this.linkId();

    if (this.isValidId(id)) {
      this.getUrl(id);
    } else {
      this.invalidId = true;
    }
  }

  private isValidId(id: string) {
    return id.length === 6 && /^[a-zA-Z0-9]+$/.test(id);
  }

  private getUrl(id: string) {
    this.apiService.getUrlById(id).subscribe({
      next: data => {
        this.fetchedUrl = data.url;
        window.location.href = data.url;
      },
      error: error => {
        if(error.status === 404){
          this.notFoundError = true;
        } else {
          this.serverError = true;
        }
      }
    });
  }

}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'https://acortador-enlaces-back.onrender.com';
  private http = inject(HttpClient);

  constructor() {
    this.upService().subscribe({
      next: data => console.log(data.message),
      error: error => console.error(error)
    })
  }

  upService(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/test`)
  }

  createId(url: string): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.apiUrl}`, { url })
  }

  getUrlById(id: string): Observable<{ id: string, url: string }> {
    return this.http.get<{ id: string, url: string }>(`${this.apiUrl}/${id}`)
  }

  updateLink(id: string, url: string): Observable<{ id: string, url: string }> {
    return this.http.put<{ id: string, url: string }>(`${this.apiUrl}/${id}`, { url })
  }

}

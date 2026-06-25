import { inject, Service, signal } from '@angular/core';
import { Loader } from '../models/loader';
import { LoaderDefect } from '../models/loader-defect';
import { toObservable } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Service()
export class LoadersService {
  http = inject(HttpClient);
  loaders = signal<Loader[]>([]);
  loadersDefects = signal<LoaderDefect[]>([]);
  loaders$ = toObservable(this.loaders);

  getAllLoaders() {
    this.http.get<Loader[]>('/api/Loaders').subscribe((result) => {
      this.loaders.set(result);
    });
  }

  addLoader(body: any) {
    return this.http.post<Loader>('/api/Loaders', body).pipe(
      tap((result) => {
        this.loaders.update((oldArray) => [...oldArray, result]);
      }),
    );
  }

  editLoader(body: any): Observable<Loader> {
    return this.http.put<Loader>('/api/Loaders', body).pipe(
      tap((result) => {
        this.loaders.update((items) => items.map((item) => (item.id === result.id ? { ...result } : item)));
      }),
    );
  }

  deleteLoader(id: number) {
    return this.http.delete('api/Loaders', { body: id }).pipe(
      tap((_) => {
        this.loaders.update((items) => items.filter((item) => item.id !== id));
      }),
    );
  }

  getLoaderDefect(id: number) {
    this.http.get<LoaderDefect[]>(`/api/Loaders/GetChoosenLoaderDefects?loaderId=${id}`).subscribe((result) => {
      this.loadersDefects.set(result);
    });
  }

  addDefect(body: any) {
    return this.http.post<LoaderDefect>('/api/Loaders/addDefect', body).pipe(
      tap((result) => {
        this.loadersDefects.update((oldArray) => [...oldArray, result]);
      }),
    );
  }

  editDefect(body: any): Observable<LoaderDefect> {
    return this.http.put<LoaderDefect>('/api/Loaders/editDefect', body).pipe(
      tap((result) => {
        this.loadersDefects.update((items) => items.map((item) => (item.id === result.id ? { ...result } : item)));
      }),
    );
  }

  deleteDefect(id: number) {
    return this.http.delete('api/Loaders/deleteDefect', { body: id }).pipe(
      tap((_) => {
        this.loadersDefects.update((items) => items.filter((item) => item.id !== id));
      }),
    );
  }
}

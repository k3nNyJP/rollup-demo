import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap, share, map, startWith } from 'rxjs/operators';
import * as moment from 'moment';
import { gte } from 'semver';

export interface Version {
  version: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private server: string;

  constructor(private http: HttpClient) { }

  subscribeVersion(): Observable<Version> {
    return interval(1000).pipe(
      startWith(0),
      switchMap(() => this.http.get<any>(this.server)),
      map((data) => ({ version: data.version, timestamp: moment(data.timestamp).toLocaleString() })),
      share(),
    );
  }

  setServer(host: string, port: number) {
    this.server = `http://${host}:${port}`;
  }

  isAngular(): Observable<boolean> {
    return this.subscribeVersion().pipe(
      map((ver) => gte(ver.version, '2.0.0')),
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, interval } from 'rxjs';
import { switchMap, share, map, startWith, filter } from "rxjs/operators";
import * as moment from "moment";

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
    return interval(5000).pipe(
      startWith(0),
      switchMap(() => this.http.get<any>(this.server)),
      map((data) => ({ version: data.version, timestamp: moment(data.timestamp).toLocaleString() })),
      share(),
    );
  }

  setServer(host: string, port: number) {
    this.server = `http://${host}:${port}`;
  }
}

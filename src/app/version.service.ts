import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, interval } from 'rxjs';
import { switchMap, share, map } from "rxjs/operators";
import * as moment from "moment";

export interface Version {
  version: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient) { }

  subscribeVersion(): Observable<Version> {
    return interval(5000).pipe(
      switchMap(() => this.http.get<any>("http://localhost:8080/api/version")),
      map((data) => ({ version: data.version, timestamp: moment(data.timestamp).toLocaleString() })),
      share(),
    );
  }
}

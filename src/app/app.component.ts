import { Component } from '@angular/core';
import { VersionService, Version } from './version.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'rollup-demo';
  public version: Observable<Version>;
  public isAngular: Observable<boolean> = of(false);
  public host: string;
  public port: number;

  constructor(public versionService: VersionService) { }

  public configureServer() {
    this.versionService.setServer(this.host, this.port);
    this.version = this.versionService.subscribeVersion();
    this.isAngular = this.versionService.isAngular();
  }
}

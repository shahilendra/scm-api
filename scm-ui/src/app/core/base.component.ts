import { Component, ReflectiveInjector, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Packet } from 'mqtt';
import  { AuthService } from './auth.service';

@Component({
  template: ''
})

export class BaseComponent implements OnInit {
	public messages: Observable<Packet>;
  public mq: Array<string> = [];
  public onlineDevices = {};

  constructor(
    public authService: AuthService
  ) {
 }

	ngOnInit() {
	}
}
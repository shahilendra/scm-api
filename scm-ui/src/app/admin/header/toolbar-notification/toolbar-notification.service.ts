import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ToolbarNotificationModel } from './toolbar-notification.model';

@Injectable()
export class ToolbarNotificationService {

  notifications: ToolbarNotificationModel[];

  constructor(private http: Http) {
    this.notifications = [
      {
        id: 'id',
        title: 'Plan to upgrade to angular 5',
        lastTime: '23 Minutes ago',
        state: 'state'
      },
      {
        id: 'id',
        title: '0.4.5 Version update record',
        lastTime: '23 Minutes ago',
        state: 'state'
      },
      {
        id: 'id',
        title: 'Optimize project structure',
        lastTime: '23 Minutes ago',
        state: 'state'
      },
      {
        id: 'id',
        title: 'Add the base framework branch',
        lastTime: '23 Minutes ago',
        state: 'state'
      },
      {
        id: 'id',
        title: 'Framework to complete the construction',
        lastTime: '23 Minutes ago',
        state: 'state'
      }

    ];
  }

  select() {
    return this.notifications;
  }

  delete(notification) {

  }

  update() {

  }

}

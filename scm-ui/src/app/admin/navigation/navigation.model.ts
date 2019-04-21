export class NavigationModel {

  public model: any[];

  constructor(menus: any[]) {
    if(menus) {
      this.model = menus;
    } else {
      this.model = [
        {
          'id': 'home',
          'title': 'Home',
          'type': 'item',
          'icon': 'home',
          'url': '/home'
        }, {
          'id': 'users',
          'title': 'Users',
          'type': 'item',
          'icon': 'supervisor_account',
          'url': '/pages/users'
        }, {
          'id': 'players',
          'title': 'Players',
          'type': 'item',
          'icon': 'featured_play_list',
          'url': '/pages/players'
        }, {
          'id': 'games',
          'title': 'Games',
          'type': 'item',
          'icon': 'games',
          'url': '/pages/games'
        }, {
          'id': 'rooms',
          'title': 'Rooms',
          'type': 'item',
          'icon': 'room',
          'url': '/pages/rooms'
        }, {
          'id': 'devices',
          'title': 'Devices',
          'type': 'item',
          'icon': 'devices',
          'url': '/pages/devices'
        }, {
          'id': 'profile',
          'title': 'Profile',
          'type': 'item',
          'icon': 'account_circle',
          'url': '/pages/profile'
        },{
          'id': 'sessions',
          'title': 'Sessions',
          'type': 'item',
          'icon': 'games',
          'url': '/pages/sessions'
        }, {
          'id': 'mqtt',
          'title': 'MQTT Devices',
          'type': 'item',
          'icon': 'devices',
          'url': '/mqtt/device-notifications'
        }, {
          'id': 'questions',
          'title': 'Questions',
          'type': 'item',
          'icon': 'questions',
          'url': '/pages/questions'
        }
        // , {
        //   'id': 'feedback',
        //   'title': 'Feedback',
        //   'type': 'item',
        //   'icon': 'feedback',
        //   'url': '/pages/feedback'
        // }
      ];
    }
   
  }

}

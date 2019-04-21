import {Component, OnInit} from '@angular/core';
import { config } from '../../core/config';
import { AuthService } from '../../core/auth.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  orginization: any;
  constructor(private auth: AuthService) {
  }
  ngOnInit() {
    this.orginization = this.auth.getOrginization;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  orginization: any;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.orginization = this.auth.getOrginization;
  }

}

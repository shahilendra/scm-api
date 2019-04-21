/**
 * @author Shailendra Tiwari <https://github.com/shahilendra>
 */

import { Component, OnInit, Input, Inject, HostBinding, ViewEncapsulation } from '@angular/core';
import { SidenavItem } from './item.model';

@Component({
  selector: 'sidenav-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {

  @Input() item: SidenavItem;

  @HostBinding('class.open')
  get isOpen() {
    return this.service.isOpen(this.item);
  }

  constructor(@Inject('sidenavService') private service) {
  }

  ngOnInit() {
  }

  /**
   *  Menu expand switch
   */
  toggleDropdown(): void {
    if (this.item.hasSubItems()) {
      this.service.toggleCurrentlyOpen(this.item);
    }
  }

  /**
   * Get submenu height
   * @returns {string}
   */
  getSubItemsHeight() {
    if (this.item.hasSubItems()) {
      return (this.getOpenSubItemsCount(this.item) * 56) + 'px';
    }
  }

  /**
   * Calculate submenu height
   * @param item {SidenavItem} Menu Item
   * @returns {number} The total number of submenus
   */
  getOpenSubItemsCount(item: SidenavItem): number {
    let count = 0;
    if (item.hasSubItems() && this.service.isOpen(item)) {
      count += item.subItems.length;
      item.subItems.forEach((subItem) => {
        count += this.getOpenSubItemsCount(subItem);
      });
    }
    return count;
  }
}

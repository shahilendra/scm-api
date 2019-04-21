import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'sheelu-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data = [];
  // Table column configuration description
  @Input() columns = [];
  // Whether to display interval zebra pattern
  @Input() stripe: boolean = false;
  // Whether to display the vertical border
  @Input() border: boolean = false;
  // Whether to display the header
  @Input() showHeader: boolean = true;
  // Form width, in px
  @Input() width: string | number;
  // Table height, the unit px, set, if the form is greater than this value, the fixed header
  @Input() height: string | number;
  // Highlight when mouseover is disabled
  @Input() disabledHover: boolean = true;
  // Whether to support the highlight of the selected line, that radio
  @Input() highlightRow: boolean = false;
  @Input() tableSize: string = 'default';

  @Output() onCurrentChange = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onSelectCancel = new EventEmitter();
  @Output() onSelectAll = new EventEmitter();
  @Output() onSelectChange = new EventEmitter();
  @Output() onSortChange = new EventEmitter();
  @Output() onRowClick = new EventEmitter();

  cloneColumns;

  checkboxSelection = [];
  checked: boolean = false;

  @ViewChild('fixedTopCell') _fixedTopCell: ElementRef;
  private cells = [];

  constructor(private element: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.height) return;
    const ths = this._fixedTopCell.nativeElement.children[0].children;

    setTimeout(() => {
      for (const th of ths) {
        this.cells.push({
          width: th.offsetWidth,
          height: th.offsetHeight
        });
      }
      this.border = true;
    });
  }

  fixedRightTableStyle() {
    let style = {};
    let width = 0;
    let rightFixedColumns = this.rightFixedColumns();
    rightFixedColumns.forEach((col) => {
      if (col.fixed && col.fixed === 'right') width += col._width;
    });
    // width += this.scrollBarWidth;
    return {
      width: `${width}px`
    };
  }

  leftFixedColumns() {
    let left = [];
    let other = [];
    this.cloneColumns.forEach((col) => {
      if (col.fixed && col.fixed === 'left') {
        left.push(col);
      } else {
        other.push(col);
      }
    });
    return left;
  }

  rightFixedColumns() {
    let right = [];
    let other = [];
    this.cloneColumns.forEach((col) => {
      if (col.fixed && col.fixed === 'right') {
        right.push(col);
      } else {
        other.push(col);
      }
    });
    return right;
  }

  isLeftFixed() {
    return this.columns.some(col => col.fixed && col.fixed === 'left');
  }

  isRightFixed() {
    return this.columns.some(col => col.fixed && col.fixed === 'right');
  }

  onRowClickTrigger(row) {
    this.onRowClick.emit(row);
  }

  onCheckBoxTrigger($event, row) {
    if ($event.checked) {
      this.checkboxSelection.push(row);
    } else {
      this.checkboxSelection = this.checkboxSelection.filter((source) => source !== row);
    }
    this.onSelectChange.emit(this.checkboxSelection);
  }

  onCheckBoxAllTrigger($event) {
    if ($event.checked) {
      this.checkboxSelection = this.data;
    } else {
      this.checkboxSelection = [];
    }

    this.onSelectAll.emit(this.checkboxSelection);
  }
}

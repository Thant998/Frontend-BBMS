
import {
  Component,
  Input,
  forwardRef,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { Injectable } from "@angular/core";
import { Location } from '@angular/common';
import { SharedService } from "../shared.service";

@Injectable({
  providedIn: "root"
})
@Component({
  selector: 'app-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchDropdownComponent),
      multi: true
    }
  ]
})
export class SearchDropdownComponent implements ControlValueAccessor {

  routeLink : any;
  list = [];
  temp_list = [];
  keyword : any;
  _label: any;
  _uid: any;
  @Output() afterChange = new EventEmitter();
  @ViewChild("input", { static: false })
  input!: ElementRef;
  @Input("items") set items(value: any) {
    this.list = value;
    this.temp_list = value;
  }
  @Input("label") label: any;
  @Input("activeSearch") activeSearch: boolean = true;
  @Input("title") title : any;
  onChange: any = () => { };
  onTouch: any = () => { };
  value: any;
  shown = false;

  constructor(private ele: ElementRef,private _shared : SharedService,private cdf: ChangeDetectorRef,private location: Location) {
  
   }

  ngOnInit(): void {
   
  }


  ngAfterContentChecked() {
    this.routeLink = this.location.path();
  }
 
  ngOnChanges() {
    this.value = this.title;
    this._label = (typeof this.label !== 'undefined' && this.label !== '') ? this.label : 'name';
  }
  writeValue(value: any) {
    if (value) {
      this.temp_list.map(x => {
        if (x[this._uid] == value) {
          this.value = x[this._label];
        }
      })
    }
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
  search(e : any) {
    const val = e.toLowerCase();
    const temp = this.temp_list.filter((x : any)  => {
      if (String(x[this._label]).toLowerCase().indexOf(val) !== -1 || !val) {
        return x;
      }
    });
    this.list = temp;
  }
  select(item: any) {
    this.onChange(item[this._label]);
    this.value = item[this._label];
    this.shown = false;
    this.afterChange.emit(item);
  }
  show() {
    this.keyword = "";
    this.search('');
    this.shown = this.shown ? false : true;
    // setTimeout(() => {
    //   this.input.nativeElement.focus();
    // }, 200);
  }
  @HostListener("document:click", ["$event"]) onClick(e : any) {
    if (!this.ele.nativeElement.contains(e.target)) {
      this.shown = false;
    }
  }

}

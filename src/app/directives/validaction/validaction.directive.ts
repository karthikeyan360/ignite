import { Directive, HostListener } from '@angular/core';
import * as _ from "lodash";

@Directive({
  selector: '[appValidaction]'
})
export class ValidactionDirective {
  getCharCode(e: KeyboardEvent) {
    return e.charCode || e.keyCode || e.which;
  };
}

@Directive({
  selector: '[appTwoDecimalOnly]'
})
export class TwoDecimalOnlyDirective extends ValidactionDirective {

  @HostListener('keydown', ['$event']) TwoDecmile($event: any) {
    console.log("$event: any", this.getCharCode($event) )
    if (this.getCharCode($event) !== 8 && this.getCharCode($event) !== 9 && this.getCharCode($event) !== 37) {
      if ($event.shiftKey == true && _.indexOf([49, 50, 51, 52, 53, 55, 57, 173, 222], this.getCharCode($event), 0) != -1)
        $event.preventDefault();
      else if ($event.shiftKey == false && _.indexOf([173, 222], this.getCharCode($event), 0) != -1)
        $event.preventDefault();


      // let dotlength = $event.target.value.indexOf('.');
      if ($event.target.value.indexOf('.') !== -1) {
        // let length = $event.target.value.length;
        if ($event.key === '.') {
          $event.preventDefault();
        }
        if ((($event.target.value.indexOf('.')) + 3) === $event.target.value.length) {
          $event.preventDefault();
        }

      }
    }
  }
}
@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective extends ValidactionDirective {

  @HostListener('keydown', ['$event']) keypress($event: any) {
    if (this.getCharCode($event) !== 8) {
      if ($event.key === '-') {
        $event.preventDefault();
      }
    }
  }
}
@Directive({
  selector: '[appPasteNotAllowed]'
})
export class PasteNotAllowedDirective extends ValidactionDirective {

  @HostListener('keydown', ['$event']) keypress($event: any) {
    if (this.getCharCode($event) !== 86 && $event.ctrlKey === true) {
      $event.preventDefault();
    }
  }
}
@Directive({
  selector: '[appValueZeroRmove]'
})
export class RemoveZeroValueDirective extends ValidactionDirective {
  @HostListener('focus', ['$event']) focus($event: any) {
    // console.log("event", $event.target.value)
    if (+($event.target.value) == 0) {
      $event.target.value = "";
    }


  }
}
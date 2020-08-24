import { Pipe, PipeTransform } from "@angular/core";
import { format, parseISO } from "date-fns";

/* tslint:disable */
@Pipe({
  name: "formatTime",
  pure: false,
})
export class FormatTime implements PipeTransform {
  transform(value: any, args?) {
    return format(parseISO(value), args || "d.MM.Y");
  }
}
/* tslint:enable */

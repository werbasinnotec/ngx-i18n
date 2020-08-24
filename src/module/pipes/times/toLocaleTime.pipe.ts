import { Pipe, PipeTransform } from "@angular/core";
import { formatRelative, parseISO } from "date-fns";
import { de, enGB, es, fr, it } from "date-fns/locale";

/* tslint:disable */
@Pipe({
  name: "toLocaleTime",
  pure: false,
})
export class ToLocaleTime implements PipeTransform {
  constructor() {}

  private getLocale() {
    const lang = document.documentElement.lang.substr(0, 2);
    console.log(lang);

    switch (lang.toLowerCase()) {
      case "en":
        return enGB;
      case "de":
        return de;
      case "es":
        return es;
      case "it":
        return it;
      case "fr":
        return fr;

      default:
        return enGB;
    }
  }

  transform(value: any, args?: string) {
    return formatRelative(parseISO(value), new Date(), {
      locale: this.getLocale(),
    });
  }
}
/* tslint:enable */

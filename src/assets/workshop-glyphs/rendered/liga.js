/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
    'use strict';
    function supportsProperty(p) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            i,
            div = document.createElement('div'),
            ret = p in div.style;
        if (!ret) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (i = 0; i < prefixes.length; i += 1) {
                ret = prefixes[i] + p in div.style;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    var icons;
    if (!supportsProperty('fontFeatureSettings')) {
        icons = {
            'license-plate-recognition': '&#xe98d;',
            'license-plate-scan': '&#xe98d;',
            'devices': '&#xe93e;',
            'minus-one': '&#xe914;',
            'plus-one': '&#xe915;',
            'wastebin': '&#xe953;',
            'trash': '&#xe953;',
            'shop': '&#xe919;',
            'Innotec-icon': '&#xe901;',
            'version-tag': '&#xe902;',
            'license-plate-sticker': '&#xe90d;',
            'asc': '&#xe903;',
            'desc': '&#xe904;',
            'undo': '&#xe9101;',
            'undo-edit': '&#xe9101;',
            'cancel': '&#xe9101;',
            'home': '&#xe907;',
            'menu-burger': '&#xe94d;',
            'sign-out': '&#xe1977;',
            'settings': '&#xe1976;',
            'search': '&#xe1975;',
            'remember-pin': '&#xe1970;',
            'remember-pin-active': '&#xe1971;',
            'funnel-empty': '&#xe1946;',
            'no-filter': '&#xe1946;',
            'funnel-half': '&#xe1948;',
            'filter-half': '&#xe1948;',
            'funnel': '&#xe1947;',
            'filter': '&#xe1947;',
            'collapse': '&#xe1934;',
            'dropzone': '&#xe1938;',
            ':-)': '&#x1f603;',
            'emoticon-happy': '&#x1f603;',
            ':-|': '&#x1f610;',
            'emoticon-neutral': '&#x1f610;',
            ':-(': '&#x1f61e;',
            'emoticon-sad': '&#x1f61e;',
            'customer': '&#xe1936;',
            'calendar': '&#xe1907;',
            'hyperlink': '&#xe951;',
            'address': '&#x1e900;',
            'email': '&#xe939;',
            'phone': '&#xe196f;',
            'handset': '&#xe196f;',
            'smartphone': '&#xe978;',
            'cellular-phone': '&#xe978;',
            'mobile-phone': '&#xe978;',
            'sms': '&#xe979;',
            'short-message': '&#xe979;',
            'fax': '&#xe1940;',
            'file-document': '&#xe1942;',
            'document': '&#xe1942;',
            'file-add-document': '&#xe1941;',
            'add-document': '&#xe1941;',
            'add-file': '&#xe1941;',
            'pen-on-paper-edit': '&#xe196c;',
            'edit': '&#xe196c;',
            'invoice': '&#xe1984;',
            'bill': '&#xe1984;',
            'file-picture': '&#xe1944;',
            'picture': '&#xe1944;',
            'image': '&#xe1944;',
            'file-pdf': '&#xe993;',
            'pdf': '&#xe993;',
            'document-folder': '&#xe90b;',
            'archive': '&#xe1943;',
            'archive-folders': '&#xe1943;',
            'creditcards': '&#xe935;',
            'payment-cash': '&#xe9100;',
            'cash-only': '&#xe9100;',
            'cash-payment': '&#xe9100;',
            'cash': '&#xe9100;',
            'history-clock': '&#xe194f;',
            'history': '&#xe194f;',
            'cancelled': '&#xe1908;',
            'open': '&#xe962;',
            'paid': '&#xe963;',
            'patch': '&#xe1964;',
            'patch+': '&#xe1965;',
            'goods-receiption': '&#xe194b;',
            'goods-receipt': '&#xe194b;',
            'warehouse-goods-receipt': '&#xe910;',
            'warehouse': '&#xe911;',
            'warehouse-shelf': '&#xe912;',
            'archive-man-beside-drawer': '&#xe1902;',
            'archivist': '&#xe1902;',
            'warehouse-picking': '&#xe990;',
            'barcode-scanner': '&#xe1904;',
            'person': '&#xe196d;',
            'personal-time-recording': '&#xe196e;',
            'time-recording': '&#xe196e;',
            'special-char-checkmark': '&#xe97c;',
            'special-char-minus': '&#xe97d;',
            'special-char-plus': '&#xe97e;',
            'special-char-questionmark': '&#xe97f;',
            'special-char-x-remove': '&#xe980;',
            'lineitems': '&#xe95d;',
            'checklist': '&#xe93d;',
            'checklist-large': '&#xe95a;',
            'flag': '&#xe1945;',
            'dashboard': '&#xe1937;',
            'statistics': '&#xe981;',
            'time-start': '&#xe987;',
            'start-time': '&#xe987;',
            'begin': '&#xe987;',
            'start': '&#xe987;',
            'time-duration': '&#xe985;',
            'duration': '&#xe985;',
            'time-end': '&#xe986;',
            'end-time': '&#xe986;',
            'end': '&#xe986;',
            'labour': '&#xe95c;',
            'work': '&#xe95c;',
            'workorder': '&#xe1901;',
            'sparkplug': '&#xe97b;',
            'part': '&#xe97b;',
            'parts': '&#xe97b;',
            'article': '&#xe97b;',
            'varnish': '&#xe98f;',
            'paint': '&#xe98f;',
            'carwash': '&#xe190a;',
            'booster-cable': '&#xe1905;',
            'electrics': '&#xe1905;',
            'gas-station': '&#xe1900;',
            'gas-piston': '&#xe1949;',
            'gas': '&#xe1949;',
            'diesel': '&#xe1949;',
            'oil-can': '&#xe964;',
            'oil': '&#xe964;',
            'truck': '&#xe98b;',
            'car': '&#xe1909;',
            'vehicle': '&#xe1909;',
            'hazard-triangle': '&#xe194e;',
            'warning': '&#xe194e;',
            'wheelsandaxles': '&#xe991;',
            'undercarriage': '&#xe991;',
            'axle': '&#xe1903;',
            'tire': '&#xe988;',
            'truck-wheel': '&#xe98c;',
            'wheel': '&#xe98c;',
            'rim': '&#xe974;',
            'snowflake': '&#xe97a;',
            'winter': '&#xe97a;',
            'sun-empty': '&#xe984;',
            'sun': '&#xe983;',
            'summer': '&#xe983;',
            'm+w-tires': '&#xe965;',
            'winter-wheel': '&#xe992;',
            'm+s-wheel': '&#xe976;',
            'summer-wheel': '&#xe982;',
            'tire-pressure': '&#xe989;',
            'tire-pressure-alert': '&#xe989;',
            'tire-pressure-2': '&#xe98a;',
            'tire-pressure-check': '&#xe98a;',
            'ungroup': '&#xe98e;',
            'bug': '&#xe1906;',
            'error': '&#xe1906;',
          '0': 0
        };
        delete icons['0'];
        window.icomoonLiga = function (els) {
            var classes,
                el,
                i,
                innerHTML,
                key;
            els = els || document.getElementsByTagName('*');
            if (!els.length) {
                els = [els];
            }
            for (i = 0; ; i += 1) {
                el = els[i];
                if (!el) {
                    break;
                }
                classes = el.className;
                if (/icon-/.test(classes)) {
                    innerHTML = el.innerHTML;
                    if (innerHTML && innerHTML.length > 1) {
                        for (key in icons) {
                            if (icons.hasOwnProperty(key)) {
                                innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
                            }
                        }
                        el.innerHTML = innerHTML;
                    }
                }
            }
        };
        window.icomoonLiga();
    }
}());

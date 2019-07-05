"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var getting_started_1 = require("./components/getting-started/getting-started");
exports.routes = [
    {
        path: '',
        data: ['Getting Started'],
        component: getting_started_1.GettingStartedSectionComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routing.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardRoles = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["USER"] = "User";
    Roles["ADMIN"] = "Admin";
})(Roles = exports.Roles || (exports.Roles = {}));
var GuardRoles;
(function (GuardRoles) {
    GuardRoles["ADMIN"] = "Admin";
    GuardRoles["STUDENT"] = "Student";
    GuardRoles["TEACHER"] = "Teacher";
    GuardRoles["INSTITUTION_ADMIN"] = "Institution admin";
})(GuardRoles = exports.GuardRoles || (exports.GuardRoles = {}));

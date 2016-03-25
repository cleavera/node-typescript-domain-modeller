"use strict";
function PrimaryKey(field) {
    'use strict';
    return function (target) {
        if (!target._meta) {
            target._meta = {};
        }
        target._meta.primaryKey = field;
    };
}
exports.PrimaryKey = PrimaryKey;

export function PrimaryKey(field: string): ClassDecorator {
    'use strict';

    return function(target: any): void {
        if (!target._meta) {
            target._meta = {};
        }

        target._meta.primaryKey = field;
    };
}

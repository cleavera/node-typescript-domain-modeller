import {DecorateField} from '../packages/Helpers';

export function Description(description: string): any {
    'use strict';

    return function(target: any, key?: string): void {
        if (!key) {
            target.description = description;

            return;
        }

        DecorateField.addDescriptor(target, key, 'description', description);
    };
}

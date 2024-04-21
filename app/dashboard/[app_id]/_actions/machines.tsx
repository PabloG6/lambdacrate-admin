'use server';

import { setTimeout } from "timers/promises";




export async function getMachines(app_id: string) {
        const results: any[] = [
            {
                id: '65fis49kd04kf',
                name: 'some-app-somewhere-id',
                status: 'Active',
                size: 'shared-cpu-1x@1024GB',
                created_at: new Date(),
                type: 'web',
            }
,
            {
                id: '5848fjd03cfkf',
                name: 'some-app-somewhere-id',
                status: 'Active',
                size: 'shared-cpu-1x@1024GB',
                created_at: new Date(),
                type: 'dev',
            },
            {
                id: 'tirgkalckfg',
                name: 'some-app-database-id',
                status: 'Active',
                size: 'shared-cpu-1x@1024GB',
                created_at: new Date(),
                type: 'database',
            },

            {
                id: '488fjdfcjfk',
                name: 'some-app-somewhere-id',
                status: 'Active',
                size: 'shared-cpu-1x@1024GB',
                created_at: new Date(),
                type: 'api',
            }
        ]

        return results;
}
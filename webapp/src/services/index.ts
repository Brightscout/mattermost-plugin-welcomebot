import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import Cookies from 'js-cookie';
import {UserProfile} from 'mattermost-redux/types/users';

import Utils from 'utils';

import Constants from 'pluginConstants';

// Service to make plugin API requests
export const examplePluginApi = createApi({
    reducerPath: 'examplePluginApi',
    baseQuery: fetchBaseQuery({
        baseUrl: Utils.getBaseUrls().pluginApiBaseUrl,
        prepareHeaders: (headers) => {
            headers.set(Constants.common.HEADER_CSRF_TOKEN, Cookies.get(Constants.common.MMCSRF) ?? '');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        [Constants.pluginApiServiceConfigs.getMe.apiServiceName]: builder.query<UserProfile, void>({
            query: () => ({
                url: Constants.pluginApiServiceConfigs.getMe.path,
                method: Constants.pluginApiServiceConfigs.getMe.method,
            }),
        }),
    }),
});

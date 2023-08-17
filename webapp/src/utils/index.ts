import {id} from 'manifest';

const getBaseUrls = (mmSiteUrl: string): {pluginApiBaseUrl: string; mattermostApiBaseUrl: string} => {
    const pluginUrl = `${mmSiteUrl}/plugins/${id}`;
    const pluginApiBaseUrl = `${pluginUrl}/api/v1`;
    const mattermostApiBaseUrl = `${mmSiteUrl}/api/v4`;

    return {pluginApiBaseUrl, mattermostApiBaseUrl};
};

export default {
    getBaseUrls,
};

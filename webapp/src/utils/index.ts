import Cookies from 'js-cookie';

import {plugins, apiVersion1, apiVersion4, bearer, mmAuthToken} from 'constants/apiConstants';

import {id} from 'manifest';

const getBaseUrls = (mmSiteUrl: string): {pluginApiBaseUrl: string; mattermostApiBaseUrl: string} => {
<<<<<<< HEAD
    const pluginUrl = `${mmSiteUrl}${plugins}/${id}`;
    const pluginApiBaseUrl = `${pluginUrl}${apiVersion1}`;
    const mattermostApiBaseUrl = `${mmSiteUrl}${apiVersion4}`;
=======
    const pluginUrl = `${mmSiteUrl}/plugins/${id}`;
    const pluginApiBaseUrl = `${pluginUrl}/api/v1`;
    const mattermostApiBaseUrl = `${mmSiteUrl}/api/v4`;
>>>>>>> 626988b5f77479f50650f4cbe10aada0a7e443a4

    return {pluginApiBaseUrl, mattermostApiBaseUrl};
};

const getAuthToken = () => {
    const authToken = bearer + Cookies.get(`${mmAuthToken}`) || '';
    return authToken;
};

export default {
    getBaseUrls,
    getAuthToken,
};

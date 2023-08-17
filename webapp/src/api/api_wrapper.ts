import Cookies from 'js-cookie';

import Utils from 'utils';

export const fetchChannels = async (mmSiteUrl: string) => {
    const authToken = 'Bearer ' + Cookies.get('MMAUTHTOKEN') || '';
    const url = Utils.getBaseUrls(mmSiteUrl).mattermostApiBaseUrl + '/channels?exclude_default_channels=true';
    const response = await fetch(url, {
        method: 'GET',
        headers: {Authentication: authToken},
    });
    return response.json();
};

export const fetchTeams = async (mmSiteUrl: string) => {
    const authToken = 'Bearer ' + Cookies.get('MMAUTHTOKEN') || '';
    const url = Utils.getBaseUrls(mmSiteUrl).mattermostApiBaseUrl + '/teams';
    const response = await fetch(url, {
        method: 'GET',
        headers: {Authentication: authToken},
    });
    return response.json();
};

export const fetchChannelsAndTeams = async (mmSiteUrl: string) => {
    const channels = await fetchChannels(mmSiteUrl);
    const teams = await fetchTeams(mmSiteUrl);
    return {channels, teams};
};

import Cookies from 'js-cookie';

import Utils from 'utils';

export const fetchChannels = async () => {
    const authToken = 'Bearer ' + Cookies.get('MMAUTHTOKEN') || '';
    const url = Utils.getBaseUrls().mattermostApiBaseUrl + '/channels?exclude_default_channels=true';
    const response = await fetch(url, {
        method: 'GET',
        headers: {Authentication: authToken},
    });
    return response.json();
};

export const fetchTeams = async () => {
    const authToken = 'Bearer ' + Cookies.get('MMAUTHTOKEN') || '';
    const url = Utils.getBaseUrls().mattermostApiBaseUrl + '/teams';
    const response = await fetch(url, {
        method: 'GET',
        headers: {Authentication: authToken},
    });
    return response.json();
};

export const fetchChannelsAndTeams = async () => {
    const channels = await fetchChannels();
    const teams = await fetchTeams();
    return {channels, teams};
};

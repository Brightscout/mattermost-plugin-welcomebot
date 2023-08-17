import Utils from 'utils';

export const fetchChannels = async (mmSiteUrl: string) => {
    const authToken = Utils.getAuthToken();
    const url = Utils.getBaseUrls(mmSiteUrl).mattermostApiBaseUrl + '/channels?exclude_default_channels=true';
    const response = await fetch(url, {
        method: 'GET',
        headers: {Authentication: authToken},
    });
    return response.json();
};

export const fetchTeams = async (mmSiteUrl: string) => {
    const authToken = Utils.getAuthToken();
    const url = Utils.getBaseUrls(mmSiteUrl).mattermostApiBaseUrl + '/teams';
    const response = await fetch(url, {
        method: 'GET',
        headers: {Authentication: authToken},
    });
    return response.json();
};


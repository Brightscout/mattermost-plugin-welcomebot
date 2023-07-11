export interface PluginRegistry {
    registerReducer(reducer);
    registerAdminConsoleCustomSetting(key: string, component: React.ElementType)

    // Add more if needed from https://developers.mattermost.com/extend/plugins/webapp/reference
}

type MmHookArgTypes = {
    channel_id: string,
    team_id: string,
    root_id: string
}

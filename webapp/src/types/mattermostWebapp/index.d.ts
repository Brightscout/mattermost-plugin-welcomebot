export interface PluginRegistry {
    registerReducer(reducer);
    registerAdminConsoleCustomSetting(key: string, component: React.ElementType)

    // Add more if needed from https://developers.mattermost.com/extend/plugins/webapp/reference
}

export interface PluginRegistry {
    registerRootComponent(component: ReactDOM)
    registerAdminConsoleCustomSetting(key: string, component: React.ElementType)
    registerReducer(reducer)

    // Add more if needed from https://developers.mattermost.com/extend/plugins/webapp/reference
}

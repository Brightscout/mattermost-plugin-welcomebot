export interface PluginRegistry {
    registerRootComponent(component: ReactDOM)
    registerReducer(reducer);

    // Add more if needed from https://developers.mattermost.com/extend/plugins/webapp/reference
}

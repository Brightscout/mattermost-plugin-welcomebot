export interface PluginRegistry {
    registerRootComponent(component: ReactDOM)
    registerSlashCommandWillBePostedHook(hook: (message: string, args: MmHookArgTypes) => Promise<({message?: string, args?: MmHookArgTypes})>)
    registerReducer(reducer);
    registerWebSocketEventHandler(event: string, handler: (msg: WebsocketEventParams) => void)

    // Add more if needed from https://developers.mattermost.com/extend/plugins/webapp/reference
}

type MmHookArgTypes = {
    channel_id: string,
    team_id: string,
    root_id: string
}

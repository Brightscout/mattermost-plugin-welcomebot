import {Store, Action} from 'redux';
import {GlobalState} from 'mattermost-redux/types/store';

import {PluginRegistry} from 'types/mattermostWebapp';

// import ExistingConfigTable from 'containers/components/tables/existingConfigTable';

import reducers from './reducers';

import {id} from './manifest';
import Testing from 'containers/components/tables/test';

export default class Plugin {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    public async initialize(registry: any, store: Store<GlobalState, Action<Record<string, unknown>>>) {
        // @see https://developers.mattermost.com/extend/plugins/webapp/reference/
        registry.registerReducer(reducers);
        // registry.registerAdminConsoleCustomSetting('ExistingConfigurationTable', ExistingConfigTable);
        registry.registerAdminConsoleCustomSetting('tokens', Testing);

    }
}

declare global {
    interface Window {
        registerPlugin(id: string, plugin: Plugin): void
    }
}

window.registerPlugin(id, new Plugin());

import {Store, Action} from 'redux';
import {GlobalState} from 'mattermost-redux/types/store';

// eslint-disable-next-line import/no-unresolved
import {PluginRegistry} from 'types/mattermostWebapp';

import ExistingConfigTable from 'containers/components/tables/existingConfigTable';

import {id} from './manifest';

export default class Plugin {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    public async initialize(registry: PluginRegistry, store: Store<GlobalState, Action<Record<string, unknown>>>) {
        // @see https://developers.mattermost.com/extend/plugins/webapp/reference/
        registry.registerAdminConsoleCustomSetting('ExistingConfigurationTable', ExistingConfigTable);
    }
}

declare global {
    interface Window {
        registerPlugin(id: string, plugin: Plugin): void
    }
}

window.registerPlugin(id, new Plugin());

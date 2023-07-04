import {Store, Action} from 'redux';

import {GlobalState} from 'mattermost-redux/types/store';

// eslint-disable-next-line import/no-unresolved
import {PluginRegistry} from 'types/mattermostWebapp';

import ExistingConfigTable from 'containers/components/tables/existingConfigTable';

import ViewActionsModal from 'containers/components/modals/viewActionsModal';
import DeleteConfigModal from 'containers/components/modals/deleteConfigModal';

import reducers from './reducers';

import {id} from './manifest';

export default class Plugin {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    public async initialize(registry: PluginRegistry, store: Store<GlobalState, Action<Record<string, unknown>>>) {
        // @see https://developers.mattermost.com/extend/plugins/webapp/reference/
        registry.registerReducer(reducers);
        registry.registerAdminConsoleCustomSetting('ExistingConfigurationTable', ExistingConfigTable);
        registry.registerRootComponent(ViewActionsModal);
        registry.registerRootComponent(DeleteConfigModal);
    }
}

declare global {
    interface Window {
        registerPlugin(id: string, plugin: Plugin): void
    }
}

window.registerPlugin(id, new Plugin());

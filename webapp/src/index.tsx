import React from 'react';

import {Store, Action} from 'redux';

import {GlobalState} from 'mattermost-redux/types/store';

// eslint-disable-next-line import/no-unresolved
import {PluginRegistry} from 'types/mattermostWebapp';

import ExistingConfigTable from 'containers/components/tables/existingConfigTable';

import ViewActionsModal from 'containers/components/modals/viewActionsModal';

import ChannelHeaderButton from './containers/components/channelHeaderButton';
import RHS from './containers/rhs';

import reducers from './reducers';

import pluginConstants from './pluginConstants';

import {id} from './manifest';

export default class Plugin {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function

    public async initialize(registry: PluginRegistry, store: Store<GlobalState, Action<Record<string, unknown>>>) {
        // @see https://developers.mattermost.com/extend/plugins/webapp/reference/
        registry.registerReducer(reducers);
        const {showRHSPlugin} = registry.registerRightHandSidebarComponent(RHS, pluginConstants.common.RIGHT_SIDEBAR_HEADER);
        registry.registerChannelHeaderButtonAction(<ChannelHeaderButton/>, () => store.dispatch(showRHSPlugin), null, pluginConstants.common.CHANNEL_HEADER_BUTTON_TOOLTIP);
        registry.registerAdminConsoleCustomSetting('ExistingConfigurationTable', ExistingConfigTable);
        registry.registerRootComponent(ViewActionsModal);
    }
}

declare global {
    interface Window {
        registerPlugin(id: string, plugin: Plugin): void
    }
}

window.registerPlugin(id, new Plugin());

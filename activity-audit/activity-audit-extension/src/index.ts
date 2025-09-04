import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { AddExtensionNavigation } from './NavigationExtension/AddExtensionNavigation';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        /**
         * This section is intended for initializing extensions.
         */
        AddExtensionNavigation(builder);
    },
};

export default extensionModule;

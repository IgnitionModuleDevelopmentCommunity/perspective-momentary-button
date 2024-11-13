package org.imdc.perspective.momentarybutton.common;

import com.inductiveautomation.perspective.common.api.BrowserResource;

import java.util.Set;

public class Components {

    public static final String MODULE_ID = "org.imdc.perspective.momentarybutton";
    public static final String URL_ALIAS = "momentarybutton";
    public static final String COMPONENT_CATEGORY = "Momentarty Button";
    public static final Set<BrowserResource> BROWSER_RESOURCES =
            Set.of(
                    new BrowserResource(
                            "momentary-button-components-js",
                            String.format("/res/%s/Components.js", URL_ALIAS),
                            BrowserResource.ResourceType.JS
                    ),
                    new BrowserResource("momentary-button-components-css",
                            String.format("/res/%s/Components.css", URL_ALIAS),
                            BrowserResource.ResourceType.CSS
                    )
            );
}

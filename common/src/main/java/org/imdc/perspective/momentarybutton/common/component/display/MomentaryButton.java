package org.imdc.perspective.momentarybutton.common.component.display;

import com.inductiveautomation.ignition.common.jsonschema.JsonSchema;
import com.inductiveautomation.perspective.common.api.ComponentDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentDescriptorImpl;
import com.inductiveautomation.perspective.common.api.ComponentEventDescriptor;
import org.imdc.perspective.momentarybutton.common.Components;

import javax.swing.*;
import java.util.Arrays;


/**
 * Describes the component to the Java registry so the gateway and designer know to look for the front end elements.
 * In a 'common' scope so that it's referencable by both gateway and designer.
 */
public class MomentaryButton {

    // unique ID of the component which perfectly matches that provided in the javascript's ComponentMeta implementation
    public static String COMPONENT_ID = "imdc.perspective.momentarybutton";

    public static ComponentEventDescriptor ON_ACTION_PERFORMED = new ComponentEventDescriptor("onActionPerformed", "Fires when the button is activated", JsonSchema.parse(Components.class.getResourceAsStream("/momentarybutton.event.empty.json")));

    /**
     * The schema provided with the component descriptor. Use a schema instead of a plain JsonObject because it gives
     * us a little more type information, allowing the designer to highlight mismatches where it can detect them.
     */
    public static JsonSchema SCHEMA =
            JsonSchema.parse(Components.class.getResourceAsStream("/momentarybutton.props.json"));

    /**
     * Components register with the Java side ComponentRegistry but providing a ComponentDescriptor.  Here we
     * build the descriptor for this one component. Icons on the component palette are optional.
     */
    public static ComponentDescriptor DESCRIPTOR = ComponentDescriptorImpl.ComponentBuilder.newBuilder()
            .setPaletteCategory(Components.COMPONENT_CATEGORY)
            .setId(COMPONENT_ID)
            .setModuleId(Components.MODULE_ID)
            .setSchema(SCHEMA) //  this could alternatively be created purely in Java if desired
            .setName("MomentaryButton")
            .setIcon(new ImageIcon(Components.class.getResource("/icons/momentarybutton.png")))
            .setEvents(Arrays.asList(ON_ACTION_PERFORMED))
            .addPaletteEntry("", "MomentaryButton", "A momentary button component.", null, null)
            .setDefaultMetaName("momentarybutton")
            .setResources(Components.BROWSER_RESOURCES)
            .build();

}

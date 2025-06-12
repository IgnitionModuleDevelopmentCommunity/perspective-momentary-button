package org.imdc.perspective.momentarybutton.gateway;

import com.inductiveautomation.ignition.common.gson.JsonObject;
import com.inductiveautomation.ignition.common.model.values.QualifiedValue;
import com.inductiveautomation.ignition.common.tags.model.TagPath;
import com.inductiveautomation.ignition.common.tags.paths.parser.TagPathParser;
import com.inductiveautomation.ignition.common.util.LoggerEx;
import com.inductiveautomation.perspective.common.api.PropertyType;
import com.inductiveautomation.perspective.gateway.api.Component;
import com.inductiveautomation.perspective.gateway.api.ComponentModelDelegate;
import com.inductiveautomation.perspective.gateway.messages.EventFiredMsg;
import com.inductiveautomation.perspective.gateway.property.PropertyTree;

import java.util.List;
import java.util.Optional;

public class MomentaryButtonDelegate extends ComponentModelDelegate {
    private static final LoggerEx log = LoggerEx.newBuilder().build("Momentary Button Delegate");
    private static final String MESSAGE_RESPONSE_EVENT = "momentary-button-response-event";
    private static final String MESSAGE_REQUEST_EVENT = "momentary-button-request-event";

    public MomentaryButtonDelegate(Component component) {
        super(component);
    }

    @Override
    protected void onStartup() {

    }

    @Override
    protected void onShutdown() {
        setControlValue(false);
    }

    @Override
    public void handleEvent(EventFiredMsg message) {
        log.debugf("Received EventFiredMessage of type: %s", message.getEventName());

        if (message.getEventName().equals(MESSAGE_REQUEST_EVENT)) {
            JsonObject payload = message.getEvent();
            String state = payload.get("state").getAsString();
            setControlValue(state.equals("on"));
        }
    }

    private void setControlValue(boolean state) {
        PropertyTree props = component.getPropertyTreeOf(PropertyType.props);
        if (props != null) {
            Optional<QualifiedValue> offValueQv = props.read("offValue");
            Optional<QualifiedValue> onValueQv = props.read("onValue");
            Optional<QualifiedValue> tagPathQv = props.read("controlValueTagPath");

            if (offValueQv.isPresent() && onValueQv.isPresent() && tagPathQv.isPresent()) {
                TagPath tagPath = TagPathParser.parseSafe(tagPathQv.get().getValue().toString());
                Object value = state ? onValueQv.get().getValue() : offValueQv.get().getValue();
                component.getSession().getTagManager().writeAsync(List.of(tagPath), List.of(value)).thenAccept(qCodesList -> {
                    log.debugf("Set tag '%s' = %s with quality %s", tagPath.toStringFull(), value, qCodesList.get(0).toString());
                });
            }
        }
    }
}

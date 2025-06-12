package org.imdc.perspective.momentarybutton.gateway;

import com.inductiveautomation.ignition.common.model.values.QualifiedValue;
import com.inductiveautomation.ignition.common.util.LoggerEx;
import com.inductiveautomation.perspective.common.api.PropertyType;
import com.inductiveautomation.perspective.common.property.Origin;
import com.inductiveautomation.perspective.gateway.api.Component;
import com.inductiveautomation.perspective.gateway.api.ComponentModelDelegate;

public class MomentaryButtonDelegate extends ComponentModelDelegate {

    private static final LoggerEx log = LoggerEx.newBuilder().build("Momentary Button Delegate");
    public MomentaryButtonDelegate(Component component){
        super(component);
    }

    @Override
    protected void onStartup() {

    }

    @Override
    protected void onShutdown() {
        log.info("Shutting down component, calling setOff");
        QualifiedValue offValue = component.getPropertyTreeOf(PropertyType.props).read("offValue").get();
        component.getPropertyTreeOf(PropertyType.props).write("controlValue", offValue, Origin.Delegate, this);
    }
}

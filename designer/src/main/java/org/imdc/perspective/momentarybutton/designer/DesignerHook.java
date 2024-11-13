package org.imdc.perspective.momentarybutton.designer;

import com.inductiveautomation.ignition.common.BundleUtil;
import com.inductiveautomation.ignition.common.licensing.LicenseState;
import com.inductiveautomation.ignition.common.util.LoggerEx;
import com.inductiveautomation.ignition.designer.model.AbstractDesignerModuleHook;
import com.inductiveautomation.ignition.designer.model.DesignerContext;
import com.inductiveautomation.perspective.designer.DesignerComponentRegistry;
import com.inductiveautomation.perspective.designer.api.ComponentDesignDelegateRegistry;
import com.inductiveautomation.perspective.designer.api.PerspectiveDesignerInterface;
import org.imdc.perspective.momentarybutton.common.component.display.MomentaryButton;


/**
 * The 'hook' class for the designer scope of the module.  Registered in the ignitionModule configuration of the
 * root build.gradle file.
 */
public class DesignerHook extends AbstractDesignerModuleHook {
    private static final LoggerEx logger = LoggerEx.newBuilder().build("Perspective Components");

    private DesignerContext context;
    private DesignerComponentRegistry registry;
    private ComponentDesignDelegateRegistry delegateRegistry;

    static {
        BundleUtil.get().addBundle("momentarybutton", DesignerHook.class.getClassLoader(), "components");
    }

    public DesignerHook() {
        logger.info("Registering Components in Designer!");
    }

    @Override
    public void startup(DesignerContext context, LicenseState activationState) {
        this.context = context;
        init();
    }

    private void init() {
        logger.debug("Initializing registry entrants...");

        PerspectiveDesignerInterface pdi = PerspectiveDesignerInterface.get(context);

        registry = pdi.getDesignerComponentRegistry();
        delegateRegistry = pdi.getComponentDesignDelegateRegistry();

        // register components to get them on the palette
        registry.registerComponent(MomentaryButton.DESCRIPTOR);
    }


    @Override
    public void shutdown() {
        removeComponents();
    }

    private void removeComponents() {
        registry.removeComponent(MomentaryButton.COMPONENT_ID);
    }
}

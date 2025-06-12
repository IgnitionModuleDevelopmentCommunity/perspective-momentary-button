import * as React from 'react';
import {
    Component,
    ComponentMeta,
    ComponentProps,
    ComponentStoreDelegate,
    AbstractUIElementStore,
    EmitProps,
    IconRenderer,
    IconRendererConfig,
    makeLogger,
    I18n,
    PComponent,
    PropertyTree,
    SizeObject,
    StyleObject,
    PlainObject,
    Style,
    StyleProps
} from '@inductiveautomation/perspective-client';
import { bind } from 'bind-decorator';
import { Button } from './Button';

export const COMPONENT_TYPE = "imdc.perspective.momentarybutton";

const logger = makeLogger(COMPONENT_TYPE);

export interface StateConfig {
    text: string;
    style: StyleObject;
    icon: IconRendererConfig;
}

export type MomentaryButtonValueType = boolean | null | number | string;

export interface MomentaryButtonState {
    isActive: boolean;
}

export interface MomentaryButtonProps {
    enabled: boolean;
    controlValue: MomentaryButtonValueType;
    controlValueTagPath: string;
    indicatorValue: MomentaryButtonValueType;
    onValue: MomentaryButtonValueType;
    offValue: MomentaryButtonValueType;
    onTime: number;
    maxOnTime: number;
    activeState: StateConfig;
    inactiveState: StateConfig;
    style: Style;
    disabledStyle: Style;
}

enum MessageEvents {
    MESSAGE_RESPONSE_EVENT = "momentary-button-response-event",
    MESSAGE_REQUEST_EVENT = "momentary-button-request-event"
}

export class MomentaryButtonDelegate extends ComponentStoreDelegate {
    constructor(componentStore: AbstractUIElementStore) {
        super(componentStore);
    }

    @bind
    handleEvent(eventName: string, eventObject: PlainObject): void {
        const eventObjectStr = JSON.stringify(eventObject);
        logger.debug("Received '" + eventName + "' event: " + eventObjectStr);
    }
}

export class MomentaryButton extends Component<ComponentProps<MomentaryButtonProps>, Readonly<MomentaryButtonState>> {
    state: Readonly<MomentaryButtonState>;
    pressedTime: any;
    mouseInitiated: boolean;
    minHoldTimerId: any;
    maxHoldTimerId: any;

    constructor(props: ComponentProps<MomentaryButtonProps>) {
        super(props);

        const {
            indicatorValue,
            onValue
        } = this.props.props;

        this.state = {
            isActive: (indicatorValue == onValue)
        };
    }

    componentDidMount () {
        logger.debug("Component mounted");
        window.addEventListener("unload", this.setOff);
    }

    componentDidUpdate (prevProps) {
        logger.debug("Component updated");

        const {
            indicatorValue,
            onValue
        } = this.props.props;

        if ((indicatorValue == onValue) !== this.state.isActive) {
            this.setState({
                isActive: (indicatorValue == onValue)
            });
        }
    }

    componentWillUnmount () {
        logger.debug("Component unmounted");
    }

    @bind
    setOn() {
        const {
            props: {
                maxOnTime,
                onValue,
                controlValueTagPath
            },
            store: {
                delegate
            },
            componentEvents
        } = this.props;

        const {
            MESSAGE_REQUEST_EVENT
        } = MessageEvents;

        if (this.minHoldTimerId) {
            clearInterval(this.minHoldTimerId);
            this.minHoldTimerId = null;
        }

        if (maxOnTime > 0) {
            this.maxHoldTimerId = setInterval(this.setOff, maxOnTime);
        }

        this.pressedTime = Date.now();

        this.props.store.props.write('controlValue', onValue);
        if (controlValueTagPath != null && controlValueTagPath != "" && delegate) {
            delegate.fireEvent(MESSAGE_REQUEST_EVENT, { "state": "on" });
        }
        componentEvents.fireComponentEvent("onActionPerformed", {});
    }

    @bind
    setOff() {
        const {
            props: {
                offValue,
                controlValueTagPath
            },
            store: {
                delegate
            }
        } = this.props;

        const {
            MESSAGE_REQUEST_EVENT
        } = MessageEvents;

        if (this.mouseInitiated) {
            this.mouseInitiated = false;

            this.props.store.props.write('controlValue', offValue);
            if (controlValueTagPath != null && controlValueTagPath != "" && delegate) {
                delegate.fireEvent(MESSAGE_REQUEST_EVENT, { "state": "off" });
            }

            if (this.minHoldTimerId) {
                clearInterval(this.minHoldTimerId);
                this.minHoldTimerId = null;
            }

            if (this.maxHoldTimerId) {
                clearInterval(this.maxHoldTimerId);
                this.maxHoldTimerId = null;
            }
        }
    }

    @bind
    handleMouseDown(e) {
        const {
            enabled
        } = this.props.props;

        if (enabled && !this.state.isActive) {
            this.mouseInitiated = true;
            this.setOn();
            window.addEventListener("pointerup", this.handleMouseUp);
            window.addEventListener("mouseup", this.handleMouseUp);
            window.addEventListener("touchend", this.handleMouseUp);
        }
    }

    @bind
    handleMouseUp(e) {
        const {
            enabled,
            onTime
        } = this.props.props;

        if (enabled && this.mouseInitiated) {
            window.removeEventListener("pointerup", this.handleMouseUp);
            window.removeEventListener("mouseup", this.handleMouseUp);
            window.removeEventListener("touchend", this.handleMouseUp);

            const timeLeft = onTime - (Date.now() - this.pressedTime);
            if (onTime == 0 || timeLeft <= 0) {
                this.setOff();
            } else if (this.minHoldTimerId == null) {
                this.minHoldTimerId = setInterval(this.setOff, timeLeft);
            }
        }
    }

    render() {
        const { emit } = this.props;
        const {
            enabled,
            activeState,
            inactiveState,
            style,
            disabledStyle
        } = this.props.props;
        const {
            isActive
        } = this.state;

        const stateConfig: StateConfig = isActive ? activeState : inactiveState;
        const buttonText = stateConfig.text === undefined ? '' : String(stateConfig.text);
        const buttonStyle = PropertyTree.parseStyle(stateConfig.style || {});
        const buttonIconConfig: IconRendererConfig = stateConfig.icon || {};
        const iconElement = getIcon(buttonIconConfig);

        let textElement: JSX.Element;
        if (iconElement) {
            textElement = (<span style={{ zIndex: 20}}><I18n>{ buttonText }</I18n></span>);
        } else {
            textElement = (<I18n>{ buttonText }</I18n>);
        }

        const additionalButtonStyles = iconElement ? { flex: "1", ...flexButtonStyles } : { flex: "1" };
        const styles = style.clone().applyStyle(buttonStyle).applyCssProperties(additionalButtonStyles);

        if (!enabled) {
            styles.applyStyle(disabledStyle);
        }

        const styleProps: StyleProps = styles.toStyleProps();

        const emitProps: EmitProps = {
            classes: ['component-wrapper']
        };

        return (
            <div { ...emit(emitProps, true) } >
                <Button
                    { ...styleProps }
                    disabled={!enabled}
                    secondary={false}
                    onPointerUp={this.handleMouseUp}
                    onPointerDown={this.handleMouseDown}
                >
                    { textElement }
                    { iconElement }
                </Button>
            </div>
        );
    }
}

const flexButtonStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    justifyItems: "center"
};

function getIcon(icon: IconRendererConfig | undefined): JSX.Element | null {
    if (icon && (icon.path || (icon.library && icon.name))) {
        return ( <IconRenderer { ...icon } /> );
    }

    return null;
}

export class MomentaryButtonMeta implements ComponentMeta {

    getComponentType(): string {
        return COMPONENT_TYPE;
    }

    getViewComponent(): PComponent {
        return MomentaryButton;
    }

    getDefaultSize(): SizeObject {
        return ({
            width: 140,
            height: 36
        });
    }

    createDelegate(component: AbstractUIElementStore): ComponentStoreDelegate | undefined {
        return new MomentaryButtonDelegate(component);
    }

    getPropsReducer(tree: PropertyTree): MomentaryButtonProps {
        return {
            enabled: tree.readBoolean('enabled', true),
            controlValue: tree.read("controlValue", 0),
            controlValueTagPath: tree.readString("controlValueTagPath"),
            indicatorValue: tree.read("indicatorValue", 0),
            onValue: tree.read("onValue", 1),
            offValue: tree.read("offValue", 0),
            onTime: tree.readNumber("onTime", 1000),
            maxOnTime: tree.readNumber("maxOnTime", 0),
            activeState: tree.readObject('activeState'),
            inactiveState: tree.readObject('inactiveState'),
            style: tree.readStyle('style'),
            disabledStyle: tree.readStyle('disabledStyle')
        };
    }
}

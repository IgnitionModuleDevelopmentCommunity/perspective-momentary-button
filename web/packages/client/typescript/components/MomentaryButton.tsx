import * as React from 'react';
import {
    Component,
    ComponentMeta,
    ComponentProps,
    EmitProps,
    IconRenderer,
    IconRendererConfig,
    makeLogger,
    I18n,
    PComponent,
    PropertyTree,
    SizeObject,
    StyleObject,
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

export class MomentaryButton extends Component<ComponentProps<MomentaryButtonProps>, Readonly<MomentaryButtonState>> {
    state: Readonly<MomentaryButtonState>;
    pressedTime: any;
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
                onValue
            },
            componentEvents
        } = this.props;

        if (this.minHoldTimerId) {
            clearInterval(this.minHoldTimerId);
        }

        if (maxOnTime > 0) {
            this.maxHoldTimerId = setInterval(this.setOff, maxOnTime);
        }

        this.pressedTime = Date.now();
        this.props.store.props.write('controlValue', onValue);
        componentEvents.fireComponentEvent("onActionPerformed", {});
    }

    @bind
    setOff() {
        const {
            props: {
                offValue
            }
        } = this.props;

        this.props.store.props.write('controlValue', offValue);

        if (this.minHoldTimerId) {
            clearInterval(this.minHoldTimerId);
        }

        if (this.maxHoldTimerId) {
            clearInterval(this.maxHoldTimerId);
        }
    }

    @bind
    handleMouseDown() {
        const {
            enabled
        } = this.props.props;

        if (enabled) {
            this.setOn();
        }
    }

    @bind
    handleMouseUp() {
        const {
            enabled,
            onTime
        } = this.props.props;

        if (enabled) {
            const timeLeft = onTime - (Date.now() - this.pressedTime);
            if (onTime == 0 || timeLeft <= 0) {
                this.setOff();
            } else {
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
                    onMouseUp={this.handleMouseUp}
                    onMouseDown={this.handleMouseDown}
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

    getPropsReducer(tree: PropertyTree): MomentaryButtonProps {
        return {
            enabled: tree.readBoolean('enabled', true),
            controlValue: tree.read("controlValue", 0),
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

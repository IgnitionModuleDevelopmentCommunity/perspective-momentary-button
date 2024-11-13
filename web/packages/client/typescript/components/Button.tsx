import * as React from 'react';
import cn from 'classnames';

/**
 * Common Button component.
 *
 * A standardized button component to be used throughout component
 * implementations wherever a button is needed.  Standardized so that we
 * can apply consistent theming wherever this button is used and render
 * a consistent UI across browsers.
 *
 * @prop secondary?: Optional.  If this is a secondary button.
 * Remaining props include your typical React button element props.
 */
export class Button extends React.Component<ButtonProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> {
    render(): React.ReactElement<HTMLButtonElement> {
        const {
            PRIMARY,
            PRIMARY_DISABLED,
            SECONDARY,
            SECONDARY_DISABLED
        } = Theme;

        const {
            children,
            className,
            disabled,
            forwardRef,
            secondary,
            ...remainingProps
        } = this.props;

        const classes: string = cn({
            [SECONDARY]: secondary,
            [SECONDARY_DISABLED]: secondary && disabled,
            [PRIMARY]: !secondary,
            [PRIMARY_DISABLED]: !secondary && disabled
        }, className, "popup-not-draggable");

        return (
            <button
                {...remainingProps}
                disabled={disabled}
                className={classes}
                ref={forwardRef}
            >
                {children}
            </button>
        );
    }
}

export interface ButtonProps {
    secondary?: boolean;
    forwardRef?: React.RefObject<HTMLButtonElement>;
}

/**
 * CSS classnames which are used in theming
 * the button.  If altered, the must also
 * be updated in the theme style sheets as well as
 * any local stylesheets (ie. ../../scss/common/_button.scss)
 */
export enum Theme {
    PRIMARY = 'ia_button--primary',
    PRIMARY_DISABLED = 'ia_button--primary--disabled',
    SECONDARY = 'ia_button--secondary',
    SECONDARY_DISABLED = 'ia_button--secondary--disabled'
}

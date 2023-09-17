import s from './typography.module.scss'

import {ElementType, ReactNode} from "react";
import {clsx} from "clsx";

type TypographyProps<T extends ElementType = 'span'> = {
    as: T
    variant?:
        | 'large'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'body1'
        | 'body2'
        | 'subtitle1'
        | 'subtitle2'
        | 'caption'
        | 'overline'
        | 'link1'
        | 'link2'
    children?: ReactNode
    className?: string
}

export const Typography = ({as: Component = 'span', variant = 'body1', className, children}: TypographyProps) => {

    // const classes = `${s[variant]} ${className}`
    const classes = clsx(s[variant], className)

    return <Component className={classes}>{children}</Component>
}

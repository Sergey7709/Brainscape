import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <circle cx="9" cy="9" r="8.5" stroke="white" />
    <g
      style={{
        transform: 'translate(3px, 3px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {props.children}
    </g>
  </svg>
)

export const Elipse = memo(SvgComponent)

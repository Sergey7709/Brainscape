import { forwardRef, memo, Ref, SVGProps } from 'react'

import s from '@/assets/icons/star-fulfilled.module.scss'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={s.starFulfilled}
    ref={ref}
    // width="16"
    // height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M11.7067 14C11.6 14.0004 11.4949 13.9753 11.4 13.9266L7.99999 12.1466L4.59999 13.9266C4.48959
      13.9847 4.36511 14.0106 4.24071 14.0014C4.11631 13.9923 3.99698 13.9484 3.89628 13.8748C3.79558
       13.8012 3.71755 13.7008 3.67107 13.585C3.62459 13.4693 3.61151 13.3428 3.63333 13.22L4.29999
        9.46664L1.55333 6.79997C1.46763 6.71446 1.40684 6.60722 1.37748 6.48977C1.34812 6.37232 1.35129
         6.24909 1.38666 6.13331C1.4253 6.01482 1.49638 5.90954 1.59183 5.82941C1.68728 5.74928 1.80328
          5.69751 1.92666 5.67997L5.72666 5.12664L7.39999 1.70664C7.45458 1.59393 7.53982 1.49887 7.64594
           1.43236C7.75205 1.36584 7.87476 1.33057 7.99999 1.33057C8.12523 1.33057 8.24794 1.36584 8.35405
            1.43236C8.46017 1.49887 8.5454 1.59393 8.59999 1.70664L10.2933 5.11997L14.0933 5.67331C14.2167
             5.69084 14.3327 5.74262 14.4282 5.82275C14.5236 5.90288 14.5947 6.00816 14.6333 6.12664C14.6687
              6.24242 14.6719 6.36565 14.6425 6.4831C14.6131 6.60055 14.5524 6.70779 14.4667 6.79331L11.72
               9.45997L12.3867 13.2133C12.4105 13.3383 12.398 13.4675 12.3507 13.5856C12.3035 13.7037 12.2234 13.8059
                12.12 13.88C11.9993 13.9646 11.8539 14.0068 11.7067 14Z"
      fill="#E6AC39"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default memo(ForwardRef)

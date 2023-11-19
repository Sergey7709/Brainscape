import { FC } from 'react'

import s from './home.module.scss'

import { Card } from '@/components/ui/card'
import { HomeNotAuthorized } from '@/pages/home/greeting .tsx'
import { HomeAuthorized } from '@/pages/home/home-Authorized.tsx'
import { useGetAuthUserMeDataQuery } from '@/service'

// export const Home: FC = () => {
//   const { isSuccess: isAuthenticated } = useGetAuthUserMeDataQuery()
//
//   // console.log('isAuthenticated', isAuthenticated)
//
//   return (
//     <div className={s.container}>
//       <Card id="cardHome" className={s.cardHome}>
//         {isAuthenticated ? <HomeAuthorized /> : <HomeNotAuthorized />}
//       </Card>
//     </div>
//   )
// }
//
// export default Home

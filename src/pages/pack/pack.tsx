import { NavLink } from 'react-router-dom'

import s from './pack.module.scss'

import { ArrowLeftFull } from '@/assets/icons/arrow-left-full.tsx'
import { Elipse } from '@/assets/icons/elipse.tsx'
import { MoreVerticalOutline } from '@/assets/icons/more-vertical-outline.tsx'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { useGetDeckByIdQuery } from '@/service'

export const Pack = () => {
  const id = 'clnsvp4pv109xvo2qgonbceqc' ///!!!!!!!!!!!!!

  const { data, isSuccess, isLoading, isFetching } = useGetDeckByIdQuery(id)

  return (
    <>
      {(isLoading || isFetching) && <Loader />}
      <div className={s.containerPack}>
        <div className={s.containerLinkPackList}>
          <ArrowLeftFull />
          <Button as={NavLink} to={'/deck'} variant={'link'} className={s.linkPackList}>
            Back to Packs List
          </Button>
        </div>
        <div className={s.containerTitleAndButton}>
          <div className={s.containerTitle}>
            <Typography variant={'large'}>My Pack</Typography>
            <Elipse className={s.packDropDown}>
              <MoreVerticalOutline />
            </Elipse>
          </div>
          <Button className={s.packButton}>Add New Card</Button>
        </div>
        <img src={data?.cover} alt={'Not found'} className={s.packImg} />
        <TextField type={'search'} placeholder={'Input search'}></TextField>
        <div>table</div>
      </div>
    </>
  )
}

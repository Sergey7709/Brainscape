import { useNavigate } from 'react-router-dom'

import { ArrowLeftFull } from '@/assets/icons/arrow-left-full.tsx'
import { Elipse } from '@/assets/icons/elipse.tsx'
import { MoreVerticalOutline } from '@/assets/icons/more-vertical-outline.tsx'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useGetDataForPack } from '@/pages/pack/hooks'
import s from '@/pages/pack/pack.module.scss'

export const PackPanel = () => {
  const { dataMeId, dataDeck, mePackCards } = useGetDataForPack()

  const navigate = useNavigate()

  const navigateBackToDeck = () => {
    const urlDeck = sessionStorage.getItem('previousPath')

    if (urlDeck) {
      navigate(`/deck${urlDeck}`)
    } else {
      navigate('/deck')
    }
  }

  console.log('dataMeId', dataMeId, 'dataDeck', dataDeck)

  return (
    <>
      <Button variant={'link'} className={s.linkPackList} onClick={navigateBackToDeck}>
        <ArrowLeftFull />
        Back to Packs List
      </Button>
      <div className={s.containerTitleAndButton}>
        <div className={s.containerTitle}>
          {mePackCards ? (
            <>
              <Typography variant={'large'}>{`My Pack: "${dataDeck?.name || ''}"`}</Typography>
              <Elipse className={s.packDropDown}>
                <MoreVerticalOutline />
              </Elipse>
            </>
          ) : (
            <Typography variant={'large'}>{`Friend’s Pack: "${dataDeck?.name || ''}"`}</Typography>
          )}
        </div>
        <Button className={s.packButton}>Add New Card</Button>
      </div>
      <img src={dataDeck?.cover} alt={'Not found'} className={s.packImg} />
    </>
  )
}

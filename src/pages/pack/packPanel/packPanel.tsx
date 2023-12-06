import { Elipse } from '@/assets/icons/elipse.tsx'
import { MoreVerticalOutline } from '@/assets/icons/more-vertical-outline.tsx'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { BackToDeckLink } from '@/pages/pack/backToDeckLink'
import { useGetDataForPack } from '@/pages/pack/hooks'
import s from '@/pages/pack/pack.module.scss'

export const PackPanel = () => {
  const { dataDeck, mePackCards } = useGetDataForPack()

  return (
    <>
      <BackToDeckLink className={s.linkPackList} />
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

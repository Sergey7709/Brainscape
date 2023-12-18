import { useNavigate } from 'react-router-dom'

import { Delete, Play, Redactor } from '@/assets/icons'
import { Elipse } from '@/assets/icons/elipse.tsx'
import { MoreVerticalOutline } from '@/assets/icons/more-vertical-outline.tsx'
import { DropDownItemWithIcon, DropdownMenu } from '@/components/ui/dropdown'
import s from '@/pages/pack/pack.module.scss'

type PackDropDownMenuProps = {
  id: string
  handlerEditModal: () => void
  handlerOpenModal: () => void
  cardsCount: number
}

export const PackDropDown = ({
  id,
  handlerEditModal,
  handlerOpenModal,
  cardsCount,
}: PackDropDownMenuProps) => {
  const navigate = useNavigate()

  return (
    <DropdownMenu
      align={'end'}
      trigger={
        <div className={s.divDrop}>
          <Elipse className={s.packDropDown}>
            <MoreVerticalOutline />
          </Elipse>
        </div>
      }
    >
      <DropDownItemWithIcon
        onSelect={() => navigate(`/learn/${id}`)}
        textValue={'Learn'}
        icon={<Play />}
        disabled={!cardsCount}
      />
      <DropDownItemWithIcon onSelect={handlerEditModal} textValue={'Edit'} icon={<Redactor />} />
      <DropDownItemWithIcon onSelect={handlerOpenModal} textValue={'Delete'} icon={<Delete />} />
    </DropdownMenu>
  )
}

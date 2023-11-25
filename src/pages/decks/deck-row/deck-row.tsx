import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { Delete, Play, Redactor } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import s from '@/pages/decks/decks.module.scss'
import { DeckType } from '@/service/decks/decks.types.ts'

export const DeckRow = (deck: DeckType) => {
  const updatedDateFormat = new Date(deck.updated)
    .toISOString()
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('.')

  // const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const saveUrlDeck = () => {
    sessionStorage.setItem('previousPath', location.pathname + location.search)
  }

  // console.log('location', location)

  return (
    <Table.Row key={deck.id}>
      <Table.Cell>
        {/*<Button*/}
        {/*  as={NavLink}*/}
        {/*  to={`/pack/${deck.id}`}*/}
        {/*  variant={'link'}*/}
        {/*  className={s.linkCell}*/}
        {/*  // onClick={() => dispatch(packIdReducer({ packId: deck.id }))}*/}
        {/*  fullWidth*/}
        {/*>*/}
        <Button
          as={NavLink}
          variant={'link'}
          to={`/pack/${deck.id}`}
          className={s.linkCell}
          onClick={saveUrlDeck}
          fullWidth
        >
          <div className={s.nameContainer}>
            {deck.cover && <img className={s.imgCover} alt={'Not image'} src={deck.cover} />}
            <p className={s.textForName}> {deck.name}</p>
          </div>
        </Button>
        {/*<div className={s.nameContainer}>*/}
        {/*  {deck.cover && <img className={s.imgCover} alt={'Not image'} src={deck.cover} />}*/}
        {/*  <p className={s.textForName}> {deck.name}</p>*/}
        {/*</div>*/}
      </Table.Cell>
      <Table.Cell>{deck.cardsCount}</Table.Cell>
      <Table.Cell>{updatedDateFormat}</Table.Cell>
      <Table.Cell>
        <Typography>{deck.author.name}</Typography>
      </Table.Cell>
      <Table.Cell>
        <div className={s.buttonContainer}>
          <Button variant="link" className={s.editAvatarButton}>
            <Play />
          </Button>
          <Button variant="link" className={s.editAvatarButton}>
            <Redactor />
          </Button>
          <Button variant="link" className={s.editAvatarButton}>
            <Delete />
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

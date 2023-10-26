import s from './decks.module.scss'

import { Delete, Play, Redactor } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { Table } from '@/components/ui/tables/tables'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { useGetDecksQuery } from '@/service'

export const Decks = () => {
  const { data, isSuccess } = useGetDecksQuery()

  const classNames = {
    decksPanel: s.decksPanel,
    searchInput: s.searchInput,
    container: s.container,
    slider: s.slider,
    tableWrapper: s.tableWrapper,
    buttonFilling: s.buttonFilling,
    head: s.head,
  }

  return (
    <div className={classNames.container}>
      <div className={s.head}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button>Add new pack</Button>
      </div>
      <div className={classNames.decksPanel}>
        <div className={classNames.searchInput}>
          <TextField type={'search'} placeholder={'Input search'} />
        </div>
        <TabSwitcher
          label={'Show packs cards'}
          defaultValue={'allCards'}
          tabData={[
            {
              title: 'My cards',
              value: 'myCards',
            },
            {
              title: 'All cards',
              value: 'allCards',
            },
          ]}
        />
        <Slider className={classNames.slider} min={0} max={10} label={'Number of cards'} />
        <Button variant={'secondary'}>
          <Delete /> Clear Filter
        </Button>
      </div>
      <div className={classNames.tableWrapper}>
        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Cards</Table.HeadCell>
              <Table.HeadCell>Last Updated</Table.HeadCell>
              <Table.HeadCell>Created by</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {isSuccess &&
              data.items.map(deck => {
                const updatedDateFormat = new Date(deck.updated)
                  .toISOString()
                  .slice(0, 10)
                  .split('-')
                  .reverse()
                  .join('.')

                return (
                  <Table.Row key={deck.id}>
                    <Table.Cell>{deck.name}</Table.Cell>
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
              })}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  )
}

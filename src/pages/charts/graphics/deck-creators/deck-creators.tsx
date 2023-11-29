import { memo } from 'react'

import s from './deck-creators.module.scss'

import { Table } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { GetEntitiesResponse } from '@/service/common/types.ts'
import { DeckType } from '@/service/decks/decks.types.ts'

type AuthorInfo = {
  name: string
  deckCreated: number
}

type AuthorsDictionary = {
  [key: string]: AuthorInfo
}

type AuthorTuple = [string, AuthorInfo]

export const DeckCreators = memo(({ items }: Pick<GetEntitiesResponse<DeckType>, 'items'>) => {
  const classNames = {
    wrapper: s.wrapper,
    title: s.title,
  }

  const authorsDictionary = {} as AuthorsDictionary

  items.forEach(items => {
    if (Object.keys(authorsDictionary).includes(items.author.id)) {
      authorsDictionary[items.author.id].deckCreated += 1
    } else {
      authorsDictionary[items.author.id] = { name: items.author.name, deckCreated: 1 }
    }
  })

  const authorsTuples: AuthorTuple[] = Object.keys(authorsDictionary).map(function (key) {
    return [key, authorsDictionary[key]]
  })

  const sortedAuthors = authorsTuples
    .sort((first, second) => first[1].deckCreated - second[1].deckCreated)
    .reverse()
    .slice(0, 10)

  return (
    <div className={classNames.wrapper}>
      <Typography className={classNames.title} variant={'h2'}>
        The most productive Deck Creators
      </Typography>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Position</Table.HeadCell>
            <Table.HeadCell align="center">Author</Table.HeadCell>
            <Table.HeadCell>Decks Created</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedAuthors.map((author, index) => {
            return (
              <Table.Row key={author[0]}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{author[1].name}</Table.Cell>
                <Table.Cell>{author[1].deckCreated}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
})

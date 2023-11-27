import { memo } from 'react'

import { Table } from '@/components/ui/tables'
import { GetEntitiesResponse } from '@/service/common/types.ts'
import { DeckType } from '@/service/decks/decks.types.ts'

type AuthorInfo = {
  name: string
  deckCreated: number
}

type AuthorsDictionary = {
  [key: string]: AuthorInfo
}

export const DeckCreators = memo(({ items }: Pick<GetEntitiesResponse<DeckType>, 'items'>) => {
  const statistics = {} as AuthorsDictionary

  items.forEach(items => {
    if (Object.keys(statistics).includes(items.author.id)) {
      statistics[items.author.id].deckCreated += 1
    } else {
      statistics[items.author.id] = { name: items.author.name, deckCreated: 1 }
    }
  })

  type Tuple = [string, { name: string; deckCreated: number }]

  const tuples: Tuple[] = Object.keys(statistics).map(function (key) {
    return [key, statistics[key]]
  })

  tuples.sort((first, second) => first[1].deckCreated - second[1].deckCreated).reverse()

  return (
    <div>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Position</Table.HeadCell>
            <Table.HeadCell align="center">Author</Table.HeadCell>
            <Table.HeadCell>Decks Created</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {tuples.slice(0, 10).map((author, index) => {
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

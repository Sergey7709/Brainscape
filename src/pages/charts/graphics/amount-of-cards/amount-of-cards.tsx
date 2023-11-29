import { memo } from 'react'

import { Pie } from 'react-chartjs-2'

import s from './amount-of-cards.module.scss'

import { Typography } from '@/components/ui/typography'
import { GetEntitiesResponse } from '@/service/common/types.ts'
import { DeckType } from '@/service/decks/decks.types.ts'

export const AmountOfCards = memo(({ items }: Pick<GetEntitiesResponse<DeckType>, 'items'>) => {
  const usersData = {
    '0': 0,
    '<10': 0,
    '<20': 0,
    '<100': 0,
  }

  items?.forEach(deck => {
    const cardsCount = deck.cardsCount

    if (cardsCount === 0) usersData['0'] += 1
    if (cardsCount > 0 && cardsCount < 10) usersData['<10'] += 1
    if (cardsCount >= 10 && cardsCount < 20) usersData['<20'] += 1
    if (cardsCount >= 20) usersData['<100'] += 1
  })

  const info = {
    labels: ['0', '< 10', '< 20', '< 100'],
    datasets: [
      {
        label: 'Amount of cards in the deck',
        data: [usersData['0'], usersData['<10'], usersData['<20'], usersData['<100']],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          // 'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          // 'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const classNames = {
    wrapper: s.wrapper,
    title: s.title,
  }

  return (
    <div className={classNames.wrapper}>
      <Typography className={classNames.title} variant={'h2'}>
        Cards in decks
      </Typography>
      <div>
        <Pie
          style={{ display: 'flex', gap: '20px' }}
          width={350}
          height={350}
          data={info}
          options={{
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, ticks: { display: false } } },
            datasets: {},
          }}
        />
      </div>
    </div>
  )
})

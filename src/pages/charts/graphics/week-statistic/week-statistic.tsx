import { memo } from 'react'

import { Chart } from 'react-chartjs-2'

import s from './week-statistic.module.scss'

import { Typography } from '@/components/ui/typography'
import { GetEntitiesResponse } from '@/service/common/types.ts'
import { DeckType } from '@/service/decks/decks.types.ts'

export const WeekStatistic = memo(({ items }: Pick<GetEntitiesResponse<DeckType>, 'items'>) => {
  const weekday: { [key: string]: number } = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  }

  items.forEach(item => {
    const day = new Date(item.created)

    weekday[Object.keys(weekday)[day.getDay()]] += 1
  })

  const info = {
    labels: Object.keys(weekday),
    datasets: [
      {
        label: 'Decks created this day',
        data: [
          weekday.Sunday,
          weekday.Monday,
          weekday.Tuesday,
          weekday.Wednesday,
          weekday.Thursday,
          weekday.Friday,
          weekday.Saturday,
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(20, 204, 112, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(20, 204, 112, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const classNames = {
    wrapper: s.wrapper,
    chart: s.chart,
  }

  return (
    <div className={classNames.wrapper}>
      <Typography variant={'h2'}>The most productive days of the week</Typography>
      <Chart className={classNames.chart} data={info} type={'bar'} />
    </div>
  )
})

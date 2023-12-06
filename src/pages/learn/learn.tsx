import { useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './learn.module.scss'

import { Card } from '@/components/ui/card'
import { Loader } from '@/components/ui/loader'
import { Answer } from '@/pages/learn/answer/answer.tsx'
import { Question } from '@/pages/learn/question'
import { BackToDeckLink } from '@/pages/pack/backToDeckLink'
import { useGetDataForPack } from '@/pages/pack/hooks/hooks.ts'
import { useGetRandomCardsQuery } from '@/service'

export const Learn = () => {
  const { dataDeck } = useGetDataForPack()
  const packId = useParams()

  const { data, isLoading } = useGetRandomCardsQuery(packId.id ?? '')

  const [openAnswer, setOpenAnswer] = useState(false)

  console.log('data', data?.id, 'data', dataDeck?.name, 'openAnswer', openAnswer)

  return (
    <>
      {isLoading && <Loader />}
      <div className={s.learnContainer}>
        <div className={s.learnBackToDeckWrapper}>
          <BackToDeckLink className={s.linkBackToDeck} />
        </div>
        <Card className={s.learnCards}>
          {!openAnswer ? (
            <>
              <Question
                nameCard={dataDeck?.name || ''}
                imageQuestion={data?.questionImg || ''}
                question={data?.question || ''}
                shots={data?.shots || 0}
                handlerLearn={setOpenAnswer}
              />
            </>
          ) : (
            <>
              <Answer
                nameCard={dataDeck?.name || ''}
                imageAnswer={data?.answerImg || ''}
                answer={data?.answer || ''}
                shots={data?.shots || 0}
                handlerLearn={setOpenAnswer}
                cardID={data?.id || ''}
                deckID={dataDeck?.id || ''}
              />
            </>
          )}
        </Card>
      </div>
    </>
  )
}

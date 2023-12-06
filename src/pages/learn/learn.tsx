import { useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './learn.module.scss'

import { Card } from '@/components/ui/card'
import { Loader } from '@/components/ui/loader'
import { Answer } from '@/pages/learn/answer/answer.tsx'
import { Question } from '@/pages/learn/question'
import { BackToDeckLink } from '@/pages/pack/backToDeckLink'
import { useGetDataForPack } from '@/pages/pack/hooks/useGetDataForPack.ts'
import { useGetRandomCardsQuery } from '@/service'
import { useIsFirstRender } from '@/utils'

export const Learn = () => {
  const packId = useParams()
  const { data, isLoading, isFetching, isSuccess } = useGetRandomCardsQuery(packId.id ?? '')
  const { dataDeck, isLoadingDeck, isFetchingDeck } = useGetDataForPack()

  const [openAnswer, setOpenAnswer] = useState(false)

  const isFirstRender = useIsFirstRender()

  return (
    <>
      {(isLoading || isFetching || isLoadingDeck || isFetchingDeck) && <Loader />}
      <div className={s.learnContainer}>
        <div className={s.learnBackToDeckWrapper}>
          <BackToDeckLink className={s.linkBackToDeck} />
        </div>
        <Card className={s.learnCards}>
          {!openAnswer && !isFetching && !isLoading && isSuccess ? (
            <>
              <Question
                nameCard={dataDeck?.name || ''}
                imageQuestion={data?.questionImg || ''}
                question={data?.question || ''}
                shots={data?.shots || 0}
                handlerLearn={setOpenAnswer}
                isLoading={isLoading}
                isFetching={isFetching}
              />
            </>
          ) : (
            !isFirstRender &&
            !isLoading && (
              <>
                <Answer
                  nameCard={dataDeck?.name || ''}
                  imageAnswer={data?.answerImg || ''}
                  answer={data?.answer || ''}
                  shots={data?.shots || 0}
                  handlerLearn={setOpenAnswer}
                  cardID={data?.id || ''}
                  deckID={dataDeck?.id || ''}
                  isLoading={isLoading}
                  isFetching={isFetching}
                />
              </>
            )
          )}
        </Card>
      </div>
    </>
  )
}

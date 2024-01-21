import { useLayoutEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './learn.module.scss'

import { Loader } from '@/components/ui/loader'
import { Answer } from '@/pages/learn/answer/answer.tsx'
import { Question } from '@/pages/learn/question'
import { BackToDeckLink } from '@/pages/pack/backToDeckLink'
import { useGetDataForPack } from '@/pages/pack/hooks-and-function/useGetDataForPack.ts'
import { useGetRandomCardsQuery } from '@/service'

export const Learn = () => {
  const packId = useParams()
  const {
    data: dataCard,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetRandomCardsQuery(packId.id ?? '')
  const { dataDeck, isLoadingDeck, isFetchingDeck, isSuccessDeck } = useGetDataForPack()

  const [openAnswer, setOpenAnswer] = useState(false)

  useLayoutEffect(() => {
    setOpenAnswer(false)
  }, [dataCard])

  const conditionRenderLoader = isLoading || isFetching || isLoadingDeck || isFetchingDeck

  const conditionRenderCards = isSuccess && isSuccessDeck && dataDeck && dataCard

  return (
    <>
      {conditionRenderLoader && <Loader />}
      <div className={s.learnContainer}>
        <div className={s.learnBackToDeckWrapper}>
          <BackToDeckLink className={s.linkBackToDeck} />
        </div>
        {conditionRenderCards && (
          <>
            {openAnswer ? (
              <Answer
                nameCard={dataDeck?.name}
                imageAnswer={dataCard?.answerImg}
                answer={dataCard?.answer}
                shots={dataCard?.shots}
                cardID={dataCard?.id}
                deckID={dataDeck?.id}
                conditionRenderLoader={conditionRenderLoader}
              />
            ) : (
              <Question
                nameCard={dataDeck?.name}
                imageQuestion={dataCard?.questionImg}
                question={dataCard?.question}
                shots={dataCard?.shots}
                handlerLearn={setOpenAnswer}
              />
            )}
          </>
        )}
      </div>
    </>
  )
}

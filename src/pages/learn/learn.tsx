import { useLayoutEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './learn.module.scss'

import { LoaderSquare } from '@/components/ui/loader-square'
import { Answer } from '@/pages/learn/answer/answer.tsx'
import { Question } from '@/pages/learn/question'
import { BackToDeckLink } from '@/pages/pack/backToDeckLink'
import { useGetDataForPack } from '@/pages/pack/hooks-and-function/useGetDataForPack.ts'
import { useGetRandomCardsQuery } from '@/service'
import { previousCardIdParams } from '@/shared/constants/constantsForSearchParams.ts'

export const Learn = () => {
  const packId = useParams()

  const previousCardId = sessionStorage.getItem(previousCardIdParams)

  const {
    data: dataCard,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetRandomCardsQuery({ id: packId.id, previousCardId })

  const { dataDeck, isLoadingDeck, isFetchingDeck, isSuccessDeck } = useGetDataForPack()

  const [openAnswer, setOpenAnswer] = useState(false)

  useLayoutEffect(() => {
    setOpenAnswer(false)
  }, [dataCard])

  window.scrollTo(0, 0)

  const conditionRenderLoader = isLoading || isFetching || isLoadingDeck || isFetchingDeck

  const conditionRenderCards = isSuccess && isSuccessDeck && dataDeck && dataCard

  return (
    <>
      {conditionRenderLoader && <LoaderSquare />}
      <div className={s.learnContainer}>
        <div className={s.learnBackToDeckWrapper}>
          <BackToDeckLink className={s.linkBackToDeck} />
        </div>
        {conditionRenderCards && (
          <>
            {openAnswer ? (
              !conditionRenderLoader && (
                <Answer
                  nameCard={dataDeck?.name}
                  imageAnswer={dataCard?.answerImg}
                  answer={dataCard?.answer}
                  shots={dataCard?.shots}
                  cardID={dataCard?.id}
                  deckID={dataDeck?.id}
                  conditionRenderLoader={conditionRenderLoader}
                />
              )
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

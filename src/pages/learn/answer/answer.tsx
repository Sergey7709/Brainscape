import { useRef } from 'react'

import { clsx } from 'clsx'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'
import { RadioGroupAnswer } from '@/pages/learn/answer/radioGroupAnswer.tsx'
import { isGrade } from '@/pages/learn/constants-learn'
import s from '@/pages/learn/learn.module.scss'
import { useGradeCardMutation } from '@/service'
import { previousCardIdParams } from '@/shared/constants/constantsForSearchParams.ts'

type AnswerProps = {
  nameCard: string
  imageAnswer: string
  answer: string
  shots: number
  cardID: string
  deckID: string
  conditionRenderLoader?: boolean
}

export const Answer = ({
  nameCard,
  imageAnswer,
  shots,
  answer,
  cardID,
  deckID,
  conditionRenderLoader,
}: AnswerProps) => {
  const valueAnswer = useRef('')

  const [postGradeAnswer, { isLoading: isLoadingPost }] = useGradeCardMutation()

  const handlerValueAnswer = (value: string) => {
    valueAnswer.current = value
  }

  const handlerPostAnswer = () => {
    const grade = Number(valueAnswer.current)

    if (isGrade(grade)) {
      postGradeAnswer({
        id: deckID,
        body: {
          cardId: cardID,
          grade: grade,
        },
      })
      sessionStorage.setItem(previousCardIdParams, `${cardID}`)
    }
  }

  const classNameQuestion = clsx(s.learnCards, s.animateAnswer)

  return (
    <>
      {isLoadingPost && <Loader />}
      <Card className={classNameQuestion}>
        <Typography className={s.learnNamePack}>{`Learn "${nameCard}"`}</Typography>
        <div className={s.learnWrapper}>
          {imageAnswer && <img className={s.learnImg} src={imageAnswer} alt={'Not Image'} />}
          <Typography className={s.learnText}>{`Answer:  ${answer}`}</Typography>
          <Typography className={s.learnCount}>
            {`Количество попыток ответов на вопрос: ${shots}`}
          </Typography>
        </div>
        <div className={s.learnRadioGroupAnswer}>
          <Typography>{`Rate yourself:`}</Typography>
          <RadioGroupAnswer
            handlerValueAnswer={handlerValueAnswer}
            disabled={!!isLoadingPost || conditionRenderLoader}
          />
        </div>
        <Button onClick={handlerPostAnswer} fullWidth>
          <Typography className={s.learnButtonText}>Next Question</Typography>
        </Button>
      </Card>
    </>
  )
}

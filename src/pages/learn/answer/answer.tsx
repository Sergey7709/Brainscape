import { useState } from 'react'

import { clsx } from 'clsx'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'
import { RadioGroupAnswer } from '@/pages/learn/answer/radioGroupAnswer.tsx'
import { isGrade } from '@/pages/learn/constants-learn'
import s from '@/pages/learn/learn.module.scss'
import { useGradeCardMutation } from '@/service'

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
  const [gradeAnswer, setGradeAnswer] = useState('')
  const [postGradeAnswer, { isLoading: isLoadingPost }] = useGradeCardMutation()

  const handlerValueAnswer = (value: string) => {
    setGradeAnswer(value)
  }

  const handlerPostAnswer = () => {
    const grade = Number(gradeAnswer)

    if (isGrade(grade)) {
      postGradeAnswer({
        id: deckID,
        body: {
          cardId: cardID,
          grade: grade,
        },
      })
    } else {
      console.error('Invalid gradeAnswer:', gradeAnswer)
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

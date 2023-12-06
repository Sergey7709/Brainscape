import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import s from '@/pages/learn/learn.module.scss'

type QuestionProps = {
  nameCard: string
  imageQuestion: string
  question: string
  shots: number
  handlerLearn: (value: boolean) => void
}
export const Question = ({
  nameCard,
  imageQuestion,
  question,
  shots,
  handlerLearn,
}: QuestionProps) => {
  const readyJSX = nameCard && imageQuestion && question && shots

  console.log('readyJSX', readyJSX, nameCard, imageQuestion, question, shots)

  return (
    <>
      {
        <>
          <Typography className={s.learnNamePack}>{`Learn "${nameCard}"`}</Typography>
          <div className={s.learnQuestionWrapper}>
            {imageQuestion && (
              <img className={s.learnQuestionImg} src={imageQuestion} alt={'Not Image'} />
            )}
            <Typography className={s.learnQuestionText}>{`Question: ${question}`}</Typography>
            <Typography className={s.learnCount}>
              {`Количество попыток ответов на вопрос: ${shots}`}
            </Typography>
          </div>
          <Button onClick={() => handlerLearn(true)} fullWidth>
            <Typography className={s.learnButtonText}>Show Answer</Typography>
          </Button>
        </>
      }
    </>
  )
}
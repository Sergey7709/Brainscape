import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import s from '@/pages/learn/learn.module.scss'

type QuestionProps = {
  nameCard: string
  imageQuestion: string
  question: string
  shots: number
  handlerLearn: (value: boolean) => void
  isLoading: boolean
  isFetching: boolean
}
export const Question = ({
  nameCard,
  imageQuestion,
  question,
  shots,
  handlerLearn,
  isLoading,
  isFetching,
}: QuestionProps) => {
  return (
    <>
      {(isLoading || isFetching) && !imageQuestion && nameCard ? null : (
        <>
          <Typography className={s.learnNamePack}>{`Learn "${nameCard}"`}</Typography>
          <div className={s.learnWrapper}>
            {imageQuestion && <img className={s.learnImg} src={imageQuestion} alt={'Not Image'} />}
            <Typography className={s.learnText}>{`Question: ${question}`}</Typography>
            <Typography className={s.learnCount}>
              {`Number of attempts to answer the question: ${shots}`}
            </Typography>
          </div>
          <Button onClick={() => handlerLearn(true)} fullWidth>
            <Typography className={s.learnButtonText}>Show Answer</Typography>
          </Button>
        </>
      )}
    </>
  )
}

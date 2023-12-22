// import React from 'react'

import { ChangeEvent, useRef, useState } from 'react'

import s from './imageUploader.module.scss'

import { ChangePhoto } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

// import { FieldName } from 'react-hook-form'

interface A {
  // value: FileList | undefined
  value: FileList | undefined
  // onChange: (e: FileList) => void
  onChange: (e: FileList | undefined) => void
  // resetField: () => void
  resetField: (name: string) => void
  nameFieldCover: string ///!!!!
  initialCover: string ///!!!!
}

export const Test = ({ value, onChange, resetField, initialCover, nameFieldCover }: A) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)
  // const [cover, setCover] = useState<string | undefined>(value?.fileName)
  const initialValue = (value && URL.createObjectURL(value?.[0])) ?? initialCover
  const [cover, setCover] = useState<string | undefined>(initialValue)

  const handleUploadedFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return
    onChange(files)
    setCover(URL.createObjectURL(files?.[0]))
  }

  const onUpload = () => {
    hiddenInputRef.current?.click()
  }

  const handleDeletedFile = () => {
    onChange(undefined)
    resetField(nameFieldCover)
    setCover('')
  }

  console.log(value, initialCover)

  return (
    <>
      <div className={s.modalAddWrapper}>
        {/*<img*/}
        {/*  className={s.modalAddImageCover}*/}
        {/*  src={value ? URL.createObjectURL(value?.[0]) : undefined}*/}
        {/*/>*/}
        <input
          ref={hiddenInputRef}
          type={'file'}
          accept="image/*"
          className={s.modalAddInputCover}
          onChange={handleUploadedFile}
        />
        {/*<button onClick={onUpload}> Click to add a cover, max size 1MB.</button>*/}
        <Button
          as={'button'}
          type={'button'}
          variant="secondary"
          className={s.modalAddButtonCover}
          onClick={onUpload}
        >
          {cover ? (
            <>
              <img
                className={s.modalAddImageCover}
                // src={value ? URL.createObjectURL(value?.[0]) : undefined}
                src={value ? URL.createObjectURL(value?.[0]) : initialCover}
                alt="Not Image"
              />
              <Typography variant={'subtitle2'} className={s.textCoverPreview}>
                This preview in cover, click to change.
              </Typography>
            </>
          ) : (
            <>
              <ChangePhoto onClick={() => {}} />
              Click to add a cover, max size 1MB.
            </>
          )}
        </Button>
        {cover && (
          <Typography variant={'caption'} className={s.deleteCover} onClick={handleDeletedFile}>
            ❌
          </Typography>
        )}
      </div>
    </>
  )
}

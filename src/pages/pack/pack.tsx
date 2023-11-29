import { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './pack.module.scss'

import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { TextField } from '@/components/ui/textField'
import { useGetDataForPack } from '@/pages/pack/hooks'
import { PackPanel } from '@/pages/pack/packPanel'
import { PackSearch } from '@/pages/pack/packSearch'
import { TablePack } from '@/pages/pack/tablePack'
import { packFindNameReducer, useAppDispatch } from '@/service'
import {
  milliSecondsValue,
  useCombineAppSelector,
  useDebounce,
  useIsFirstRender,
  useUtilityForSearchParamsEdit,
} from '@/utils'

export const Pack = () => {
  const {
    isLoadingAuth,
    isLoadingDeck,
    isFetchingDeck,
    isLoadingCards,
    isFetchingCards,
    isSuccessCards,
    itemsPerPage,
    totalItems,
    totalPages,
    paginationValueInURL,
  } = useGetDataForPack()

  const isFirstRender = useIsFirstRender()
  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()

  // const dispatch = useAppDispatch()
  // const { packSearchValue } = useCombineAppSelector()
  // const [searchParams] = useSearchParams()
  // const findText = searchParams.get('question') || ''
  // const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()
  // const debounce = useDebounce({ value: packSearchValue, milliSeconds: milliSecondsValue })
  //
  // useEffect(() => {
  //   debounce !== findText &&
  //     utilityForSearchParamsEdit({
  //       param: 'question',
  //       valueForNewParam: debounce ? debounce : [],
  //     })
  //   isFirstRender && dispatch(packFindNameReducer({ packFindName: findText }))
  // }, [debounce])
  //
  // const handlerTextFieldChangeValue = (value: string) => {
  //   dispatch(packFindNameReducer({ packFindName: value }))
  // }

  const handlerPagination = (page: number) => {
    utilityForSearchParamsEdit({
      param: 'currentPage',
      valueForNewParam: page.toString() ?? '',
    })
  }

  const paginationReady =
    !isFetchingCards && isSuccessCards && (totalPages || 1) >= 1 && !!totalPages

  console.log('isFirstRender ', isFirstRender)

  return (
    <>
      {(isLoadingDeck || isFetchingDeck || isLoadingCards || isFetchingCards || isLoadingAuth) && (
        <Loader />
      )}
      <div className={s.containerPack}>
        <div className={s.pack}>
          <PackPanel />
          <PackSearch />
          {/*<div className={s.inputPackRowWrapper}>*/}
          {/*  <TextField*/}
          {/*    type={'search'}*/}
          {/*    placeholder={'Input search'}*/}
          {/*    onValueChange={handlerTextFieldChangeValue}*/}
          {/*    value={isFirstRender ? findText : packSearchValue}*/}
          {/*  />*/}
          {/*</div>*/}
          <TablePack />
          <div className={s.paginationWrapperPack}>
            {paginationReady && (
              <Pagination
                currentPage={paginationValueInURL}
                pageSize={itemsPerPage ?? 0}
                totalCount={totalItems ?? 0}
                onPageChange={page => handlerPagination(page)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

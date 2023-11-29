import { useNavigate } from 'react-router-dom'

import s from './pack.module.scss'

import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { TextField } from '@/components/ui/textField'
import { useGetDataForPack } from '@/pages/pack/hooks'
import { PackPanel } from '@/pages/pack/packPanel'
import { TablePack } from '@/pages/pack/tablePack'
import { useIsFirstRender, useUtilityForSearchParamsEdit } from '@/utils'

export const Pack = () => {
  const navigate = useNavigate()

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

  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()

  const handlerPagination = (page: number) => {
    utilityForSearchParamsEdit({
      param: 'currentPage',
      valueForNewParam: page.toString() ?? '',
    })
  }

  const navigateBackToDeck = () => {
    const urlDeck = sessionStorage.getItem('previousPath')

    if (urlDeck) {
      navigate(`/deck${urlDeck}`)
    } else {
      navigate('/deck')
    }
  }

  const paginationReady =
    !isFetchingCards && isSuccessCards && (totalPages || 1) >= 1 && !!totalPages

  const isFirstRender = useIsFirstRender()

  console.log('isFirstRender ', isFirstRender)

  return (
    <>
      {(isLoadingDeck || isFetchingDeck || isLoadingCards || isFetchingCards || isLoadingAuth) && (
        <Loader />
      )}
      <div className={s.containerPack}>
        <div className={s.pack}>
          <PackPanel navigateBackToDeck={navigateBackToDeck} />
          <div className={s.inputPackRowWrapper}>
            <TextField type={'search'} placeholder={'Input search'} />
          </div>
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

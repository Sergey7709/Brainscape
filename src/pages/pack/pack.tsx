import s from './pack.module.scss'

import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { useGetDataForPack } from '@/pages/pack/hooks'
import { PackPanel } from '@/pages/pack/packPanel'
import { PackSearch } from '@/pages/pack/packSearch'
import { TablePack } from '@/pages/pack/tablePack'
import { useIsFirstRender, useUtilityForSearchParamsEdit } from '@/utils'

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

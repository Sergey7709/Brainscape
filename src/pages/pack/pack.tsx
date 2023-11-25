import { useMemo } from 'react'

import { NavLink, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import s from './pack.module.scss'

import { ArrowLeftFull } from '@/assets/icons/arrow-left-full.tsx'
import { Elipse } from '@/assets/icons/elipse.tsx'
import { MoreVerticalOutline } from '@/assets/icons/more-vertical-outline.tsx'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { Sort, Table } from '@/components/ui/tables'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { useDataSort } from '@/pages/decks/hooks-and-functions/useDataSort.ts'
import { utilitySearchParams } from '@/pages/decks/hooks-and-functions/utilitySearchParams.ts'
import { columnsPack } from '@/pages/pack/constantsPack.ts'
import { PackRow } from '@/pages/pack/pack-row/pack-row.tsx'
import { currentPageValue, useGetDeckByIdCardsQuery, useGetDeckByIdQuery } from '@/service'
import { useIsFirstRender, useUtilityForSearchParamsEdit } from '@/utils'

export const Pack = () => {
  const navigate = useNavigate()

  const packId = useParams() ///!!!!??????

  const { data, isSuccess, isLoading, isFetching } = useGetDeckByIdQuery(packId.id ?? '')

  const {
    data: dataCards,
    isSuccess: isSuccessCards,
    isLoading: isLoadingCards,
    isFetching: isFetchingCards,
  } = useGetDeckByIdCardsQuery({ id: packId.id ?? '', query: utilitySearchParams() })

  const { itemsPerPage, totalItems, totalPages } = dataCards?.pagination ?? {}

  const [searchParams] = useSearchParams()

  const paginationValueInURL = Number(searchParams.get('currentPage')) || currentPageValue

  const isFirstRender = useIsFirstRender() ///!!! Перенести в хук или функцию в utility

  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()

  const { sort } = useDataSort()
  const renderNoData = () => (
    <tr className={s.td}>
      <td colSpan={5}>
        <p className={s.textNoData}>Упс... данные отсутствуют</p>
      </td>
    </tr>
  ) ///!!! Перенести в хук или функцию в utility
  const sortedPackDataOrNothing = useMemo(
    () =>
      (!!dataCards?.items.length &&
        dataCards?.items.map(pack => (
          <PackRow key={pack.id} rating={data?.rating || 0} {...pack} />
        ))) ||
      (!dataCards?.items.length && !isFirstRender && renderNoData()),
    [dataCards]
  ) ///!!! Перенести в хук или функцию в utility

  const handlerSortValuePack = (sort: Sort) => {
    utilityForSearchParamsEdit({
      param: 'orderBy',
      valueForNewParam:
        sort?.key && sort?.direction !== null ? `${sort?.key}-${sort?.direction}` : [],
    })
  }

  const handlerPagination = (page: number) => {
    utilityForSearchParamsEdit({
      param: 'currentPage',
      valueForNewParam: page.toString() ?? '',
    })
  }

  const pagination = !!totalPages && (
    <Pagination
      currentPage={paginationValueInURL}
      pageSize={itemsPerPage ?? 0}
      totalCount={totalItems ?? 0}
      onPageChange={page => handlerPagination(page)}
    />
  )

  const navigateBackToDeck = () => {
    const from = sessionStorage.getItem('previousPath')

    if (from) {
      navigate(from)
    } else {
      navigate('/deck') // Замените на ваш путь по умолчанию
    }
  }

  return (
    <>
      {(isLoading || isFetching) && <Loader />}
      <div className={s.containerPack}>
        <div className={s.pack}>
          <Button variant={'link'} className={s.linkPackList} onClick={navigateBackToDeck}>
            <ArrowLeftFull />
            Back to Packs List
          </Button>
          <div className={s.containerTitleAndButton}>
            <div className={s.containerTitle}>
              <Typography variant={'large'}>My Pack</Typography>
              <Elipse className={s.packDropDown}>
                <MoreVerticalOutline />
              </Elipse>
            </div>
            <Button className={s.packButton}>Add New Card</Button>
          </div>
          <img src={data?.cover} alt={'Not found'} className={s.packImg} />
          <div className={s.inputPackRowWrapper}>
            <TextField type={'search'} placeholder={'Input search'} />
          </div>
          <Table.Root>
            <Table.Header
              columns={columnsPack}
              sort={sort}
              onSort={handlerSortValuePack}
              classNameForRow={s.packHeaderStyle}
            />
            {<Table.Body>{sortedPackDataOrNothing}</Table.Body>}
          </Table.Root>
          <div className={s.paginationWrapperPack}>
            {!isFetchingCards && isSuccessCards && (totalPages || 1) >= 1 && pagination}
          </div>
        </div>
      </div>
    </>
  )
}

import { useNavigate } from 'react-router-dom'

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
import { columnsPack } from '@/pages/pack/constantsPack.ts'
import { useGetDataForPack } from '@/pages/pack/hooks'
import { RenderNoData } from '@/pages/pack/renderNoData'
import { SortedPackData } from '@/pages/pack/sortedPackData'
import { useUtilityForSearchParamsEdit } from '@/utils'

export const Pack = () => {
  const navigate = useNavigate()

  const {
    isLoadingAuth,
    dataMeId,
    dataDeck,
    isLoadingDeck,
    isFetchingDeck,
    dataCards,
    isLoadingCards,
    isFetchingCards,
    isSuccessCards,
    itemsPerPage,
    totalItems,
    totalPages,
    paginationValueInURL,
    sort,
  } = useGetDataForPack()

  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()

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

  const navigateBackToDeck = () => {
    const urlDeck = sessionStorage.getItem('previousPath')

    if (urlDeck) {
      navigate(`/deck${urlDeck}`)
    } else {
      navigate('/deck')
    }
  }

  const pagination = !!totalPages && (
    <Pagination
      currentPage={paginationValueInURL}
      pageSize={itemsPerPage ?? 0}
      totalCount={totalItems ?? 0}
      onPageChange={page => handlerPagination(page)}
    />
  )

  return (
    <>
      {(isLoadingDeck || isFetchingDeck || isLoadingCards || isFetchingCards || isLoadingAuth) && (
        <Loader />
      )}
      <div className={s.containerPack}>
        <div className={s.pack}>
          <Button variant={'link'} className={s.linkPackList} onClick={navigateBackToDeck}>
            <ArrowLeftFull />
            Back to Packs List
          </Button>
          <div className={s.containerTitleAndButton}>
            <div className={s.containerTitle}>
              <Typography variant={'large'}>
                {dataMeId?.id === dataDeck?.userId
                  ? `My Pack: "${dataDeck?.name}"`
                  : `Friend’s Pack: "${dataDeck?.name}"`}
              </Typography>
              <Elipse className={s.packDropDown}>
                <MoreVerticalOutline />
              </Elipse>
            </div>
            <Button className={s.packButton}>Add New Card</Button>
          </div>
          <img src={dataDeck?.cover} alt={'Not found'} className={s.packImg} />
          <div className={s.inputPackRowWrapper}>
            <TextField type={'search'} placeholder={'Input search'} />
          </div>
          <Table.Root>
            <Table.Header columns={columnsPack} sort={sort} onSort={handlerSortValuePack}>
              <Table.Head>
                <Table.Row className={s.packHeaderStyle}>
                  <Table.HeadCellList
                    className={s.packHeadCellListStyle}
                    columns={columnsPack}
                    sort={sort}
                    onSort={handlerSortValuePack}
                  />
                </Table.Row>
              </Table.Head>
            </Table.Header>
            {
              <Table.Body>
                {dataCards ? (
                  <SortedPackData items={dataCards.items} rating={dataDeck?.rating || 0} />
                ) : (
                  <RenderNoData />
                )}
              </Table.Body>
            }
          </Table.Root>
          <div className={s.paginationWrapperPack}>
            {!isFetchingCards && isSuccessCards && (totalPages || 1) >= 1 && pagination}
          </div>
        </div>
      </div>
    </>
  )
}

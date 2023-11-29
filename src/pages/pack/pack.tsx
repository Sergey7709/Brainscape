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
import { PackPanel } from '@/pages/pack/packPanel'
import { RenderNoData } from '@/pages/pack/renderNoData'
import { SortedPackData } from '@/pages/pack/sortedPackData'
import { TablePack } from '@/pages/pack/tablePack'
import { useIsFirstRender, useUtilityForSearchParamsEdit } from '@/utils'

export const Pack = () => {
  const navigate = useNavigate()

  const {
    // isLoadingAuth,
    // dataMeId,
    // dataDeck,
    // isLoadingDeck,
    // isFetchingDeck,
    // dataCards,
    isLoadingCards,
    isFetchingCards,
    isSuccessCards,
    itemsPerPage,
    totalItems,
    totalPages,
    paginationValueInURL,
    // sort,
  } = useGetDataForPack()

  // const mePackCards = dataMeId?.id === dataDeck?.userId

  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()

  // const handlerSortValuePack = (sort: Sort) => {
  //   utilityForSearchParamsEdit({
  //     param: 'orderBy',
  //     valueForNewParam:
  //       sort?.key && sort?.direction !== null ? `${sort?.key}-${sort?.direction}` : [],
  //   })
  // }

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
  // console.log('dataCards', dataCards)

  return (
    <>
      {/*{(isLoadingDeck || isFetchingDeck || isLoadingCards || isFetchingCards || isLoadingAuth) && (*/}
      {/*  <Loader />*/}
      {/*)}*/}
      {(isLoadingCards || isFetchingCards) && <Loader />}
      <div className={s.containerPack}>
        <div className={s.pack}>
          <PackPanel navigateBackToDeck={navigateBackToDeck} />
          {/*<Button variant={'link'} className={s.linkPackList} onClick={navigateBackToDeck}>*/}
          {/*  <ArrowLeftFull />*/}
          {/*  Back to Packs List*/}
          {/*</Button>*/}
          {/*<div className={s.containerTitleAndButton}>*/}
          {/*  <div className={s.containerTitle}>*/}
          {/*    {mePackCards ? (*/}
          {/*      <>*/}
          {/*        <Typography variant={'large'}>{`My Pack: "${dataDeck?.name || ''}"`}</Typography>*/}
          {/*        <Elipse className={s.packDropDown}>*/}
          {/*          <MoreVerticalOutline />*/}
          {/*        </Elipse>*/}
          {/*      </>*/}
          {/*    ) : (*/}
          {/*      <Typography variant={'large'}>*/}
          {/*        {`Friend’s Pack: "${dataDeck?.name || ''}"`}*/}
          {/*      </Typography>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*  <Button className={s.packButton}>Add New Card</Button>*/}
          {/*</div>*/}
          {/*<img src={dataDeck?.cover} alt={'Not found'} className={s.packImg} />*/}
          <div className={s.inputPackRowWrapper}>
            <TextField type={'search'} placeholder={'Input search'} />
          </div>
          <TablePack />
          {/*<Table.Root>*/}
          {/*  <Table.Header columns={columnsPack} sort={sort} onSort={handlerSortValuePack}>*/}
          {/*    <Table.Head>*/}
          {/*      <Table.Row className={s.packHeaderStyle}>*/}
          {/*        <Table.HeadCellList*/}
          {/*          className={s.packHeadCellListStyle}*/}
          {/*          columns={columnsPack}*/}
          {/*          sort={sort}*/}
          {/*          onSort={handlerSortValuePack}*/}
          {/*        />*/}
          {/*      </Table.Row>*/}
          {/*    </Table.Head>*/}
          {/*  </Table.Header>*/}
          {/*  <Table.Body>*/}
          {/*    {dataCards?.items.length ? (*/}
          {/*      // <SortedPackData*/}
          {/*      //   items={dataCards.items}*/}
          {/*      //   rating={dataDeck?.rating || 0}*/}
          {/*      //   mePackCards={mePackCards}*/}
          {/*      // />*/}
          {/*      <SortedPackData />*/}
          {/*    ) : (*/}
          {/*      dataCards?.items !== undefined && <RenderNoData />*/}
          {/*    )}*/}
          {/*  </Table.Body>*/}
          {/*</Table.Root>*/}
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

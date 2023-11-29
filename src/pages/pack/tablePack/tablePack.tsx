import { Sort, Table } from '@/components/ui/tables'
import { columnsPack } from '@/pages/pack/constantsPack.ts'
import { useGetDataForPack } from '@/pages/pack/hooks'
import s from '@/pages/pack/pack.module.scss'
import { RenderNoData } from '@/pages/pack/renderNoData'
import { SortedPackData } from '@/pages/pack/sortedPackData'
import { useUtilityForSearchParamsEdit } from '@/utils'

export const TablePack = () => {
  const { dataCards, sort } = useGetDataForPack()

  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()

  const handlerSortValuePack = (sort: Sort) => {
    utilityForSearchParamsEdit({
      param: 'orderBy',
      valueForNewParam:
        sort?.key && sort?.direction !== null ? `${sort?.key}-${sort?.direction}` : [],
    })
  }

  console.log('dataCards', dataCards)

  return (
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
      <Table.Body>
        {dataCards?.items.length ? (
          <SortedPackData />
        ) : (
          dataCards?.items !== undefined && <RenderNoData />
        )}
      </Table.Body>
    </Table.Root>
  )
}

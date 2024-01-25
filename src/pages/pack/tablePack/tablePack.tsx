import { Sort, Table } from '@/components/ui/tables'
import { columnsPack } from '@/pages/pack/constantsPack.ts'
import { SortedPackData } from '@/pages/pack/sortedPackData'
import s from '@/pages/pack/tablePack/tablePack.module.scss'
import { GetEntitiesResponse } from '@/service/common/types.ts'
import { PackCards } from '@/service/decks/decks.types.ts'
import { useUtilityForSearchParamsEdit } from '@/utils'
import { orderBy } from '@/utils/constants/constantsForSearchParams.ts'

type TablePackProps = {
  dataCards: GetEntitiesResponse<PackCards>
  sort: Sort
  mePackCards: boolean
}
export const TablePack = ({ dataCards, sort, mePackCards }: TablePackProps) => {
  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()

  const handlerSortValuePack = (sort: Sort) => {
    utilityForSearchParamsEdit({
      param: orderBy,
      valueForNewParam:
        sort?.key && sort?.direction !== null ? `${sort?.key}-${sort?.direction}` : [],
    })
  }

  return (
    <Table.Root>
      <Table.Header columns={columnsPack} sort={sort} onSort={handlerSortValuePack}>
        <Table.Head>
          <Table.Row className={mePackCards ? s.packHeaderMeStyle : s.packHeaderStyleFriend}>
            <Table.HeadCellList
              className={s.packHeadCellListStyle}
              columns={columnsPack}
              sort={sort}
              onSort={handlerSortValuePack}
            />
          </Table.Row>
        </Table.Head>
      </Table.Header>
      <Table.Body>{dataCards?.items.length ? <SortedPackData /> : <Table.Empty />}</Table.Body>
    </Table.Root>
  )
}

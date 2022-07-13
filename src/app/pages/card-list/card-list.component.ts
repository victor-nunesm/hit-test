import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { TableData } from '@core/models'
import { TableService } from '@pages/table/table.service'
import { map, Observable, startWith, switchMap } from 'rxjs'

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  data$: Observable<TableData[]>

  backCardBodyData = [
    {
      label: 'Pontos',
      path: 'pontos',
    },
    {
      label: 'Vitórias',
      path: 'vitorias',
    },
    {
      label: 'Empates',
      path: 'empates',
    },
    {
      label: 'Derrotas',
      path: 'derrotas',
    },
    {
      label: 'Gols Pro',
      path: 'gols_pro',
    },
    {
      label: 'Gols Contra',
      path: 'gols_contra',
    },
    {
      label: 'Saldo de Gols',
      path: 'saldo_gols',
    },
    {
      label: 'Aproveitamento',
      path: 'aproveitamento',
      suffix: '%',
    },
    {
      label: 'Variação de Posição',
      path: 'variacao_posicao',
    },
  ]
  filtersForm: FormGroup
  hasFilter: boolean

  constructor(private service: TableService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      name: [''],
      use: [''],
      balance: [''],
      wonLastGame: [false],
      lostLastGame: [false],
    })
    this.data$ = this.getFilteredData$()
  }

  clearFilters() {
    this.filtersForm.reset()
  }

  wonLastGameChange() {
    this.filtersForm.get('lostLastGame')?.setValue(false)
    const currValue = this.filtersForm.get('wonLastGame')?.value as boolean
    this.filtersForm.get('wonLastGame')?.setValue(!currValue)
  }
  lostLastGameChange() {
    this.filtersForm.get('wonLastGame')?.setValue(false)
    const currValue = this.filtersForm.get('lostLastGame')?.value as boolean
    this.filtersForm.get('lostLastGame')?.setValue(!currValue)
  }

  private getFilteredData$() {
    return this.filtersForm.valueChanges.pipe(
      startWith(this.filtersForm.value),
      switchMap((value) => {
        return this.service.getAll().pipe(
          map((data) => {
            const filters = this.getFiltersObject()
            let _data: TableData[] = []
            let hasFilter = value.name || value.balance || value.use || value.wonLastGame || value.lostLastGame

            for (const filterValName in value) {
              if (Object.prototype.hasOwnProperty.call(value, filterValName)) {
                const filterVal = value[filterValName]
                if (filterVal) {
                  _data.push(...(data.filter(filters[filterValName](value[filterValName])) || ([] as TableData[])))
                }
              }
            }

            this.hasFilter = hasFilter
            return [...new Set(hasFilter ? _data : data)]
          })
        )
      })
    )
  }

  private getFiltersObject() {
    return {
      name: this.filterDataByName,
      use: this.filterDataByUse,
      balance: this.filterDataByBalance,
      wonLastGame: this.filterDataByWonLastGame,
      lostLastGame: this.filterDataByLostLastGame,
    }
  }

  private filterDataByName(name: string) {
    return (value: TableData) => value.time.nome_popular.toLowerCase().includes(name.toLowerCase())
  }
  private filterDataByUse(use: number) {
    return (value: TableData) => value.aproveitamento >= use
  }
  private filterDataByBalance(balance: number) {
    return (value: TableData) => value.saldo_gols >= balance
  }
  private filterDataByWonLastGame(paramNotUsed: any) {
    return (value: TableData) => (value.ultimos_jogos[0] ? value.ultimos_jogos[0] : 'e') === 'v'
  }
  private filterDataByLostLastGame(paramNotUsed: any) {
    return (value: TableData) => (value.ultimos_jogos[0] ? value.ultimos_jogos[0] : 'e') === 'e'
  }
}

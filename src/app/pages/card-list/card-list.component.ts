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
  filters = [
    {
      name: 'name',
      defaultValue: '',
      function: (name: string) => (value: TableData) =>
        value.time.nome_popular.toLowerCase().includes(name.toLowerCase()),
    },
    {
      name: 'use',
      defaultValue: '',
      function: (use: number) => (value: TableData) => value.aproveitamento >= use,
    },
    {
      name: 'balance',
      defaultValue: '',
      function: (balance: number) => (value: TableData) => value.saldo_gols >= balance,
    },
    {
      name: 'wonLastGame',
      defaultValue: false,
      function: (paramNotUsed: any) => (value: TableData) =>
        (value.ultimos_jogos[0] ? value.ultimos_jogos[0] : 'e') === 'v',
    },
    {
      name: 'lostLastGame',
      defaultValue: false,
      function: (paramNotUsed: any) => (value: TableData) =>
        (value.ultimos_jogos[0] ? value.ultimos_jogos[0] : 'e') === 'd',
    },
  ]

  constructor(private service: TableService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filtersForm = this.createFiltersFormGroup()
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

  private createFiltersFormGroup() {
    return this.fb.group(this.getMapOfFormControlsDefaults())
  }

  private getFilteredData$() {
    return this.filtersForm.valueChanges.pipe(
      startWith(this.filtersForm.value),
      switchMap((formValue) => {
        return this.service.getAll().pipe(
          map((jsonResponseData) => {
            const filteredData: TableData[] = []

            for (const filterName in formValue) {
              if (Object.prototype.hasOwnProperty.call(formValue, filterName)) {
                const filterValue = formValue[filterName]
                if (filterValue) {
                  this.hasFilter = true
                  filteredData.push(
                    ...(jsonResponseData.filter(this.getMapOfFiltersFunctions()[filterName](filterValue)) ||
                      ([] as TableData[]))
                  )
                }
              }
            }

            return this.removeDuplicatesFromArray(this.hasFilter ? filteredData : jsonResponseData)
          })
        )
      })
    )
  }

  private removeDuplicatesFromArray(array: any[]) {
    return [...new Set(array)]
  }

  private getMapOfFormControlsDefaults() {
    return this.filters.reduce((acc, curr) => ({ ...acc, [curr.name]: [curr.defaultValue] }), {})
  }

  private getMapOfFiltersFunctions() {
    return this.filters.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.function }), {})
  }
}

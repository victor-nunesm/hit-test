import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Team } from '@core/models'
import { map, Observable, startWith } from 'rxjs'
import { CardListFilter } from './models'

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  data$: Observable<Team[]>
  rawData: Team[]

  backCardBodyData: CardListFilter[] = [
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
      function: (name: string) => (value: Team) => value.time.nome_popular.toLowerCase().includes(name.toLowerCase()),
    },
    {
      name: 'use',
      defaultValue: '',
      function: (use: number) => (value: Team) => value.aproveitamento >= use,
    },
    {
      name: 'balance',
      defaultValue: '',
      function: (balance: number) => (value: Team) => value.saldo_gols >= balance,
    },
    {
      name: 'wonLastGame',
      defaultValue: false,
      function: (paramNotUsed: any) => (value: Team) => (value.ultimos_jogos[0] ? value.ultimos_jogos[0] : 'e') === 'v',
    },
    {
      name: 'lostLastGame',
      defaultValue: false,
      function: (paramNotUsed: any) => (value: Team) => (value.ultimos_jogos[0] ? value.ultimos_jogos[0] : 'e') === 'd',
    },
  ]

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filtersForm = this.createFiltersFormGroup()
    this.rawData = this.route.snapshot.data['data']
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
      map((formValue: Record<string, any>) => {
        const filteredData: Team[] = []
        this.hasFilter = false

        for (const filterName in formValue) {
          if (Object.prototype.hasOwnProperty.call(formValue, filterName)) {
            const filterValue = formValue[filterName]
            if (filterValue) {
              this.hasFilter = true
              filteredData.push(
                ...(this.rawData.filter(this.getMapOfFiltersFunctions()[filterName](filterValue)) || ([] as Team[]))
              )
            }
          }
        }

        return this.removeDuplicatesFromArray<Team>(this.hasFilter ? filteredData : this.rawData)
      })
    )
  }

  private removeDuplicatesFromArray<T>(array: T[]) {
    return [...new Set(array)] as T[]
  }

  private getMapOfFormControlsDefaults() {
    return this.filters.reduce((acc, curr) => ({ ...acc, [curr.name]: [curr.defaultValue] }), {})
  }

  private getMapOfFiltersFunctions() {
    return this.filters.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.function }), {})
  }
}

export interface Team {
  posicao: number
  pontos: number
  time: Time
  jogos: number
  vitorias: number
  empates: number
  derrotas: number
  gols_pro: number
  gols_contra: number
  saldo_gols: number
  aproveitamento: number
  variacao_posicao: number
  ultimos_jogos: string[]
}

export interface Time {
  time_id: number
  nome_popular: string
  sigla: string
  escudo: string
}

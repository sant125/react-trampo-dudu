# Weather Viewer

## Informações do Aluno
**Nome:** Santiago Paiva
**Curso:** Sistemas de Informação
**Período:** 6º Período
**Disciplina:** Programação para Dispositivos Móveis

## Descrição do Projeto

Aplicativo cliente de previsão do tempo desenvolvido em React Native. O app consome a API fornecida pelo professor e exibe a previsão para os próximos dias da cidade especificada pelo usuário.

O aplicativo permite:
- Consultar previsão do tempo por cidade (formato: Cidade,Estado,País)
- Definir quantidade de dias da previsão
- Visualizar dados detalhados: data, descrição, temperaturas mín/máx, umidade e ícone

## Funcionalidades

- ✅ Entrada de cidade no formato "Cidade,Estado,País"
- ✅ Campo para número de dias (padrão: 7)
- ✅ Botão de consulta
- ✅ Requisição HTTP GET com parâmetros obrigatórios (city, days, APPID)
- ✅ Tratamento de erros (rede, HTTP, JSON inválido, campos vazios)
- ✅ Parsing do JSON retornado pela API
- ✅ Exibição em lista customizada com todos os dados
- ✅ Ícone emoji exibido diretamente do JSON (sem download externo)

## Tecnologias Utilizadas

- React Native com Expo
- JavaScript (ES6+)
- Fetch API para requisições HTTP
- FlatList para exibição da lista

## Como Executar

### Pré-requisitos
- Node.js instalado
- Expo CLI (`npm install -g expo-cli`)

### Passos

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd WeatherViewer
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

4. Escaneie o QR Code com o app Expo Go (Android/iOS) ou pressione:
   - `a` para Android
   - `i` para iOS
   - `w` para Web

## API Utilizada

**Base URL:** `http://agent-weathermap-env-env.eba-6pzgqekp.us-east-2.elasticbeanstalk.com`

**Endpoint:** `/api/weather`

**Método:** GET

**Parâmetros obrigatórios:**
- `city`: Cidade no formato "Cidade,Estado,País" (URL-encoded)
- `days`: Número de dias da previsão (ex: 7)
- `APPID`: Chave de acesso `AgentWeather2024_a8f3b9c1d7e2f5g6h4i9j0k1l2m3n4o5p6`

### Exemplo de URL

```
http://agent-weathermap-env-env.eba-6pzgqekp.us-east-2.elasticbeanstalk.com/api/weather?city=Passos%2CMG%2CBR&days=7&APPID=AgentWeather2024_a8f3b9c1d7e2f5g6h4i9j0k1l2m3n4o5p6
```

**Observação:** O parâmetro `city` é URL-encoded automaticamente pelo app (vírgulas são convertidas para `%2C`).

## Estrutura do JSON Retornado

```json
{
  "city": "Passos, MG, BR",
  "days": [
    {
      "date": "2025-12-16",
      "minTempC": 18.5,
      "maxTempC": 28.3,
      "description": "Parcialmente nublado",
      "humidity": 0.65,
      "icon": "⛅"
    }
  ]
}
```

## Observações Importantes

- ❌ **NÃO existe** parâmetro `units` - a resposta sempre vem em Celsius
- ✅ Temperaturas exibidas em **°C** (Celsius)
- ✅ Ícone é um **emoji** retornado no JSON (campo `icon`)
- ✅ Não há download de ícones externos
- ✅ Umidade é convertida de decimal para percentual (ex: 0.65 → 65%)

## Tratamento de Erros

O aplicativo trata os seguintes cenários:
- Sem conexão com internet
- Erro HTTP (servidor indisponível, erro 4xx/5xx)
- JSON inválido ou formato inesperado
- Parâmetros vazios ou inválidos
- URL malformada

Todos os erros são exibidos ao usuário via Alert com mensagens claras.

## Estrutura do Projeto

```
WeatherViewer/
├── App.js                          # Componente principal
├── src/
│   ├── components/
│   │   └── WeatherItem.js         # Item da lista customizado
│   ├── models/
│   │   └── ForecastDay.js         # Modelo de dados
│   ├── services/
│   │   └── WeatherAPI.js          # Lógica de requisição HTTP
│   └── config/
│       └── constants.js           # Configurações da API
├── package.json
└── README.md
```

## Autor

Santiago Paiva - 2025

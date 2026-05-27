# 🎲 Leik – Skjermfrie lekforslag for barn

En nettbasert app som bruker kunstig intelligens til å generere skjermfrie lekforslag for barn, tilpasset alder, antall barn og miljø.

## Om prosjektet

Leik er laget som en del av fagskoleeksamen i Frontend Essentials (PRO1001) ved Oslo Nye Fagskole. Appen lar foreldre, lærere og barnehageansatte raskt finne morsomme aktiviteter for barn uten skjerm.

## Sider

- **Forside** – Lekgenerator med skjema
- **Favoritter** – Lagrede lekforslag
- **Om oss** – Info om appen
- **Kontakt** – Kontaktskjema

## Teknologi

- HTML5, CSS3, JavaScript (ES6+)
- Anthropic Claude API (claude-haiku-4-5-20251001)
- localStorage for favoritter

## Kom i gang lokalt

1. Klon prosjektet:
```bash
   git clone https://github.com/Amandust/leik-app.git
```

2. Lag en fil `js/config.js` med din egen Anthropic API-nøkkel:
```js
   const API_KEY = 'din-nøkkel-her';
```

3. Åpne `index.html` med Live Server i VS Code

> ⚠️ `config.js` er lagt til i `.gitignore` og skal aldri lastes opp til GitHub.

## API

Appen bruker [Anthropic Claude API](https://console.anthropic.com). Du trenger en egen API-nøkkel for å kjøre appen lokalt. Nye kontoer får gratis kreditter til testing.

## Etiske hensyn

- Kun anonym informasjon sendes til API (alder, antall, miljø)
- Ingen persondata lagres
- Forslagene er AI-genererte og bør vurderes av en voksen

## Kjente begrensninger

- API-nøkkelen ligger i klientkode – ikke egnet for produksjon
- Kontaktskjemaet lagrer ikke meldinger (ingen backend)
- Favoritter slettes hvis nettleserdata tømmes

## Lighthouse-score

### Mobil
| Side | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| index.html | 99 | 100 | 100 | 100 |
| favoritter.html | 94 | 100 | 100 | 100 |
| om.html | 99 | 100 | 100 | 100 |
| kontakt.html | 100 | 100 | 100 | 100 |

### Desktop
| Side | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| index.html | 100 | 100 | 100 | 100 |
| favoritter.html | 77 | 100 | 100 | 100 |
| om.html | 100 | 100 | 100 | 100 |
| kontakt.html | 100 | 100 | 100 | 100 |

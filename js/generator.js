// Sender forespørsel til Anthropic API og henter lekforslag
async function hentLekforslag(antall, aldre, sted, utstyr) {

    // Bygger teksten som sendes til AI
    const melding = 'Foreslå 3 morsomme skjermfrie lekaktiviteter for ' + antall + ' barn ' +
        'i aldrene ' + aldre.join(', ') + ' år. ' +
        'De er ' + sted + '. ' +
        (utstyr ? 'Tilgjengelig utstyr: ' + utstyr + '. ' : '') +
        'Svar på norsk. For hvert forslag, skriv: ' +
        'NAVN: [navn] BESKRIVELSE: [2-3 setninger] TRENGER: [utstyr eller ingenting]';

    // Sender forespørsel til API
    const respons = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            messages: [{ role: 'user', content: melding }]
        })
    });

    const data = await respons.json();
console.log('API svar:', data);
return data.content[0].text;}
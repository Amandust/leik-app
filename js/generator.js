// =============================================
// GENERATOR.JS
// Håndterer API-kall og visning av resultater
// =============================================


// =============================================
// DEL 1: API-KALL
// Sender info til Anthropic og får svar tilbake
// =============================================

async function hentLekforslag(antall, aldre, sted, utstyr) {

    // Bygger meldingen som sendes til AI
    const melding = 'Foreslå 3 morsomme skjermfrie lekaktiviteter for ' + antall + ' barn ' +
        'i aldrene ' + aldre.join(', ') + ' år. ' +
        'De er ' + sted + '. ' +
        (utstyr ? 'Tilgjengelig utstyr: ' + utstyr + '. ' : '') +
        'Svar på norsk uten markdown eller stjerner. For hvert forslag, bruk nøyaktig dette formatet:\n' +
        'NAVN: [navn]\nBESKRIVELSE: [2-3 setninger]\nTRENGER: [utstyr eller ingenting]\n---';

    // Sender forespørsel til Anthropic API
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

    // Henter teksten fra svaret
    const data = await respons.json();
    return data.content[0].text;
}


// =============================================
// DEL 2: VISE RESULTATER
// Tar teksten fra AI og lager kort på siden
// =============================================

function visResultater(tekst) {
    const resultater = document.getElementById('resultater');
    const liste = document.getElementById('resultater-liste');
    
    // Tøm listen før vi fyller den med nye forslag
    liste.innerHTML = '';
    
    // Deler opp teksten på --- (hvert forslag er separert med ---)
    const forslag = tekst.split('---');
    
    forslag.forEach(function(enkeltForslag) {
        if (enkeltForslag.trim() === '') return; // hopp over tomme blokker

        // Plukker ut de tre feltene fra hvert forslag
        const navnMatch = enkeltForslag.match(/NAVN:\s*(.+)/);
        const beskrivelseMatch = enkeltForslag.match(/BESKRIVELSE:\s*([\s\S]+?)(?=TRENGER:)/);
        const trengMatch = enkeltForslag.match(/TRENGER:\s*([\s\S]+?)$/);

        const navn = navnMatch ? navnMatch[1].trim() : '';
        const beskrivelse = beskrivelseMatch ? beskrivelseMatch[1].trim() : '';
        const trenger = trengMatch ? trengMatch[1].trim() : '';

        // Lager ett kort per forslag
        const li = document.createElement('li');
        li.className = 'resultat-kort';
        li.innerHTML = 
            '<h3>' + navn + '</h3>' +
            '<p>' + beskrivelse + '</p>' +
            '<p><strong>Trenger:</strong> ' + trenger + '</p>';

        // Lager lagre-knappen separat for å unngå problemer med spesialtegn
        const knapp = document.createElement('button');
        knapp.textContent = '⭐ Lagre favoritt';
        knapp.addEventListener('click', function() {
            lagreFavoritt(navn, beskrivelse, trenger);
        });
        li.appendChild(knapp);
        liste.appendChild(li);
    });
    
    // Viser resultat-seksjonen og scroller ned til den
    resultater.hidden = false;
    resultater.scrollIntoView({ behavior: 'smooth' });
}


// =============================================
// DEL 3: FAVORITTER
// Lagrer og henter favoritter i nettleseren
// =============================================

function lagreFavoritt(navn, beskrivelse, trenger) {
    
    // Henter eksisterende favoritter fra localStorage
    const favoritter = JSON.parse(localStorage.getItem('favoritter') || '[]');
    
    // Sjekker om forslaget allerede er lagret
    const finnes = favoritter.some(function(f) { return f.navn === navn; });
    if (finnes) {
        alert('Dette forslaget er allerede lagret!');
        return;
    }
    
    // Legger til det nye forslaget og lagrer
    favoritter.push({ navn: navn, beskrivelse: beskrivelse, trenger: trenger });
    localStorage.setItem('favoritter', JSON.stringify(favoritter));
    alert('Lagret som favoritt! ⭐');
}
// Sender forespørsel til Anthropic API og henter lekforslag
async function hentLekforslag(antall, aldre, sted, utstyr) {

    // Bygger teksten som sendes til AI
    const melding = 'Foreslå 3 morsomme skjermfrie lekaktiviteter for ' + antall + ' barn ' +
        'i aldrene ' + aldre.join(', ') + ' år. ' +
        'De er ' + sted + '. ' +
        (utstyr ? 'Tilgjengelig utstyr: ' + utstyr + '. ' : '') +
        'Svar på norsk uten markdown eller stjerner. For hvert forslag, bruk nøyaktig dette formatet:\n' +
        'NAVN: [navn]\nBESKRIVELSE: [2-3 setninger]\nTRENGER: [utstyr eller ingenting]\n---';

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
    return data.content[0].text;
}

// Viser resultatene på siden
function visResultater(tekst) {
    const resultater = document.getElementById('resultater');
    const liste = document.getElementById('resultater-liste');
    
    liste.innerHTML = '';
    
    const forslag = tekst.split('---');
    
    forslag.forEach(function(enkeltForslag) {
        if (enkeltForslag.trim() === '') return;

        // Hent navn, beskrivelse og trenger
        const navnMatch = enkeltForslag.match(/NAVN:\s*(.+)/);
        const beskrivelseMatch = enkeltForslag.match(/BESKRIVELSE:\s*(.+)/);
        const trengMatch = enkeltForslag.match(/TRENGER:\s*(.+)/);

        const navn = navnMatch ? navnMatch[1].trim() : '';
        const beskrivelse = beskrivelseMatch ? beskrivelseMatch[1].trim() : '';
        const trenger = trengMatch ? trengMatch[1].trim() : '';

        const li = document.createElement('li');
        li.className = 'resultat-kort';
        li.innerHTML = 
            '<h3>' + navn + '</h3>' +
            '<p>' + beskrivelse + '</p>' +
            '<p><strong>Trenger:</strong> ' + trenger + '</p>' +
            '<button onclick="lagreFavoritt(\'' + navn + '\', \'' + beskrivelse + '\', \'' + trenger + '\')">' +
            '⭐ Lagre favoritt</button>';
        liste.appendChild(li);
    });
    
    resultater.hidden = false;
    resultater.scrollIntoView({ behavior: 'smooth' });
}

// Lagrer et forslag som favoritt i localStorage
function lagreFavoritt(navn, beskrivelse, trenger) {
    
    // Hent eksisterende favoritter
    const favoritter = JSON.parse(localStorage.getItem('favoritter') || '[]');
    
    // Sjekk om den allerede er lagret
    const finnes = favoritter.some(function(f) { return f.navn === navn; });
    if (finnes) {
        alert('Dette forslaget er allerede lagret!');
        return;
    }
    
    // Legg til ny favoritt
    favoritter.push({ navn: navn, beskrivelse: beskrivelse, trenger: trenger });
    localStorage.setItem('favoritter', JSON.stringify(favoritter));
    alert('Lagret som favoritt! ⭐');
}
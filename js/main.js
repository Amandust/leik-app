console.log('leik er klar!')

// Henter skjemaet fra HTML ved hjelp av id-en 'leik-form'
const skjema = document.getElementById('leik-form');

// Lytter etter at brukeren velger antall barn
const antallKnapper = document.querySelectorAll('input[name="antall"]');
const alderContainer = document.getElementById('alder-container');

antallKnapper.forEach(function(knapp) {
    knapp.addEventListener('change', function() {
        
        // Tøm container først
        alderContainer.innerHTML = '<p>Velg alder(e):</p>';
        
        // Lag tall 1-10 som checkboxes
        for (let i = 1; i <= 10; i++) {
            const div = document.createElement('div');
            div.className = 'radio-valg';
            div.innerHTML = 
                '<input type="checkbox" id="alder-' + i + '" name="alder" value="' + i + '">' +
                '<label for="alder-' + i + '">' + i + '</label>';
            alderContainer.appendChild(div);
        }
    });
});

// Lytter etter at brukeren trykker på "Klar.. ferdig.. LEIK!"-knappen
skjema.addEventListener('submit', function(e) {
    
    // Hindrer siden fra å laste på nytt når skjemaet sendes
    e.preventDefault();

    // Henter den valgte radio-knappen for antall barn
    const antallValgt = document.querySelector('input[name="antall"]:checked');
    
    // Henter den valgte radio-knappen for miljø
    const stedValgt = document.querySelector('input[name="sted"]:checked');
    
    // Henter teksten brukeren skrev inn i utstyr-feltet
    const utstyr = document.getElementById('utstyr').value;

    // Sjekker om brukeren har valgt antall barn
    if (!antallValgt) {
        alert('Velg antall barn!');
        return;
    }

    // Sjekker om brukeren har valgt miljø
    if (!stedValgt) {
        alert('Velg et miljø!');
        return;
    }

    // Henter selve verdiene
    const antall = antallValgt.value;
    const sted = stedValgt.value;

    console.log('Antall:', antall);
    console.log('Sted:', sted);
    console.log('Utstyr:', utstyr);
});
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

        // Hent alle alder-checkboxes
        const checkboxer = alderContainer.querySelectorAll('input[type="checkbox"]');

        checkboxer.forEach(function(cb) {
            cb.addEventListener('change', function() {
                
                // Tell hvor mange som er huket av
                const antallHuket = alderContainer.querySelectorAll('input:checked').length;
                
                // Finn maks antall basert på valgt gruppe
                const valgtAntall = document.querySelector('input[name="antall"]:checked').value;
                let maks;
                if (valgtAntall === '1') maks = 1;
                else if (valgtAntall === '2-3') maks = 3;
                else if (valgtAntall === '4-6') maks = 6;
                else maks = 10;

                // Deaktiver resten hvis maks er nådd
                checkboxer.forEach(function(annen) {
                    if (!annen.checked) {
                        annen.disabled = antallHuket >= maks;
                    }
                });
            });
        });

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

    // Henter alle valgte aldre
    const aldreValgt = alderContainer.querySelectorAll('input[name="alder"]:checked');
    const aldre = Array.from(aldreValgt).map(function(cb) { return cb.value; });

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

    // Kall API-funksjonen
    console.log('Sender til API...');
    
    hentLekforslag(antall, aldre, sted, utstyr)
        .then(function(resultat) {
            visResultater(resultat);
        })
        .catch(function(feil) {
            console.log('Feil:', feil);
            alert('Noe gikk galt. Prøv igjen!');
        });
});
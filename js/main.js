console.log('leik er klar!')

// Henter skjemaet fra HTML ved hjelp av id-en 'leik-form'
const skjema = document.getElementById('leik-form');
const antallKnapper = document.querySelectorAll('input[name="antall"]');
const alderContainer = document.getElementById('alder-container');

// Kjører bare på forsiden der skjemaet finnes
if (alderContainer) {
    antallKnapper.forEach(function(knapp) {
        knapp.addEventListener('change', function() {
            
            alderContainer.innerHTML = '<p>Velg alder(e):</p>';
            
            for (let i = 1; i <= 10; i++) {
                const div = document.createElement('div');
                div.className = 'radio-valg';
                div.innerHTML = 
                    '<input type="checkbox" id="alder-' + i + '" name="alder" value="' + i + '">' +
                    '<label for="alder-' + i + '">' + i + '</label>';
                alderContainer.appendChild(div);
            }

            const checkboxer = alderContainer.querySelectorAll('input[type="checkbox"]');

            checkboxer.forEach(function(cb) {
                cb.addEventListener('change', function() {
                    
                    const antallHuket = alderContainer.querySelectorAll('input:checked').length;
                    
                    const valgtAntall = document.querySelector('input[name="antall"]:checked').value;
                    let maks;
                    if (valgtAntall === '1') maks = 1;
                    else if (valgtAntall === '2-3') maks = 3;
                    else if (valgtAntall === '4-6') maks = 6;
                    else maks = 10;

                    checkboxer.forEach(function(annen) {
                        if (!annen.checked) {
                            annen.disabled = antallHuket >= maks;
                        }
                    });
                });
            });
        });
    });
}

// Kjører bare på forsiden der skjemaet finnes
if (skjema) {
    skjema.addEventListener('submit', function(e) {
        
        e.preventDefault();

        const antallValgt = document.querySelector('input[name="antall"]:checked');
        const stedValgt = document.querySelector('input[name="sted"]:checked');
        const utstyr = document.getElementById('utstyr').value;
        const aldreValgt = alderContainer.querySelectorAll('input[name="alder"]:checked');
        const aldre = Array.from(aldreValgt).map(function(cb) { return cb.value; });

        if (!antallValgt) {
            alert('Velg antall barn!');
            return;
        }

        if (!stedValgt) {
            alert('Velg et miljø!');
            return;
        }

        const antall = antallValgt.value;
        const sted = stedValgt.value;

        // Vis lasteindikator
        const laster = document.getElementById('laster');
        laster.hidden = false;

        // Deaktiver knappen mens vi venter
        const knapp = document.querySelector('button[type="submit"]');
        knapp.disabled = true;
        knapp.textContent = 'Genererer...';

        hentLekforslag(antall, aldre, sted, utstyr)
            .then(function(resultat) {
                // Skjul lasteindikator og aktiver knappen igjen
                laster.hidden = true;
                knapp.disabled = false;
                knapp.textContent = 'Klar.. ferdig.. LEIK!';
                visResultater(resultat);
            })
            .catch(function(feil) {
                // Skjul lasteindikator og aktiver knappen igjen
                laster.hidden = true;
                knapp.disabled = false;
                knapp.textContent = 'Klar.. ferdig.. LEIK!';
                console.log('Feil:', feil);
                alert('Noe gikk galt. Prøv igjen!');
            });
    });
}
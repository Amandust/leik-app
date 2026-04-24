// Henter favoritter fra localStorage og viser dem
function visFavoritter() {
    const liste = document.getElementById('favoritter-liste');
    const tomMelding = document.getElementById('tom-melding');
    
    // Hent favoritter
    const favoritter = JSON.parse(localStorage.getItem('favoritter') || '[]');
    
    // Vis tom melding hvis ingen favoritter
    if (favoritter.length === 0) {
        tomMelding.hidden = false;
        return;
    }
    
    // Vis hvert favoritt-kort
    favoritter.forEach(function(favoritt, index) {
        const li = document.createElement('li');
        li.className = 'resultat-kort';
        li.innerHTML = 
            '<h3>' + favoritt.navn + '</h3>' +
            '<p>' + favoritt.beskrivelse + '</p>' +
            '<p><strong>Trenger:</strong> ' + favoritt.trenger + '</p>' +
            '<button onclick="slettFavoritt(' + index + ')">🗑️ Slett</button>';
        liste.appendChild(li);
    });
}

// Sletter en favoritt
function slettFavoritt(index) {
    const favoritter = JSON.parse(localStorage.getItem('favoritter') || '[]');
    favoritter.splice(index, 1);
    localStorage.setItem('favoritter', JSON.stringify(favoritter));
    
    // Last siden på nytt
    location.reload();
}

// Kjør når siden lastes
visFavoritter();
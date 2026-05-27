// =============================================
// KONTAKT.JS
// Validering av kontaktskjemaet
// =============================================

const kontaktForm = document.getElementById('kontakt-form');

if (kontaktForm) {
    kontaktForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const navn = document.getElementById('navn').value.trim();
        const epost = document.getElementById('epost').value.trim();
        const melding = document.getElementById('melding').value.trim();

        // Tøm alle feilmeldinger først
        document.getElementById('navn-feil').textContent = '';
        document.getElementById('epost-feil').textContent = '';
        document.getElementById('melding-feil').textContent = '';

        // Valider og vis feil under riktig felt
        let harFeil = false;

        if (!navn) {
            document.getElementById('navn-feil').textContent = '🌿 Vennligst skriv inn navnet ditt.';
            harFeil = true;
        }

        if (!epost) {
            document.getElementById('epost-feil').textContent = '🌿 Vennligst skriv inn e-postadressen din.';
            harFeil = true;
        }

        if (!melding) {
            document.getElementById('melding-feil').textContent = '🌿 Vennligst skriv inn en melding.';
            harFeil = true;
        }

        // Stopp hvis det er feil
        if (harFeil) return;

        // Vis takkmelding og skjul skjema
        document.getElementById('takk-melding').hidden = false;
    });
}
const journalEntry = document.getElementById('journal-entry');
const saveEntry = document.getElementById('save-entry');
const message = document.getElementById('message');
const mood = document.getElementById('mood');
const toggleMusic = document.getElementById('toggle-music');
const backgroundMusic = document.getElementById('background-music');

saveEntry.addEventListener('click', async () => {
    const entry = journalEntry.value;
    const moodValue = mood.value;
    try {
        const response = await fetch('/api/journal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entry, mood: moodValue })
        });
        const data = await response.json();
        message.textContent = data.message;
        journalEntry.value = '';
    } catch (error) {
        console.error('Gagal menyimpan entri:', error);
    }
});

toggleMusic.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        toggleMusic.textContent = 'Pause';
    } else {
        backgroundMusic.pause();
        toggleMusic.textContent = 'Play';
    }
});
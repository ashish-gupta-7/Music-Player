// Get elements
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');

let isShuffle = false;
let isRepeat = false;

const volumeSlider = document.getElementById('volume-slider');

const toggleBtn = document.getElementById('toggleListBtn');
const songList = document.getElementById('songList');

// Song list
const songs = [
    {
        name: 'Hasi',
        title: 'First Song',
        artist: 'Artist 1'
    },
    {
        name: 'Humnava',
        title: 'Second Song',
        artist: 'Artist 2'
    },
    {
        name: 'Saaware',
        title: 'Third Song',
        artist: 'Artist 3'
    },{
        name: 'Millonare',
        title: 'Fourth Song',
        artist: 'Artist 4'
    },
    {
        name: 'TereSangYaara',
        title: 'Fifth Song',
        artist: 'Artist 5'
    },
    {
        name: 'AkhiyoSeGoliMaare',
        title: 'Sixth Song',
        artist: 'Artist 6'
    }
];

// Keep track of song
let songIndex = 0;

// Load initial song
loadSong(songs[songIndex]);

// Load song details
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = `music/${song.name}.m4a`;
    cover.src = `images/${song.name}.jpg`;
}

// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.innerText = '⏸️';
    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.innerText = '▶️';
    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Update current time
    updateTime(currentTime, currentTimeEl);

    // Update total duration
    if (!isNaN(duration)) {
        updateTime(duration, durationEl);
    }
}

// Set progress bar manually
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Update time format
function updateTime(time, element) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (seconds < 10) {
        element.innerText = `${minutes}:0${seconds}`;
    } else {
        element.innerText = `${minutes}:${seconds}`;
    }
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong); // Move to next song automatically


shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active');
});

repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active');
});


//

audio.addEventListener('ended', () => {
    if (isRepeat) {
        playSong(); // Replay current song
    } else if (isShuffle) {
        songIndex = Math.floor(Math.random() * songs.length);
        loadSong(songs[songIndex]);
        playSong();
    } else {
        nextSong(); // Play next normally
    }
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Toggle visibility of song list
toggleBtn.addEventListener('click', () => {
    songList.classList.toggle('show');
    toggleBtn.textContent = songList.classList.contains('show') ? '🔽 Hide Songs' : '🎵 Show Songs';
});

// Load song list dynamically
songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.innerText = `${index + 1}. ${song.displayName} - ${song.artist}`;
    li.addEventListener('click', () => {
        songIndex = index;
        loadSong(songs[songIndex]);
        playSong();
    });
    songList.appendChild(li);
});

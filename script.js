/**
 * script.js - Bamboo Docent Service 2026
 * 기능: SRT 파싱, 오디오 제어, 부드러운 가사 스크롤, 슬라이드쇼
 */

// --- 1. 상태 변수 ---
let currentTrackIndex = 0; 
let currentLyrics = [];    
let lastHighlightedIndex = -1; // 가사 중복 강조 방지
let currentSlideIndex = 0;
let slideshowImages = [];

// --- 2. DOM 요소 ---
const playerContainer = document.querySelector('.player-container'); 
const audioPlayer = document.getElementById('audio-player');
const nowPlayingTitle = document.getElementById('now-playing-title');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressSlider = document.getElementById('progress-slider');
const currentTimeText = document.getElementById('current-time-text');
const totalTimeText = document.getElementById('total-time-text');
const lyricsContainer = document.getElementById('lyrics-container');
const artworkImage = document.getElementById('artwork-image'); 
const volumeSlider = document.getElementById('volume-slider'); 
const welcomeOverlay = document.getElementById('welcome-overlay');
const startTourBtn = document.getElementById('start-tour-btn');
const welcomeSlideshow = document.getElementById('welcome-slideshow');
const playlistMenu = document.getElementById('playlist-menu');
const listToggleBtn = document.getElementById('list-toggle-btn');

// --- 3. 핵심 로직: SRT 파서 ---
function parseSRT(data) {
    const lines = data.split(/\r?\n/);
    const result = [];
    let currentItem = {};

    lines.forEach(line => {
        line = line.trim();
        if (!line) return;

        if (!isNaN(line)) {
            if (currentItem.text) result.push(currentItem);
            currentItem = {};
        } else if (line.includes(' --> ')) {
            currentItem.start_time = line.split(' --> ')[0].trim();
        } else {
            currentItem.text = currentItem.text ? currentItem.text + " " + line : line;
        }
    });
    if (currentItem.text) result.push(currentItem);
    return result;
}

// --- 4. 트랙 로드 및 재생 ---
async function loadTrack(trackIndex, autoplay = true) {
    if (trackIndex < 0 || trackIndex >= playlist.length) return;
    
    currentTrackIndex = trackIndex;
    const track = playlist[trackIndex];
    
    // 오디오 및 UI 설정
    audioPlayer.src = track.src;
    nowPlayingTitle.textContent = track.title;
    artworkImage.src = track.artworkSrc || "./images/default_artwork.jpg"; 
    
    // 가사 초기화
    lyricsContainer.innerHTML = ""; 
    currentLyrics = [];           
    lastHighlightedIndex = -1;

    // SRT 가사 로드
    if (track.lyricsSrc) {
        try {
            const response = await fetch(track.lyricsSrc);
            if (!response.ok) throw new Error("SRT 로드 실패");
            const srtData = await response.text();
            currentLyrics = parseSRT(srtData); 
            
            currentLyrics.forEach((line, index) => {
                const p = document.createElement('p');
                p.textContent = line.text;
                p.id = 'lyric-line-' + index;
                p.classList.add('lyric-line');
                
                const jumpTime = parseSrtTime(line.start_time);
                p.addEventListener('click', () => { 
                    audioPlayer.currentTime = jumpTime; 
                    if (audioPlayer.paused) togglePlayPause(); 
                });
                lyricsContainer.appendChild(p);
            });
        } catch (error) {
            console.error(error);
            lyricsContainer.innerHTML = "<p class='lyric-line'>가사를 불러올 수 없습니다.</p>";
        }
    }

    if (autoplay) {
        audioPlayer.play();
        playPauseBtn.textContent = "||";
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = "▶";
    }
}

// --- 5. 가사 스크롤 엔진 (TimeUpdate) ---
audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    
    // 진행바 업데이트
    progressSlider.value = currentTime;
    currentTimeText.textContent = formatTime(currentTime);
    const progressPercent = (audioPlayer.duration > 0) ? (currentTime / audioPlayer.duration) * 100 : 0;
    progressSlider.style.setProperty('--progress', `${progressPercent}%`);

    // 현재 하이라이트할 가사 인덱스 찾기
    let activeIndex = -1;
    for (let i = 0; i < currentLyrics.length; i++) {
        if (currentTime >= parseSrtTime(currentLyrics[i].start_time)) {
            activeIndex = i;
        } else {
            break;
        }
    }

    // 줄이 바뀔 때만 스크롤 실행
    if (activeIndex !== -1 && activeIndex !== lastHighlightedIndex) {
        lastHighlightedIndex = activeIndex;
        
        const allLines = lyricsContainer.querySelectorAll('.lyric-line');
        allLines.forEach(l => l.classList.remove('highlighted'));

        const activeLine = document.getElementById('lyric-line-' + activeIndex);
        if (activeLine) {
            activeLine.classList.add('highlighted');
            // 부드럽게 중앙으로 스크롤
            activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// --- 6. 기타 제어 함수 ---
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "||";
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = "▶";
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function parseSrtTime(srtTime) {
    if (!srtTime) return 0;
    const parts = srtTime.replace(',', '.').split(':');
    return parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
}

// --- 7. 초기화 및 이벤트 ---
window.addEventListener('load', () => {
    loadTrack(0, false);
    startWelcomeSlideshow();
    
    // 플레이리스트 메뉴 생성
    playlist.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.title;
        li.onclick = () => { loadTrack(index, true); toggleList(); };
        playlistMenu.appendChild(li);
    });
});

playPauseBtn.addEventListener('click', togglePlayPause);
startTourBtn.addEventListener('click', () => {
    welcomeOverlay.classList.add('hidden');
    togglePlayPause();
});

function toggleList() {
    playerContainer.classList.toggle('playlist-active');
    listToggleBtn.textContent = playerContainer.classList.contains('playlist-active') ? "목록 닫기" : "전체 작품 목록 보기";
}
listToggleBtn.onclick = toggleList;

// 슬라이드쇼 함수 (이전 로직 유지)
function startWelcomeSlideshow() {
    const images = playlist.map(t => t.artworkSrc).filter(s => s);
    images.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        welcomeSlideshow.appendChild(img);
        slideshowImages.push(img);
    });
    if (slideshowImages.length > 0) {
        slideshowImages[0].classList.add('visible');
        setInterval(() => {
            slideshowImages[currentSlideIndex].classList.remove('visible');
            currentSlideIndex = (currentSlideIndex + 1) % slideshowImages.length;
            slideshowImages[currentSlideIndex].classList.add('visible');
        }, 5000);
    }
}
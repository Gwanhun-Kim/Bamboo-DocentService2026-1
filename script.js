// script.js

// // --- 📍 1. 데이터베이스 (로컬 테스트용) ---
// const playlist = [
//     {
//         title: "[위로] - 김관훈",
//         src: "./audio/25_2 김관훈.mp3",
//         lyricsSrc: "./lyrics/25_2 김관훈.json",
//         artworkSrc: "./images/김관훈_대면전시_25_2.jpg"
//     },
//     {
//         title: "01. 첫 번째 작품",
//         src: "./audio/01.mp3",
//         lyricsSrc: "./lyrics/01.json",
//         artworkSrc: "./images/01_artwork.jpg"
//     },
//     {
//         title: "02. 두 번째 작품",
//         src: "./audio/02.mp3",
//         lyricsSrc: "./lyrics/02.json",
//         artworkSrc: "./images/02_artwork.jpg"
//     },
//     {
//         title: "03. 세 번째 작품",
//         src: "./audio/03.mp3",
//         lyricsSrc: "./lyrics/03.json",
//         artworkSrc: "./images/03_artwork.jpg"
//     },
//     {
//         title: "04. 네 번째 작품",
//         src: "./audio/04.mp3",
//         lyricsSrc: "./lyrics/04.json",
//         artworkSrc: "./images/04_artwork.jpg"
//     },
//     {
//         title: "05. 다섯 번째 작품",
//         src: "./audio/05.mp3",
//         lyricsSrc: "./lyrics/05.json",
//         artworkSrc: "./images/05_artwork.jpg"
//     }
// ];

// --- 2. 현재 상태 변수 ---
let currentTrackIndex = 0; 
let currentLyrics = [];    
// ▼▼▼ ★★★ (새로 추가) 슬라이드쇼용 변수 ★★★ ▼▼▼
let currentSlideIndex = 0;
let slideshowImages = [];
// ▲▲▲ ★★★ (새로 추가) ★★★ ▲▲▲

// --- 3. HTML 요소 가져오기 (DOM 조작) ---
const playerContainer = document.querySelector('.player-container'); 
const audioPlayer = document.getElementById('audio-player');
const nowPlayingTitle = document.getElementById('now-playing-title');
const prevBtn = document.getElementById('prev-btn');
const playPauseBtn = document.getElementById('play-pause-btn');
const nextBtn = document.getElementById('next-btn');
const listToggleBtn = document.getElementById('list-toggle-btn');
const playlistMenu = document.getElementById('playlist-menu');
const lyricsContainer = document.getElementById('lyrics-container');
const artworkImage = document.getElementById('artwork-image'); 
const volumeSlider = document.getElementById('volume-slider'); 
const progressSlider = document.getElementById('progress-slider');
const currentTimeText = document.getElementById('current-time-text');
const totalTimeText = document.getElementById('total-time-text');
const welcomeOverlay = document.getElementById('welcome-overlay');
const startTourBtn = document.getElementById('start-tour-btn');
// ▼▼▼ ★★★ (새로 추가) 슬라이드쇼 컨테이너 ★★★ ▼▼▼
const welcomeSlideshow = document.getElementById('welcome-slideshow');
// ▲▲▲ ★★★ (새로 추가) ★★★ ▲▲▲

// --- 4. 핵심 기능 함수들 ---
// ... (loadTrack, togglePlayPause, playNext, playPrev, createPlaylistMenu, toggleList 함수는 이전과 100% 동일) ...
async function loadTrack(trackIndex, autoplay = true) {
    if (trackIndex < 0 || trackIndex >= playlist.length) { console.error("Invalid track index:", trackIndex); return; }
    currentTrackIndex = trackIndex;
    const track = playlist[trackIndex];
    audioPlayer.src = track.src;
    nowPlayingTitle.textContent = track.title;
    artworkImage.src = track.artworkSrc || "./images/default_artwork.jpg"; 
    audioPlayer.onloadedmetadata = () => { const duration = audioPlayer.duration; progressSlider.max = duration; totalTimeText.textContent = formatTime(duration); };
    lyricsContainer.innerHTML = ""; 
    currentLyrics = [];           
    if (track.lyricsSrc) {
        try {
            const response = await fetch(track.lyricsSrc);
            if (!response.ok) throw new Error("가사 파일을 찾을 수 없습니다.");
            currentLyrics = await response.json(); 
            currentLyrics.forEach((line, index) => {
                const p = document.createElement('p');
                p.textContent = line.text;
                p.id = 'lyric-line-' + index;
                p.classList.add('lyric-line');
                const jumpTimeInSeconds = parseSrtTime(line.start_time);
                p.addEventListener('click', () => { audioPlayer.currentTime = jumpTimeInSeconds; if (audioPlayer.paused) { togglePlayPause(); } });
                lyricsContainer.appendChild(p);
            });
        } catch (error) { console.error("가사 로딩 실패:", error); lyricsContainer.innerHTML = "<p class='lyric-line'>가사를 불러오지 못했습니다.</p>"; }
    } else { lyricsContainer.innerHTML = "<p class='lyric-line'>등록된 가사가 없습니다.</p>"; }
    if (autoplay) { audioPlayer.play(); playPauseBtn.innerHTML = "||"; playPauseBtn.classList.remove('is-paused-icon'); }
    else { audioPlayer.pause(); playPauseBtn.innerHTML = "▶"; playPauseBtn.classList.add('is-paused-icon'); }
}
function togglePlayPause() {
    if (audioPlayer.paused) { audioPlayer.play(); playPauseBtn.innerHTML = "||"; playPauseBtn.classList.remove('is-paused-icon'); }
    else { audioPlayer.pause(); playPauseBtn.innerHTML = "▶"; playPauseBtn.classList.add('is-paused-icon'); }
}
function playNext() { currentTrackIndex++; if (currentTrackIndex >= playlist.length) currentTrackIndex = 0; loadTrack(currentTrackIndex, true); }
function playPrev() { currentTrackIndex--; if (currentTrackIndex < 0) currentTrackIndex = playlist.length - 1; loadTrack(currentTrackIndex, true); }
function createPlaylistMenu() {
    playlistMenu.innerHTML = ""; 
    playlist.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.title;
        li.addEventListener('click', () => { loadTrack(index, true); playerContainer.classList.remove('playlist-active'); listToggleBtn.textContent = "전체 작품 목록 보기"; });
        playlistMenu.appendChild(li);
    });
}
function toggleList() {
    playerContainer.classList.toggle('playlist-active');
    if (playerContainer.classList.contains('playlist-active')) { listToggleBtn.textContent = "목록 닫기"; }
    else { listToggleBtn.textContent = "전체 작품 목록 보기"; }
}


// --- 5. 이벤트 리스너 연결 ---
// ... (이전 코드와 100% 동일) ...
playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
listToggleBtn.addEventListener('click', toggleList); 
volumeSlider.addEventListener('input', (e) => { const value = e.target.value; audioPlayer.volume = value; const percent = value * 100; e.target.style.setProperty('--volume-progress', `${percent}%`); });
progressSlider.addEventListener('input', (e) => { audioPlayer.currentTime = e.target.value; });
audioPlayer.addEventListener('ended', () => { const isLastTrack = (currentTrackIndex === playlist.length - 1); if (isLastTrack) { loadTrack(0, false); } else { playNext(); } });
playerContainer.addEventListener('click', (event) => { if (playerContainer.classList.contains('playlist-active')) { if (event.target === playerContainer) { toggleList(); } } });
startTourBtn.addEventListener('click', () => {
    welcomeOverlay.classList.add('hidden');
    togglePlayPause();
});


// --- 6. 싱크 가사/진행률 핵심 엔진 (TimeUpdate) ---
let lastHighlightedIndex = -1; // (추가) 중복 실행 방지용 변수

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    currentTimeText.textContent = formatTime(currentTime);
    progressSlider.value = currentTime;
    
    const duration = audioPlayer.duration || 0;
    const progressPercent = (duration > 0) ? (currentTime / duration) * 100 : 0;
    progressSlider.style.setProperty('--progress', `${progressPercent}%`);

    // 현재 시간에 맞는 가사 인덱스 찾기
    let highlightedLineIndex = -1;
    for (let i = 0; i < currentLyrics.length; i++) {
        const lineStartTime = parseSrtTime(currentLyrics[i].start_time);
        if (currentTime >= lineStartTime) {
            highlightedLineIndex = i;
        } else {
            break;
        }
    }

    // 인덱스가 바뀌었을 때만 스크롤 및 하이라이트 실행
    if (highlightedLineIndex !== -1 && highlightedLineIndex !== lastHighlightedIndex) {
        lastHighlightedIndex = highlightedLineIndex;

        const allLines = lyricsContainer.querySelectorAll('.lyric-line');
        allLines.forEach(line => line.classList.remove('highlighted'));

        const lineToHighlight = document.getElementById('lyric-line-' + highlightedLineIndex);
        if (lineToHighlight) {
            lineToHighlight.classList.add('highlighted');

            // ★ 핵심: 부드러운 스크롤 처리
            lineToHighlight.scrollIntoView({
                behavior: 'smooth', // 부드럽게 이동
                block: 'center'     // 가사가 컨테이너 중앙에 오도록 함
            });
        }
    }
});


// --- 7. 페이지 진입점(Entry Point) 설정 ---
window.addEventListener('load', () => {
    createPlaylistMenu();
    
    // ▼▼▼ ★★★ (새로 추가) 슬라이드쇼 시작 ★★★ ▼▼▼
    startWelcomeSlideshow();
    // ▲▲▲ ★★★ (새로 추가) ★★★ ▲▲▲

    const urlParams = new URLSearchParams(window.location.search);
    const trackToPlay = urlParams.get('track');

    if (trackToPlay !== null) { 
        const trackIndex = parseInt(trackToPlay, 10);
        if (!isNaN(trackIndex) && trackIndex >= 0 && trackIndex < playlist.length) {
            loadTrack(trackIndex, true); 
            welcomeOverlay.classList.add('hidden'); 
        } else {
            loadTrack(0, false); 
        }
    } else {
        loadTrack(0, false); 
    }
    
    audioPlayer.volume = volumeSlider.value;
    const initialValue = volumeSlider.value;
    const initialPercent = initialValue * 100;
    volumeSlider.style.setProperty('--volume-progress', `${initialPercent}%`);
    progressSlider.style.setProperty('--progress', `0%`);
});


// --- 8. 헬퍼 함수들 ---

// ▼▼▼ ★★★ (새로 추가) 슬라이드쇼 함수 ★★★ ▼▼▼
/**
 * playlist에서 이미지를 가져와 슬라이드쇼를 시작합니다.
 */
function startWelcomeSlideshow() {
    // 1. playlist에서 이미지 경로만 추출
    const imageUrls = playlist
        .map(track => track.artworkSrc)
        .filter(src => src); // artworkSrc가 없는 항목 제외

    if (imageUrls.length === 0) return; // 이미지가 없으면 실행 안 함

    // 2. <img> 태그를 동적으로 생성하여 DOM에 추가
    imageUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        welcomeSlideshow.appendChild(img);
        slideshowImages.push(img); // 배열에 저장
    });

    // 3. 첫 번째 이미지 바로 표시
    slideshowImages[0].classList.add('visible');

    // 4. 5초마다 다음 슬라이드로 변경
    setInterval(nextSlide, 5000); 
}

/**
 * 다음 슬라이드를 보여줍니다.
 */
function nextSlide() {
    if (slideshowImages.length === 0) return;

    // 1. 현재 이미지 숨기기
    slideshowImages[currentSlideIndex].classList.remove('visible');

    // 2. 다음 인덱스 계산 (배열 끝이면 0으로)
    currentSlideIndex = (currentSlideIndex + 1) % slideshowImages.length;

    // 3. 다음 이미지 보이기
    slideshowImages[currentSlideIndex].classList.add('visible');
}
// ▲▲▲ ★★★ (새로 추가) ★★★ ▲▲▲


/**
 * SRT 시간 변환 함수
 */
function parseSrtTime(srtTime) {
    // ... (이전 코드와 100% 동일) ...
    if (!srtTime || typeof srtTime !== 'string') { return 0; }
    const parts = srtTime.split(',');
    if (parts.length !== 2) return 0; 
    const time = parts[0];
    const milliseconds = parts[1];
    const timeParts = time.split(':');
    if (timeParts.length !== 3) return 0; 
    const [hours, minutes, seconds] = timeParts;
    const ms = parseInt(milliseconds);
    if (isNaN(ms) || isNaN(parseInt(hours)) || isNaN(parseInt(minutes)) || isNaN(parseInt(seconds))) { return 0; }
    const totalSeconds = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds) + (ms / 1000);
    return totalSeconds;
}

/**
 * 시간 포맷 함수
 */
function formatTime(seconds) {
    // ... (이전 코드와 100% 동일) ...
    if (isNaN(seconds) || seconds === 0) { return "0:00"; }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedTime;
}


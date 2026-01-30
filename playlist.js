// playlist.js
const playlist = [
    {
        title: "[초록빛] - 강나연",
        src: "./audio/강나연_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/강나연_대면전시_25_2.srt",
        artworkSrc: "./images/강나연_대면전시_25_2.jpg"
    },
    {
        title: "[비상] - 강은지",
        src: "./audio/강은지_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/강은지_대면전시_25_2.srt",
        artworkSrc: "./images/강은지_대면전시_25_2.jpg"
    },
    {
        title: "[처음 만난 서울] - 공원명",
        src: "./audio/공원명_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/공원명_대면전시_25_2.srt",
        artworkSrc: "./images/공원명_대면전시_25_2.jpg"
    },
    {
        title: "[햇빛] - 권세린",
        src: "./audio/권세린_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/권세린_대면전시_25_2.srt",
        artworkSrc: "./images/권세린_대면전시_25_2.jpg"
    },
    {
        title: "[따릉이] - 권인준",
        src: "./audio/권인준_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/권인준_대면전시_25_2.srt",
        artworkSrc: "./images/권인준_대면전시_25_2.jpg"
    },
    {
        title: "[달콤한 기다림, 털 뭉치와 함께한 크리스마스] - 기나영",
        src: "./audio/기나영_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/기나영_대면전시_25_2.srt",
        artworkSrc: "./images/기나영_대면전시_25_2.jpg"
    },
    {
        title: "[고요한 물결 속 평안함] - 김건중",
        src: "./audio/김건중_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김건중_대면전시_25_2.srt",
        artworkSrc: "./images/김건중_대면전시_25_2.jpg"
    },
    {
        title: "[위로] - 김관훈",
        src: "./audio/김관훈_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김관훈_대면전시_25_2.srt",
        artworkSrc: "./images/김관훈_대면전시_25_2.jpg"
    },
    {
        title: "[처음이 있던 자리] - 김나은",
        src: "./audio/김나은_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김나은_대면전시_25_2.srt",
        artworkSrc: "./images/김나은_대면전시_25_2.jpg"
    },
    {
        title: "[사랑합니다,고맙습니다] - 김상완",
        src: "./audio/김상완_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김상완_대면전시_25_2.srt",
        artworkSrc: "./images/김상완_대면전시_25_2.jpg"
    },
    {
        title: "[익숙한 곳에서] - 김시현",
        src: "./audio/김시현_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김시현_대면전시_25_2.srt",
        artworkSrc: "./images/김시현_대면전시_25_2.jpg"
    },
    {
        title: "[첫방문] - 김유빈",
        src: "./audio/김유빈_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김유빈_대면전시_25_2.srt",
        artworkSrc: "./images/김유빈_대면전시_25_2.jpg"
    },
    {
        title: "[당신을 가장 설레게 만든 처음은 언제였나요?] - 김윤아",
        src: "./audio/김윤아_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김윤아_대면전시_25_2.srt",
        artworkSrc: "./images/김윤아_대면전시_25_2.jpg"
    },
    {
        title: "[현대인의 자전거] - 김은효",
        src: "./audio/김은효_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김은효_대면전시_25_2.srt",
        artworkSrc: "./images/김은효_대면전시_25_2.jpg"
    },
    {
        title: "[마지막] - 김정회",
        src: "./audio/김정회_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김정회_대면전시_25_2.srt",
        artworkSrc: "./images/김정회_대면전시_25_2.jpg"
    },
    {
        title: "[첫, 그리고 다음의 영원] - 김지영",
        src: "./audio/김지영_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김지영_대면전시_25_2.srt",
        artworkSrc: "./images/김지영_대면전시_25_2.jpg"
    },
    {
        title: "[머무는 것들] - 김채희",
        src: "./audio/김채희_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김채희_대면전시_25_2.srt",
        artworkSrc: "./images/김채희_대면전시_25_2.jpg"
    },
    {
        title: "[열기] - 김태호",
        src: "./audio/김태호_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김태호_대면전시_25_2.srt",
        artworkSrc: "./images/김태호_대면전시_25_2.jpg"
    },
    {
        title: "[그날의 바다] - 김현아",
        src: "./audio/김현아_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김현아_대면전시_25_2.srt",
        artworkSrc: "./images/김현아_대면전시_25_2.jpg"
    },
    {
        title: "[고요한 물결 속 평안함] - 김희선",
        src: "./audio/김희선_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/김희선_대면전시_25_2.srt",
        artworkSrc: "./images/김희선_대면전시_25_2.jpg"
    },
    {
        title: "[교차로] - 나윤서",
        src: "./audio/나윤서_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/나윤서_대면전시_25_2.srt",
        artworkSrc: "./images/나윤서_대면전시_25_2.jpg"
    },
    {
        title: "[첫 걸음] - 남태민",
        src: "./audio/남태민_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/남태민_대면전시_25_2.srt",
        artworkSrc: "./images/남태민_대면전시_25_2.jpg"
    },
    {
        title: "[어느 골목길] - 박서현",
        src: "./audio/박서현_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/박서현_대면전시_25_2.srt",
        artworkSrc: "./images/박서현_대면전시_25_2.jpg"
    },
    {
        title: "[With Lucie] - 박세연",
        src: "./audio/박세연_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/박세연_대면전시_25_2.srt",
        artworkSrc: "./images/박세연_대면전시_25_2.jpg"
    },
    {
        title: "[나의 첫번째 빨강] - 박지원",
        src: "./audio/박지원_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/박지원_대면전시_25_2.srt",
        artworkSrc: "./images/박지원_대면전시_25_2.jpg"
    },
    {
        title: "[파도] - 박현지",
        src: "./audio/박현지_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/박현지_대면전시_25_2.srt",
        artworkSrc: "./images/박현지_대면전시_25_2.jpg"
    },
    {
        title: "[처음의 자리] - 박혜린",
        src: "./audio/박혜린_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/박혜린_대면전시_25_2.srt",
        artworkSrc: "./images/박혜린_대면전시_25_2.jpg"
    },
    {
        title: "[집 속의 집] - 백승찬",
        src: "./audio/백승찬_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/백승찬_대면전시_25_2.srt",
        artworkSrc: "./images/백승찬_대면전시_25_2.jpg"
    },
    {
        title: "[홀로 선 처음] - 서우석",
        src: "./audio/서우석_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/서우석_대면전시_25_2.srt",
        artworkSrc: "./images/서우석_대면전시_25_2.jpg"
    },
    {
        title: "[실수] - 손승아",
        src: "./audio/손승아_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/손승아_대면전시_25_2.srt",
        artworkSrc: "./images/손승아_대면전시_25_2.jpg"
    },
    {
        title: "[나를 재촉하지 않던 시간] - 송용석",
        src: "./audio/송용석_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/송용석_대면전시_25_2.srt",
        artworkSrc: "./images/송용석_대면전시_25_2.jpg"
    },
    {
        title: "[첫 번째 시선] - 신성준",
        src: "./audio/신성준_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/신성준_대면전시_25_2.srt",
        artworkSrc: "./images/신성준_대면전시_25_2.jpg"
    },
    {
        title: "[당신은 더 아껴주길] - 안시연",
        src: "./audio/안시연_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/안시연_대면전시_25_2.srt",
        artworkSrc: "./images/안시연_대면전시_25_2.jpg"
    },
    {
        title: "[목표] - 안정현",
        src: "./audio/안정현_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/안정현_대면전시_25_2.srt",
        artworkSrc: "./images/안정현_대면전시_25_2.jpg"
    },
    {
        title: "[당신은 아름다운 파일럿] - 연도흠",
        src: "./audio/연도흠_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/연도흠_대면전시_25_2.srt",
        artworkSrc: "./images/연도흠_대면전시_25_2.jpg"
    },
    {
        title: "[이유] - 오민서",
        src: "./audio/오민서_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/오민서_대면전시_25_2.srt",
        artworkSrc: "./images/오민서_대면전시_25_2.jpg"
    },
    {
        title: "[첫눈,] - 원제연",
        src: "./audio/원제연_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/원제연_대면전시_25_2.srt",
        artworkSrc: "./images/원제연_대면전시_25_2.jpg"
    },
    {
        title: "[카피바라와의 첫 만남] - 윤여빈",
        src: "./audio/윤여빈_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/윤여빈_대면전시_25_2.srt",
        artworkSrc: "./images/윤여빈_대면전시_25_2.jpg"
    },
    {
        title: "[귀여우니까 괜찮아] - 이규영",
        src: "./audio/이규영_대면전시_25_2.mp3",
        lyricsSrc: "./lyrics/이규영_대면전시_25_2.srt",
        artworkSrc: "./images/이규영_대면전시_25_2.jpg"
    }
];
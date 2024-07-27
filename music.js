const playlist = [
    {
        songName: "Dil Bechara-Dil Bechara",
        songImg: "dil bechara.png",
        songSrc: "Dil Bechara - Dil Bechara 192 Kbps.mp3"
    },
    {
        songName: "Apna Bana Le-Bhediya",
        songImg: "apna bana le.png",
        songSrc: "Apna Bana Le - Bhediya 128 Kbps.mp3"
    },
    {
        songName: "Atak Gya-Badhaai Do",
        songImg: "atak gya.png",
        songSrc: "Atak Gaya Arijit Singh - Badhaai Do 128 Kbps.mp3"
    },
    {
        songName: "Bhool Bhulaiya 2 Title Track-Bhool Bhulaiya",
        songImg: "bhool bhulaiya.png",
        songSrc: "Bhool Bhulaiyaa 2 Title Track - Bhool Bhulaiyaa 2 128 Kbps.mp3"
    },
    {
        songName: "Channa Ve-Bhoot_Part One The Haunted Ship",
        songImg: "channa ve.png",
        songSrc: "Channa Ve - Bhoot - Part One The Haunted Ship 192 Kbps.mp3"
    },
    {
        songName: "Kesariya-Brahmastra",
        songImg: "kesariya.png",
        songSrc: "Kesariya - Brahmastra 128 Kbps.mp3"
    },
    {
        songName: "Kudi Nu Nachne De-Angrezi Medium",
        songImg: "kudi nu nachne de.png",
        songSrc: "Kudi Nu Nachne De - Angrezi Medium 192 Kbps.mp3"
    },
    {
        songName: "Naacho Naacho-RRR",
        songImg: "naacho naacho.png",
        songSrc: "Naacho Naacho - RRR 128 Kbps.mp3"
    },
    {
        songName: "Rangisari-Jugjugg Jeeyo",
        songImg: "rangisari.png",
        songSrc: "Rangisari - Jugjugg Jeeyo 128 Kbps.mp3"
    },
    {
        songName: "Tune Jo Na Kaha-New York",
        songImg: "tune jo na kaha.png",
        songSrc: "Tune Jo Na Kaha - New York 128 Kbps.mp3"
    }
];

var handle = document.getElementById('music');
var songName = document.getElementById('song-name');
var songImg = document.getElementById('song-img');
var play = document.getElementById('play');
var pause = document.getElementById('pause');
handle.controls = false;

function togglePlaylist() {
    document.getElementById('playlist').classList.toggle("togglePlaylist");
}

function togglePlay() {
    if (handle.paused || handle.ended) {
        play.style.display = 'none';
        pause.style.display = 'inline-block';
        handle.play();
    } else {
        pause.style.display = 'none';
        play.style.display = 'inline-block';
        handle.pause();
    }
}

function setVolume() {
    var volume = document.getElementById('volume');
    handle.volume = volume.value;
}

function loop() {
    handle.loop = !handle.loop;
    if (handle.loop) {
        document.getElementById('repeat').classList.add('repeat-active');
    } else {
        document.getElementById('repeat').classList.remove('repeat-active');
    }
}

function toggleMute() {
    if (!handle.muted) {
        document.getElementById('volume').value = "0";
    } else {
        document.getElementById('volume').value = handle.volume;
    }
    handle.muted = !handle.muted;
}

var duration = 0;
handle.onloadedmetadata = function () {
    duration = Math.floor(handle.duration);
};

function update() {
    var progress = document.getElementById('progress');
    if (handle.currentTime > 0) {
        progress.value = Math.floor((100 / handle.duration) * handle.currentTime);
    }
    var minDuration = Math.floor(duration / 60);
    var secDuration = duration - minDuration * 60;
    document.getElementById('song-duration').innerHTML = minDuration + ":" + secDuration;

    var time = Math.floor(handle.currentTime);
    var min = Math.floor(time / 60);
    var seconds = time - min * 60;
    if (seconds < 10) {
        document.getElementById('current-time').innerHTML = min + ":0" + seconds;
    } else {
        document.getElementById('current-time').innerHTML = min + ":" + seconds;
    }
}

var i = 0;
function next() {
    var prev = "id" + i;
    document.getElementById(prev).classList.remove("addClass");
    if (i < playlist.length - 1) {
        i = i + 1;
    } else {
        i = 0;
    }
    songImg.src = playlist[i].songImg;
    songName.innerHTML = playlist[i].songName;
    handle.src = playlist[i].songSrc;
    var current = "id" + i;
    document.getElementById(current).classList.add("addClass");
    document.getElementById('song-duration').innerHTML = "0:0";
    handle.play();
}

function back() {
    var prev = "id" + i;
    document.getElementById(prev).classList.remove("addClass");
    if (i > 0) {
        i = i - 1;
    }
    songImg.src = playlist[i].songImg;
    songName.innerHTML = playlist[i].songName;
    handle.src = playlist[i].songSrc;
    var current = "id" + i;
    document.getElementById(current).classList.add("addClass");
    document.getElementById('song-duration').innerHTML = "0:0";
    handle.play();
}

function songByChoice(e) {
    var prev = "id" + i;
    document.getElementById(prev).classList.remove("addClass");
    var get = e.id;
    i = parseInt(get.replace("id", ""));
    songImg.src = playlist[i].songImg;
    songName.innerHTML = playlist[i].songName;
    handle.src = playlist[i].songSrc;
    var current = "id" + i;
    document.getElementById(current).classList.add("addClass");
    handle.play();
}

var disableUpdate = false;
var progress = document.getElementById('progress');
progress.addEventListener('input', function () {
    disableUpdate = true;
    var progress = document.getElementById('progress').value;
    handle.currentTime = (progress / 100) * handle.duration;
});

if (!disableUpdate) {
    handle.addEventListener("timeupdate", update, false);
}

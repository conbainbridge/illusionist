/* JS for illusionist */

function isMobile() {
  var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
  if (mobile) {
    alert("This site is not optimized for mobile devices - yet!");
  }
};

// player
function spacebarPlay() { // spacebar to toggle play/pause
  window.addEventListener('keydown', function (event) {
    var audioElement = document.getElementById("audio-player");
    var key = event.which || event.keyCode;
    if (key === 32 && audioElement.paused == true) {
      audioElement.play();
      event.preventDefault();
      document.getElementById("play-button").value = 'PAUSE';
      myMove();
    } else if (key === 32 && audioElement.paused != true){
      audioElement.pause();
      event.preventDefault();
      document.getElementById("play-button").value = 'PLAY';
      myMove();
    };
  })
};
function togglePlay() { //button toggle play/pause
  var audioElement = document.getElementById("audio-player");
    if (audioElement.paused) {
      audioElement.play();
      document.getElementById("play-button").value = 'PAUSE';
    }
    else {
      audioElement.pause();
      document.getElementById("play-button").value = 'PLAY';
    }
};
function completeAudio() { // button behavior when audio ends
  document.getElementById("play-button").value = 'PLAY';
  var sliderVal = document.getElementById("slider").value;
    offMove();
};

var progSpot2 =  0;

function myMove() { // move and pause scroller
  var scroller= document.getElementById("scroller");
  var audioElement = document.getElementById("audio-player");
  var sliderVal = document.getElementById("slider").value;
  var pos = 0;
  var id = setInterval(frame, 140);
  function frame() {
    if (audioElement.paused){ // pause behavior
      timerThing = audioElement.currentTime;
      timerThing2 = timerThing.toFixed(0);
      progSpot = (timerThing2*1000)/142//140
      progSpot2 = progSpot.toFixed(0);
      console.log(progSpot2);
      clearInterval(id);
    } else if (progSpot2 != 0 && progSpot2 < 1400 && sliderVal < 196000){ // post-pause or scroll-spot behavior
      pos++;
      overall = Number(progSpot2)+Number(pos);
      scroller.style.left = overall + 'px';
      //console.log(overall);
      audioTime = overall*142;
      //console.log(audioTime);
      document.getElementById("slider").value = audioTime;
      if (audioTime == 196000 || progSpot2 == 1400) {
        offMove();
      }
    } else { // beginning play behavior
      pos++
      scroller.style.left = pos + 'px';
      audioTime = pos*142;
      document.getElementById("slider").value = audioTime;
      if (audioTime == 196000) {
        offMove();
      }
    }
  }
}
function offMove() { // stop audio and move scroller to start
  var audioElement = document.getElementById("audio-player");
  audioElement.pause();
  audioElement.currentTime = 0;
  document.getElementById("play-button").value = 'PLAY';
  var scroller= document.getElementById("scroller");
  var slider= document.getElementById("slider");
  var pos = 0;
  var progSpot2 = 0;
  var id = setInterval(frame, 140);
  function frame() {
    if (audioElement.paused){
      var scroller= document.getElementById("scroller");
      var slider= document.getElementById("slider");
      clearInterval(id);
      progSpot2 = 0;
      scroller.style.left =  0 + 'px';
      slider.value = 0;
    }
  }
}

// time slider
var sliderPos;
function slider() {
  var sliderVal = document.getElementById("slider").value;
  var audioElement = document.getElementById("audio-player");
  var scroller= document.getElementById("scroller");
  if (sliderVal <= 196000) {
    audioElement.pause();
    sliderPos = sliderVal/1000; // conversion msecs -> secs
    sliderPix = sliderVal/142; // conversion msecs -> pixels
    audioElement.currentTime = sliderPos;
    slideScroll = Math.round(sliderPix);
    scroller.style.left = slideScroll + 'px';
    progSpot2 = slideScroll;
    console.log(sliderPos);
    console.log(sliderPix);
  }
}

// infoContainer home
function timeStamp() {
  var audioElement = document.getElementById("audio-player");
  var secs = parseInt(audioElement.currentTime % 60);
  var mins = parseInt((audioElement.currentTime / 60) % 60);
  if (secs < 10) {
    document.getElementById("timeStamp").innerHTML = '';
    document.getElementById("timeStamp").innerHTML = mins + ':0' + secs + ' ';
  } else {
    document.getElementById("timeStamp").innerHTML = '';
    document.getElementById("timeStamp").innerHTML =mins + ':' + secs + ' ';
  }
};

// infoContainer home
function home() {
  document.getElementById("infoContainer").innerHTML = '';
  document.getElementById("infoContainer").innerHTML = '<h2>Welcome to The Illusionist roadmap!</h2>This song features seven different auditory illusions. Hover over the audio waveform to find the illusions and click to learn more about that specific illusion, or click an illusion name below to learn more!'+
  '<ul>'+
    '<li><span onclick="info1();hoverSpaceOn1()" class="linkList">Change Deafness</span></li>'+
    '<li><span onclick="info2();hoverSpaceOn2()" class="linkList">Scale Illusion</span></li>'+
    '<li><span onclick="info3();hoverSpaceOn3()" class="linkList">Circling Illusion</span></li>'+
    '<li><span onclick="info4();hoverSpaceOn4()" class="linkList">Shepard Tone</span></li>'+
    '<li><span onclick="info5();hoverSpaceOn5()" class="linkList">Binaural Beats</span></li>'+
    '<li><span onclick="info6();hoverSpaceOn6()" class="linkList">Continuity Illusion</span></li>'+
    '<li><span onclick="info7();hoverSpaceOn7()" class="linkList">Octave Illusion</span></li>'+
  '</ul>';
}

// infoContainer info1 - change deafness
function info1() {
  document.getElementById("infoContainer").innerHTML = '';
  document.getElementById("infoContainer").innerHTML = '<h2>Change Deafness</h2> '+
  '<span onclick="home();hoverSpaceOff1();hoverSpaceOff2();hoverSpaceOff3();hoverSpaceOff4();hoverSpaceOff5();hoverSpaceOff6();hoverSpaceOff7();" class="linkList">(home)</span><br/><br/>'+
  'This section slowly and gradually slides up in pitch by a whole note, then resets to the original pitches and does it a second time. The pitch changes so gradually it may be hard to even realize the pitches are changing! Ignoring the pitch changes, the chord progression is a simple: \'i-iv,\' but because the pitch resets after the first sequence, the transition cadence transforms from iv-i to v-i.'+
    '<ul>'+
      '<li>Try scrolling around in time in these sections: you may be able to hear more clearly how much the pitches really are different!</li>'+
    '</ul>';
}

// infoContainer info2 - Scale Illusion
function info2() {
  document.getElementById("infoContainer").innerHTML = '';
  document.getElementById("infoContainer").innerHTML = '<h2>Scale Illusion</h2> '+
  '<span onclick="home();hoverSpaceOff1();hoverSpaceOff2();hoverSpaceOff3();hoverSpaceOff4();hoverSpaceOff5();hoverSpaceOff6();hoverSpaceOff7();" class="linkList">(home)</span><br/><br/>'+
  'A descending and ascending scale-like pattern is bounced between left and right ears, but seems to be continuous because our brains love patterns.'+
    '<ul>'+
      '<li>Wearing headphones? Try taking one ear on and off to hear how the notes go from all over the place to fitting into the scale neatly.</li>'+
      '<li>This and several of the illusions used in this song were discovered by <a href="http://deutsch.ucsd.edu/psychology/pages.php?i=201" target="_blank">Diana Deutsche</a>.</li>'+
    '</ul>';
}

// infoContainer info3 - Circling Illusion
function info3() {
  document.getElementById("infoContainer").innerHTML = '';
  document.getElementById("infoContainer").innerHTML = '<h2>Circling Illusion</h2> '+
  '<span onclick="home();hoverSpaceOff1();hoverSpaceOff2();hoverSpaceOff3();hoverSpaceOff4();hoverSpaceOff5();hoverSpaceOff6();hoverSpaceOff7();" class="linkList">(home)</span><br/><br/>'+
  'The bass sound moves between the right and left ears, and changes slightly in volume, making it seem to circle around you.'+
    '<ul>'+
      '<li>Does it sound like the sound is moving clockwise around you? ...or counter-clockwise?</li>'+
      '<li>Like to read technical-jargon in research papers? I have <a href="https://www.frontiersin.org/articles/10.3389/fnhum.2014.01060/full" target="_blank">a paper</a> on a similar auditory illusion that also plays on a weakness in our spatial auditory perception.</li>'+
    '</ul>';
}

// infoContainer info4 - Shepard tone
function info4() {
  document.getElementById("infoContainer").innerHTML = '';
  document.getElementById("infoContainer").innerHTML = '<h2>Shepard Tone</h2> '+
  '<span onclick="home();hoverSpaceOff1();hoverSpaceOff2();hoverSpaceOff3();hoverSpaceOff4();hoverSpaceOff5();hoverSpaceOff6();hoverSpaceOff7();" class="linkList">(home)</span><br/><br/>'+
  'This tone, sliding gradually up in pitch, continues going up forever. This is because of the complexity of the sound: there are multiple octaves played at once, so as the higher octaves become too high, the next octave below is there below to take its place. A new low octave comes in when the lowest octave has moved high enough to make space for it.'+
    '<ul>'+
      '<li>Fun fact! In the video game \'Mario 64\' for Nintendo 64, the music that plays when you go up the endless staircase is designed on this illusion: if you listen you\'ll find that the music never stops seeming to get higher and higher!</li>'+
      '<li>This and several of the illusions used in this song were discovered by <a href="http://deutsch.ucsd.edu/psychology/pages.php?i=201" target="_blank">Diana Deutsche</a>.</li>'+
    '</ul>'+
    '<hr>'+
    '<h2>Change Deafness</h2>'+
    'This section slowly and gradually slides up in pitch by a whole note, then resets to the original pitches and does it a second time. The pitch changes so gradually it may be hard to even realize the pitches are changing! Ignoring the pitch changes, the chord progression is a simple: \'i-iv,\' but because the pitch resets after the first sequence, the transition cadence transforms from iv-i to v-i.'+
      '<ul>'+
        '<li>Try scrolling around in time in these sections: you may be able to hear more clearly how much the pitches really are different!</li>'+
      '</ul>';
}

// infoContainer info5 - Binaural Beats
function info5() {
  document.getElementById("infoContainer").innerHTML = '';
  document.getElementById("infoContainer").innerHTML = '<h2>Binaural Beats</h2> '+
  '<span onclick="home();hoverSpaceOff1();hoverSpaceOff2();hoverSpaceOff3();hoverSpaceOff4();hoverSpaceOff5();hoverSpaceOff6();hoverSpaceOff7();" class="linkList">(home)</span><br/><br/>'+
  'Pure tones are played in both the left and right ear, but are slightly different in pitch. If you listen carefully, it will seem as if there is rhythmic \'beating\' in these pure tones.'+
    '<ul>'+
      '<li>To get the best effect, try listening with headphones! Listen to the individual tones by isolating each ear.'+
      '<li>Binaural beats are thought by some to have hypnotic capabilities. Different frequencies are thought to encourage different psychological benefits like calming anxiety, aiding in focus, or even inducing <a href="https://en.wikipedia.org/wiki/Lucid_dream" target="_blank">lucid dreaming.</a></li>'+
    '</ul>';
}

// infoContainer info6 - Continuity illusion
function info6() {
  document.getElementById("infoContainer").innerHTML = '';
  document.getElementById("infoContainer").innerHTML = '<h2>Continuity Illusion</h2> '+
  '<span onclick="home();hoverSpaceOff1();hoverSpaceOff2();hoverSpaceOff3();hoverSpaceOff4();hoverSpaceOff5();hoverSpaceOff6();hoverSpaceOff7();" class="linkList">(home)</span><br/><br/>'+
  'A rhythmic higher tone plays with white noise between it. As the white noise gets louder, the rhythmic tone seems to become continuous. The image below shows a visual illusion that follow the same idea:'
}

// infoContainer info7 - Binaural Beats
function info7() {
  document.getElementById("infoContainer").innerHTML = '';
  document.getElementById("infoContainer").innerHTML = '<h2>Octave Illusion</h2> '+
  '<span onclick="home();hoverSpaceOff1();hoverSpaceOff2();hoverSpaceOff3();hoverSpaceOff4();hoverSpaceOff5();hoverSpaceOff6();hoverSpaceOff7();" class="linkList">(home)</span><br/><br/>'+
  'The first bar here plays a low-high-low-high octave pattern in the left ear. This pattern continues in the next two bars, but the opposite (high-low-high-low) is played in the left ear.'+
    '<ul class="linkList">'+
      '<li>To get the best effect, try listening with headphones! Listen to the individual tones by isolating each ear.'+
      '<li>Does it sound like the higher pitch is only in the right? Only in the left? In Both ears? Alternating?</li>'+
    '</ul>';
}

//illusion1
function hoverSpaceOn1() {
  var x = document.getElementById("illusion1");
  x.style.cursor = "pointer";
  x.style.opacity =  0.5;
  x.style.transition =  '0.3s';
}
function hoverSpaceOff1() {
  var x = document.getElementById("illusion1");
  x.style.cursor = "pointer";
  x.style.opacity =  0;
  x.style.transition =  '0.8s';
}

//illusion2
function hoverSpaceOn2() {
  var x = document.getElementById("illusion2");
  x.style.cursor = "pointer";
  x.style.opacity =  0.5;
  x.style.transition =  '0.3s';
}
function hoverSpaceOff2() {
  var x = document.getElementById("illusion2");
  x.style.cursor = "pointer";
  x.style.opacity =  0;
  x.style.transition =  '0.8s';
}

//illusion3
function hoverSpaceOn3() {
  var x = document.getElementById("illusion3");
  x.style.cursor = "pointer";
  x.style.opacity =  0.5;
  x.style.transition =  '0.3s';
}
function hoverSpaceOff3() {
  var x = document.getElementById("illusion3");
  x.style.cursor = "pointer";
  x.style.opacity =  0;
  x.style.transition =  '0.8s';
}

//illusion4
function hoverSpaceOn4() {
  var x = document.getElementById("illusion4");
  x.style.cursor = "pointer";
  x.style.opacity =  0.5;
  x.style.transition =  '0.3s';
}
function hoverSpaceOff4() {
  var x = document.getElementById("illusion4");
  x.style.cursor = "pointer";
  x.style.opacity =  0;
  x.style.transition =  '0.8s';
}

//illusion5
function hoverSpaceOn5() {
  var x = document.getElementById("illusion5");
  x.style.cursor = "pointer";
  x.style.opacity =  0.5;
  x.style.transition =  '0.3s';
}
function hoverSpaceOff5() {
  var x = document.getElementById("illusion5");
  x.style.cursor = "pointer";
  x.style.opacity =  0;
  x.style.transition =  '0.8s';
}

//illusion6
function hoverSpaceOn6() {
  var x = document.getElementById("illusion6");
  x.style.cursor = "pointer";
  x.style.opacity =  0.5;
  x.style.transition =  '0.3s';
}
function hoverSpaceOff6() {
  var x = document.getElementById("illusion6");
  x.style.cursor = "pointer";
  x.style.opacity =  0;
  x.style.transition =  '0.8s';
}

//illusion7
function hoverSpaceOn7() {
  var x = document.getElementById("illusion7");
  x.style.cursor = "pointer";
  x.style.opacity =  0.5;
  x.style.transition =  '0.3s';
}
function hoverSpaceOff7() {
  var x = document.getElementById("illusion7");
  x.style.cursor = "pointer";
  x.style.opacity =  0;
  x.style.transition =  '0.8s';
}

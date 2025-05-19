// Music player tracks
const musicTracks = [
  {
    title: "Lofi Study",
    url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
    category: "Lofi"
  },
  {
    title: "Chill Waves", 
    url: "https://cdn.pixabay.com/audio/2023/05/15/audio_7f62d9c07a.mp3",
    category: "Lofi"
  },
  {
    title: "Meme Time",
    url: "https://cdn.pixabay.com/audio/2023/03/06/audio_1e1b765acf.mp3", 
    category: "Meme"
  },
  {
    title: "Relaxed Vibe",
    url: "https://cdn.pixabay.com/audio/2022/10/25/audio_347971e07d.mp3",
    category: "Chill"
  }
];

// Initialize music player
let currentTrack = 0;
let isPlaying = false;

function initMusicPlayer() {
  const player = document.getElementById('music-player');
  const audio = document.getElementById('audio-player');
  const trackTitle = document.getElementById('track-title');
  const playBtn = document.getElementById('play-btn');
  
  // Comprehensive checks for all required elements
  const requiredElements = [player, audio, trackTitle, playBtn];
  if (requiredElements.some(el => !el)) {
    console.warn('One or more music player elements not found', {
      player: !!player,
      audio: !!audio,
      trackTitle: !!trackTitle,
      playBtn: !!playBtn
    });
    return;
  }
  
  // Make player draggable
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  player.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === player) {
      isDragging = true;
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, player);
    }
  }

  function dragEnd() {
    isDragging = false;
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }

  // Load first track
  loadTrack(0);

  // Set up error handling and event listeners
  setupAudioEventListeners(audio, playBtn);
}

function setupAudioEventListeners(audio, playBtn) {
  if (!audio || !playBtn) return;

  audio.addEventListener('error', (e) => {
    console.warn('Audio playback error:', e);
    // Try to load next track
    nextTrack();
  });

  audio.addEventListener('canplay', () => {
    // Enable play button when audio is ready
    playBtn.classList.remove('disabled');
  });

  audio.addEventListener('waiting', () => {
    // Indicate loading state
    playBtn.classList.add('loading');
  });

  audio.addEventListener('playing', () => {
    playBtn.classList.remove('loading');
  });
}

function loadTrack(trackIndex) {
  const audio = document.getElementById('audio-player');
  const trackTitle = document.getElementById('track-title');
  
  if (!audio || !trackTitle) {
    console.warn('Audio or track title elements not found');
    return;
  }
  
  try {
    audio.src = musicTracks[trackIndex].url;
    trackTitle.textContent = musicTracks[trackIndex].title;
    currentTrack = trackIndex;
    
    // Reset play state
    isPlaying = false;
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  } catch (error) {
    console.error('Error loading track:', error);
  }
}

function togglePlay() {
  const audio = document.getElementById('audio-player');
  const playBtn = document.getElementById('play-btn');
  
  if (!audio || !playBtn) {
    console.warn('Audio or play button elements not found');
    return;
  }
  
  try {
    if (isPlaying) {
      audio.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      audio.play().catch(error => {
        console.warn('Error playing audio:', error);
        // Provide user feedback
        playBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
      });
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    isPlaying = !isPlaying;
  } catch (error) {
    console.error('Toggle play error:', error);
  }
}

function nextTrack() {
  try {
    currentTrack = (currentTrack + 1) % musicTracks.length;
    loadTrack(currentTrack);
    
    if (isPlaying) {
      const audio = document.getElementById('audio-player');
      if (audio) {
        audio.play().catch(error => {
          console.warn('Error playing next track:', error);
        });
      }
    }
  } catch (error) {
    console.error('Next track error:', error);
  }
}

function prevTrack() {
  try {
    currentTrack = (currentTrack - 1 + musicTracks.length) % musicTracks.length;
    loadTrack(currentTrack);
    
    if (isPlaying) {
      const audio = document.getElementById('audio-player');
      if (audio) {
        audio.play().catch(error => {
          console.warn('Error playing previous track:', error);
        });
      }
    }
  } catch (error) {
    console.error('Previous track error:', error);
  }
}

function updateVolume(value) {
  const audio = document.getElementById('audio-player');
  if (audio) {
    try {
      audio.volume = parseFloat(value);
      localStorage.setItem('playerVolume', value);
    } catch (error) {
      console.error('Volume update error:', error);
    }
  }
}

function toggleMusicPlayer(visible) {
  const player = document.getElementById('music-player');
  if (player) {
    try {
      // If visible is undefined (called from old click handler), toggle based on current state
      if (typeof visible === 'undefined') {
        visible = player.style.display === 'none';
      }
      
      player.style.display = visible ? 'flex' : 'none';
      localStorage.setItem('playerVisible', visible);
      
      // Update checkbox if it exists
      const checkbox = document.getElementById('music-player-toggle');
      if (checkbox) {
        checkbox.checked = visible;
      }
    } catch (error) {
      console.error('Toggle music player error:', error);
    }
  }
}

// Fallback initialization to ensure music player setup
document.addEventListener('DOMContentLoaded', () => {
  try {
    initMusicPlayer();
    
    // Restore volume and visibility settings, but default to hidden
    const savedVolume = localStorage.getItem('playerVolume');
    const savedVisibility = localStorage.getItem('playerVisible');
    
    const audio = document.getElementById('audio-player');
    const player = document.getElementById('music-player');
    const musicPlayerToggle = document.getElementById('music-player-toggle');
    
    if (audio && savedVolume) {
      audio.volume = parseFloat(savedVolume);
      document.querySelector('input[type="range"]').value = savedVolume;
    }
    
    // If no saved visibility exists, default to hidden
    if (player) {
      const isVisible = savedVisibility === 'true';
      toggleMusicPlayer(isVisible);
      
      if (musicPlayerToggle) {
        musicPlayerToggle.checked = isVisible;
      }
    }
  } catch (error) {
    console.error('Music player initialization error:', error);
  }
});

// Context Menu
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  const contextMenu = document.getElementById('context-menu');
  contextMenu.style.display = 'block';
  contextMenu.style.left = e.pageX + 'px';
  contextMenu.style.top = e.pageY + 'px';
});

document.addEventListener('click', function(e) {
  const contextMenu = document.getElementById('context-menu');
  if (!contextMenu.contains(e.target)) {
    contextMenu.style.display = 'none';
    document.querySelector('.widget-submenu').classList.add('hidden');
  }
});

document.querySelector('.context-menu-item').addEventListener('mouseenter', function() {
  document.querySelector('.widget-submenu').classList.remove('hidden');
});

document.querySelector('#context-menu').addEventListener('mouseleave', function() {
  document.querySelector('.widget-submenu').classList.add('hidden');
});

// Widget Management
function addWidget(type) {
  const template = document.getElementById(`${type}-widget-template`);
  const widget = template.content.cloneNode(true);
  document.getElementById('widgets-container').appendChild(widget);
  
  const newWidget = document.querySelector(`#widgets-container .${type}-widget:last-child`);
  makeWidgetDraggable(newWidget);
  
  if (type === 'calendar') {
    initializeCalendar(newWidget);
  } else if (type === 'weather') {
    initializeWeather(newWidget);
  } else if (type === 'timer') {
    initializeTimer(newWidget);
  }
  
  document.getElementById('context-menu').style.display = 'none';
}

function makeWidgetDraggable(widget) {
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  widget.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);

  function dragStart(e) {
    if (e.target.closest('.widget-header')) {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
      isDragging = true;
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      xOffset = currentX;
      yOffset = currentY;
      widget.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }
  }

  function dragEnd() {
    isDragging = false;
  }
}

function removeWidget(widget) {
  widget.remove();
}

// Calendar Widget
function initializeCalendar(widget) {
  const date = new Date();
  updateCalendar(widget, date);
}

function updateCalendar(widget, date) {
  const monthDisplay = widget.querySelector('.month-display');
  const calendarGrid = widget.querySelector('.calendar-grid');
  
  monthDisplay.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });
  calendarGrid.innerHTML = '';
  
  // Add day headers
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.className = 'text-center text-indigo-400 text-sm';
    dayHeader.textContent = day;
    calendarGrid.appendChild(dayHeader);
  });
  
  // Add dates
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
  // Add empty cells for days before first of month
  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'text-center text-gray-600 p-2';
    calendarGrid.appendChild(emptyDay);
  }
  
  // Add all days of the month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'text-center text-white p-2 hover:bg-indigo-500/20 rounded';
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      dayCell.className += ' bg-indigo-500/30';
    }
    dayCell.textContent = i;
    calendarGrid.appendChild(dayCell);
  }
}

function changeMonth(delta, button) {
  const widget = button.closest('.calendar-widget');
  const currentMonth = widget.querySelector('.month-display').textContent;
  const date = new Date(currentMonth);
  date.setMonth(date.getMonth() + delta);
  updateCalendar(widget, date);
}

// Weather Widget
async function initializeWeather(widget) {
  try {
    const position = await getCurrentPosition();
    const weather = await fetchWeather(position.coords.latitude, position.coords.longitude);
    updateWeatherWidget(widget, weather);
  } catch (error) {
    console.error('Weather initialization error:', error);
    widget.querySelector('.weather-location').textContent = 'Location access denied';
  }
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchWeather(lat, lon) {
  const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // You'll need to get an API key
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  return response.json();
}

function updateWeatherWidget(widget, data) {
  widget.querySelector('.weather-location').textContent = data.name;
  widget.querySelector('.weather-temp').textContent = `${Math.round(data.main.temp)}°C`;
  widget.querySelector('.weather-desc span').textContent = data.weather[0].description;
}

// Timer Widget
function initializeTimer(widget) {
  let interval;
  let timeLeft = 0;
  const display = widget.querySelector('.timer-display');
  const startBtn = widget.querySelector('.start-timer');
  const pauseBtn = widget.querySelector('.pause-timer');
  const resetBtn = widget.querySelector('.reset-timer');
  const input = widget.querySelector('input');
  
  startBtn.addEventListener('click', () => {
    if (!timeLeft) {
      timeLeft = parseInt(input.value) * 60 || 0;
    }
    if (timeLeft <= 0) return;
    
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    interval = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft <= 0) {
        clearInterval(interval);
        startBtn.disabled = false;
        pauseBtn.disabled = true;
      }
    }, 1000);
  });
  
  pauseBtn.addEventListener('click', () => {
    clearInterval(interval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  });
  
  resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    timeLeft = 0;
    updateDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  });
  
  function updateDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  updateDisplay();
}
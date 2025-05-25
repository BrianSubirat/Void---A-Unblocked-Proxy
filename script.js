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

// Pet animations
const petAnimations = {
  idle: [
    {x: 0, y: 0, duration: 1000},
    {x: 0, y: -5, duration: 1000}
  ],
  walk: [
    {x: 10, y: 0, duration: 200},
    {x: 20, y: -5, duration: 200},
    {x: 30, y: 0, duration: 200},
    {x: 40, y: -5, duration: 200}
  ]
};

class VirtualPet {
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'virtual-pet';
    this.element.innerHTML = `
      <img src="/pet-cat.png" alt="Virtual Pet" class="w-12 h-12 filter drop-shadow-lg">
    `;
    document.body.appendChild(this.element);
    
    this.x = Math.random() * (window.innerWidth - 50);
    this.y = Math.random() * (window.innerHeight - 50);
    this.targetX = this.x;
    this.targetY = this.y;
    this.speed = 2;
    this.state = 'idle';
    
    this.updatePosition();
    this.startBehavior();

    // Make pet draggable
    this.element.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.dragOffsetX = e.clientX - this.x;
      this.dragOffsetY = e.clientY - this.y;
    });

    document.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        this.x = e.clientX - this.dragOffsetX;
        this.y = e.clientY - this.dragOffsetY;
        this.updatePosition();
      }
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
  }

  updatePosition() {
    this.element.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.direction || 1}, 1)`;
  }

  async startBehavior() {
    while (true) {
      if (!this.isDragging) {
        if (Math.random() < 0.3) {
          // Random walk
          this.targetX = Math.random() * (window.innerWidth - 50);
          this.targetY = Math.random() * (window.innerHeight - 50);
          this.state = 'walk';
          
          // Set direction
          this.direction = this.targetX > this.x ? 1 : -1;
          
          while (Math.abs(this.x - this.targetX) > 5 || Math.abs(this.y - this.targetY) > 5) {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
            
            this.updatePosition();
            await new Promise(r => setTimeout(r, 16));
          }
        } else {
          // Idle animation
          this.state = 'idle';
          await new Promise(r => setTimeout(r, 2000 + Math.random() * 2000));
        }
      } else {
        await new Promise(r => setTimeout(r, 100));
      }
    }
  }
}

let virtualPet = null;

function togglePet(enabled) {
  if (enabled && !virtualPet) {
    virtualPet = new VirtualPet();
  } else if (!enabled && virtualPet) {
    virtualPet.element.remove();
    virtualPet = null;
  }
  localStorage.setItem('petEnabled', enabled);
}

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
      
      // Only toggle visibility if not on mobile
      if (window.innerWidth >= 768) {
        player.style.display = visible ? 'flex' : 'none';
        localStorage.setItem('playerVisible', visible);
        
        // Update checkbox if it exists
        const checkbox = document.getElementById('music-player-toggle');
        if (checkbox) {
          checkbox.checked = visible;
        }
      } else {
        // Always hide on mobile
        player.style.display = 'none';
        localStorage.setItem('playerVisible', false);
      }
    } catch (error) {
      console.error('Toggle music player error:', error);
    }
  }
}

// Add responsive listener to handle music player visibility
document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('music-player');
  const musicPlayerToggle = document.getElementById('music-player-toggle');

  function handleMobileVisibility() {
    if (player) {
      if (window.innerWidth < 768) {
        player.style.display = 'none';
        localStorage.setItem('playerVisible', false);
        
        if (musicPlayerToggle) {
          musicPlayerToggle.checked = false;
        }
      } else {
        // Restore saved visibility on desktop
        const savedVisibility = localStorage.getItem('playerVisible') !== 'false';
        player.style.display = savedVisibility ? 'flex' : 'none';
        
        if (musicPlayerToggle) {
          musicPlayerToggle.checked = savedVisibility;
        }
      }
    }
  }

  // Initial call
  handleMobileVisibility();

  // Add resize listener
  window.addEventListener('resize', handleMobileVisibility);
});

// Add font change function
function changeFont(fontFamily) {
  document.body.style.fontFamily = fontFamily;
  localStorage.setItem('fontFamily', fontFamily);
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

    // Initialize pet if enabled (default to disabled)
    const petEnabled = localStorage.getItem('petEnabled') === 'true';
    const petToggle = document.getElementById('pet-toggle');
    if (petToggle) {
      petToggle.checked = petEnabled;
    }
    if (petEnabled) {
      togglePet(true);
    }

    // Initialize font settings
    const savedFont = localStorage.getItem('fontFamily') || 'Inter';
    const fontSelect = document.getElementById('font-select');
    if (fontSelect) {
      fontSelect.value = savedFont;
    }
    document.body.style.fontFamily = savedFont;
  } catch (error) {
    console.error('Music player initialization error:', error);
  }
});

// Context Menu
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  const contextMenu = document.getElementById('context-menu');
  const tabCloakMenu = document.getElementById('tab-cloak-menu');
  
  contextMenu.style.display = 'block';
  contextMenu.style.left = e.pageX + 'px';
  contextMenu.style.top = e.pageY + 'px';
  
  // Hide the tab cloak menu when opening context menu
  tabCloakMenu.style.display = 'none';
  tabCloakMenuVisible = false;
});

document.addEventListener('click', function(e) {
  const contextMenu = document.getElementById('context-menu');
  const tabCloakMenu = document.getElementById('tab-cloak-menu');
  
  // Only hide if clicking outside both menus and not in the widget submenu
  if (!contextMenu.contains(e.target) && !tabCloakMenu.contains(e.target)) {
    contextMenu.style.display = 'none';
    tabCloakMenu.style.display = 'none';
    document.querySelector('.widget-submenu').classList.add('hidden');
    tabCloakMenuVisible = false;
  }
});

document.querySelector('.widget-parent').addEventListener('mouseenter', function() {
  document.querySelector('.widget-submenu').classList.remove('hidden');
});

document.querySelector('.widget-parent').addEventListener('mouseleave', function() {
  document.querySelector('.widget-submenu').classList.add('hidden');
});

let tabCloakMenuVisible = false;

function showTabCloakMenu() {
  const contextMenu = document.getElementById('context-menu');
  const tabCloakMenu = document.getElementById('tab-cloak-menu');
  const contextRect = contextMenu.getBoundingClientRect();
  
  // Position the tab cloak menu next to the context menu
  tabCloakMenu.style.left = (contextRect.right + 5) + 'px';
  tabCloakMenu.style.top = contextRect.top + 'px';
  tabCloakMenu.style.display = 'block';
  tabCloakMenuVisible = true;
}

document.getElementById('tab-cloak-menu').addEventListener('mouseleave', function() {
  if (!tabCloakMenuVisible) {
    this.style.display = 'none';
  }
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

function openAdvancedProxySettings() {
  try {
    // Check if modal already exists to prevent multiple creations
    if (document.querySelector('.advanced-proxy-settings-modal')) {
      return;
    }

    // Create a modal or side panel for advanced proxy settings
    const settingsModal = document.createElement('div');
    settingsModal.className = 'advanced-proxy-settings-modal fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4';
    settingsModal.innerHTML = `
      <div class="bg-slate-800/90 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-indigo-500/20">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-white space-glow">Advanced Proxy Settings</h2>
          <button class="close-modal text-gray-400 hover:text-white transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="bg-slate-700/50 p-4 rounded-xl border border-indigo-500/20">
            <h3 class="text-lg font-medium text-white mb-2">Proxy Method</h3>
            <select class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20">
              <option>Ultraviolet (Default)</option>
              <option>libricul</option>
              <option>Custom Bare Server</option>
            </select>
          </div>
          
          <div class="bg-slate-700/50 p-4 rounded-xl border border-indigo-500/20">
            <h3 class="text-lg font-medium text-white mb-2">Connection Settings</h3>
            <div class="flex items-center justify-between mb-4">
              <label class="text-gray-300">Retry Attempts</label>
              <input 
                type="number" 
                min="1" 
                max="5" 
                value="3" 
                class="w-20 bg-slate-800/50 text-white rounded-lg px-2 py-1 border border-indigo-500/20"
              >
            </div>
            <div class="flex items-center justify-between">
              <label class="text-gray-300">Connection Timeout (seconds)</label>
              <input 
                type="number" 
                min="5" 
                max="30" 
                value="15" 
                class="w-20 bg-slate-800/50 text-white rounded-lg px-2 py-1 border border-indigo-500/20"
              >
            </div>
          </div>
          
          <div class="bg-slate-700/50 p-4 rounded-xl border border-indigo-500/20">
            <h3 class="text-lg font-medium text-white mb-2">Experimental Features</h3>
            <div class="space-y-2">
              <label class="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  class="form-checkbox text-indigo-600 bg-slate-800/50 border-indigo-500/20"
                >
                <span class="text-gray-300">Enable WebSocket Proxy</span>
              </label>
              <label class="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  class="form-checkbox text-indigo-600 bg-slate-800/50 border-indigo-500/20"
                >
                <span class="text-gray-300">Optimize for Low Bandwidth</span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-4">
          <button 
            class="close-modal bg-slate-700/50 hover:bg-slate-700/70 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(settingsModal);

    // Add event listeners to close buttons
    const closeButtons = settingsModal.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        settingsModal.remove();
      });
    });
  } catch (error) {
    console.error('Error creating advanced proxy settings modal:', error);
  }
}

// Ensure this function is added to the global scope
window.openAdvancedProxySettings = openAdvancedProxySettings;

// Add event listener to ensure the function is bound to the button after page load
document.addEventListener('DOMContentLoaded', () => {
  const advancedProxySettingsBtn = document.querySelector('[onclick="openAdvancedProxySettings()"]');
  if (advancedProxySettingsBtn) {
    advancedProxySettingsBtn.addEventListener('click', openAdvancedProxySettings);
  } else {
    console.warn('Advanced proxy settings button not found');
  }
});

// Performance Mode Management
function togglePerformanceMode(enabled) {
  try {
    // Save performance mode setting
    localStorage.setItem('performanceMode', enabled);

    if (enabled) {
      // Apply performance optimizations
      document.body.classList.add('performance-mode');
      
      // Disable or reduce resource-intensive features
      if (window.pJSDom && window.pJSDom[0]) {
        // Reduce particle count and speed
        window.pJSDom[0].pJS.particles.number.value = 50;
        window.pJSDom[0].pJS.particles.move.speed = 1;
        window.pJSDom[0].pJS.fn.particlesRefresh();
      }

      // Disable background animations
      const backgroundCanvases = [
        'waves-bg', 
        'stars-bg', 
        'matrix-bg', 
        'bubbles-bg'
      ];
      backgroundCanvases.forEach(id => {
        const canvas = document.getElementById(id);
        if (canvas) {
          canvas.style.display = 'none';
          if (canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
      });

      // Optional: Reduce CSS transitions and animations
      document.documentElement.style.setProperty('--transition-speed', '0.1s');
      
      // Disable virtual pet if it exists
      if (virtualPet) {
        virtualPet.element.remove();
        virtualPet = null;
      }

    } else {
      // Restore normal settings
      document.body.classList.remove('performance-mode');
      
      // Restore default particle settings
      if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.particles.number.value = 100;
        window.pJSDom[0].pJS.particles.move.speed = 2;
        window.pJSDom[0].pJS.fn.particlesRefresh();
      }

      // Restore background if it was previously selected
      const currentBackground = localStorage.getItem('background') || 'particles';
      setBackground(currentBackground);

      // Reset transition speed
      document.documentElement.style.removeProperty('--transition-speed');
    }

    // Optional: Provide user feedback
    const performanceModeToggle = document.getElementById('performance-mode');
    if (performanceModeToggle) {
      performanceModeToggle.checked = enabled;
    }
  } catch (error) {
    console.error('Performance mode toggle error:', error);
  }
}

// Restore performance mode setting on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedPerformanceMode = localStorage.getItem('performanceMode') === 'true';
  const performanceModeToggle = document.getElementById('performance-mode');
  
  if (performanceModeToggle) {
    performanceModeToggle.checked = savedPerformanceMode;
    togglePerformanceMode(savedPerformanceMode);
  }
});

// Add Dark Reader Compatibility Toggle
function toggleDarkReaderCompat(enabled) {
  try {
    // Save the setting to localStorage
    localStorage.setItem('darkReaderCompat', enabled);

    if (enabled) {
      // Add a class to the body to signal Dark Reader compatibility
      document.body.classList.add('dark-reader-compat');

      // Optional: Add specific styles to improve Dark Reader integration
      const styleTag = document.createElement('style');
      styleTag.id = 'dark-reader-compat-styles';
      styleTag.textContent = `
        /* Improve Dark Reader compatibility */
        body.dark-reader-compat {
          background-color: #0a0f1f !important;
          color: #e2e8f0 !important;
        }
        
        .dark-reader-compat .sidebar {
          background-color: rgba(15, 23, 42, 0.9) !important;
        }
        
        .dark-reader-compat .app-card,
        .dark-reader-compat .category-card {
          background-color: rgba(79, 70, 229, 0.05) !important;
          border-color: rgba(79, 70, 229, 0.2) !important;
        }
      `;
      document.head.appendChild(styleTag);
    } else {
      // Remove compatibility class and styles
      document.body.classList.remove('dark-reader-compat');
      
      const compatStyles = document.getElementById('dark-reader-compat-styles');
      if (compatStyles) {
        compatStyles.remove();
      }
    }

    // Update checkbox to match state
    const checkbox = document.getElementById('dark-reader-compat');
    if (checkbox) {
      checkbox.checked = enabled;
    }
  } catch (error) {
    console.error('Dark Reader compatibility toggle error:', error);
  }
}

// Restore Dark Reader compatibility setting on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedDarkReaderCompat = localStorage.getItem('darkReaderCompat') === 'true';
  const darkReaderCompatToggle = document.getElementById('dark-reader-compat');
  
  if (darkReaderCompatToggle) {
    darkReaderCompatToggle.checked = savedDarkReaderCompat;
    toggleDarkReaderCompat(savedDarkReaderCompat);
  }
});

// Add search function
function searchApps() {
  const searchInput = document.getElementById('app-search-input');
  if (!searchInput) return;
  
  const query = searchInput.value.trim().toLowerCase();
  const apps = document.querySelectorAll('.app-card');
  
  apps.forEach(app => {
    const appName = app.querySelector('.app-name').textContent.toLowerCase();
    const appCategory = app.querySelector('.category-label').textContent.toLowerCase();
    
    if (appName.includes(query) || appCategory.includes(query)) {
      app.style.display = 'flex';
    } else {
      app.style.display = 'none';
    }
  });
}

function openBugReportModal() {
  try {
    // Check if modal already exists to prevent multiple creations
    if (document.querySelector('.bug-report-modal')) {
      return;
    }

    // Create a modal for bug reporting
    const bugReportModal = document.createElement('div');
    bugReportModal.className = 'bug-report-modal fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4';
    bugReportModal.innerHTML = `
      <div class="bg-slate-800/90 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-indigo-500/20">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-white space-glow">Report a Bug</h2>
          <button class="close-modal text-gray-400 hover:text-white transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="bg-slate-700/50 p-4 rounded-xl border border-indigo-500/20">
            <h3 class="text-lg font-medium text-white mb-2">Bug Details</h3>
            <textarea 
              placeholder="Describe the bug you encountered in detail. What were you doing when it happened? What is the expected vs. actual behavior?"
              class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20 focus:border-indigo-500/50 focus:outline-none text-sm h-32 resize-none"
            ></textarea>
          </div>
          
          <div class="bg-slate-700/50 p-4 rounded-xl border border-indigo-500/20">
            <h3 class="text-lg font-medium text-white mb-2">Bug Category</h3>
            <select class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20">
              <option>Performance Issue</option>
              <option>UI/UX Bug</option>
              <option>Proxy Functionality</option>
              <option>Authentication Problem</option>
              <option>Other</option>
            </select>
          </div>
          
          <div class="bg-slate-700/50 p-4 rounded-xl border border-indigo-500/20">
            <h3 class="text-lg font-medium text-white mb-2">Contact Information (Optional)</h3>
            <input 
              type="email" 
              placeholder="Your email (for follow-up)" 
              class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20 mb-2"
            >
            <p class="text-xs text-gray-400">We'll only use this to contact you about the bug if we need more information.</p>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-4">
          <button 
            class="close-modal bg-slate-700/50 hover:bg-slate-700/70 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            class="submit-bug bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Submit Bug Report
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(bugReportModal);

    // Add event listeners to close and submit buttons
    const closeButtons = bugReportModal.querySelectorAll('.close-modal');
    const submitButton = bugReportModal.querySelector('.submit-bug');
    
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        bugReportModal.remove();
      });
    });

    submitButton.addEventListener('click', () => {
      const bugDescription = bugReportModal.querySelector('textarea').value.trim();
      const bugCategory = bugReportModal.querySelector('select').value;
      const contactEmail = bugReportModal.querySelector('input[type="email"]').value.trim();

      if (!bugDescription) {
        alert('Please provide a description of the bug');
        return;
      }

      // Here you would typically send the bug report to a backend service
      // For now, we'll just log it and show a success message
      console.log('Bug Report Submitted:', {
        description: bugDescription,
        category: bugCategory,
        email: contactEmail || 'No contact email provided'
      });

      alert('Thank you for reporting the bug! Our team will investigate soon.');
      bugReportModal.remove();
    });
  } catch (error) {
    console.error('Error creating bug report modal:', error);
  }
}

function shareFeatureIdea() {
  try {
    // Similar structure to bug report modal, but for feature ideas
    const featureIdeaModal = document.createElement('div');
    featureIdeaModal.className = 'feature-idea-modal fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4';
    featureIdeaModal.innerHTML = `
      <div class="bg-slate-800/90 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-indigo-500/20">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-white space-glow">Share Feature Idea</h2>
          <button class="close-modal text-gray-400 hover:text-white transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="bg-slate-700/50 p-4 rounded-xl border border-indigo-500/20">
            <h3 class="text-lg font-medium text-white mb-2">Feature Description</h3>
            <textarea 
              placeholder="Describe your feature idea in detail. How would it improve Void?"
              class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20 h-32 resize-none"
            ></textarea>
          </div>
          
          <div class="bg-slate-700/50 p-4 rounded-xl border border-indigo-500/20">
            <h3 class="text-lg font-medium text-white mb-2">Feature Category</h3>
            <select class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20">
              <option>UI/UX Enhancement</option>
              <option>Proxy Functionality</option>
              <option>Security Feature</option>
              <option>Performance Improvement</option>
              <option>Other</option>
            </select>
          </div>
          
          <div class="bg-slate-700/50 p-4 rounded-xl border border-indigo-500/20">
            <h3 class="text-lg font-medium text-white mb-2">Contact Information (Optional)</h3>
            <input 
              type="email" 
              placeholder="Your email (for follow-up)" 
              class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20 mb-2"
            >
            <p class="text-xs text-gray-400">We'll only use this to contact you about the feature idea if needed.</p>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-4">
          <button 
            class="close-modal bg-slate-700/50 hover:bg-slate-700/70 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            class="submit-feature bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Submit Feature Idea
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(featureIdeaModal);

    // Add event listeners to close and submit buttons
    const closeButtons = featureIdeaModal.querySelectorAll('.close-modal');
    const submitButton = featureIdeaModal.querySelector('.submit-feature');
    
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        featureIdeaModal.remove();
      });
    });

    submitButton.addEventListener('click', () => {
      const featureDescription = featureIdeaModal.querySelector('textarea').value.trim();
      const featureCategory = featureIdeaModal.querySelector('select').value;
      const contactEmail = featureIdeaModal.querySelector('input[type="email"]').value.trim();

      if (!featureDescription) {
        alert('Please provide a description of the feature idea');
        return;
      }

      // Here you would typically send the feature idea to a backend service
      console.log('Feature Idea Submitted:', {
        description: featureDescription,
        category: featureCategory,
        email: contactEmail || 'No contact email provided'
      });

      alert('Thank you for sharing your feature idea! Our team will review it.');
      featureIdeaModal.remove();
    });
  } catch (error) {
    console.error('Error creating feature idea modal:', error);
  }
}

// Ensure these functions are added to the global scope
window.openBugReportModal = openBugReportModal;
window.shareFeatureIdea = shareFeatureIdea;

let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

function showBookmarks() {
  // Close the proxy menu first
  const menu = document.querySelector('#proxy-menu');
  if (menu) {
    menu.classList.add('hidden');
  }

  // Remove existing bookmarks panel if it exists
  const existingPanel = document.querySelector('#bookmarks-panel');
  if (existingPanel) {
    existingPanel.remove();
  }

  // Create bookmarks panel
  const bookmarksPanel = document.createElement('div');
  bookmarksPanel.id = 'bookmarks-panel';
  bookmarksPanel.className = 'fixed right-0 top-0 h-full w-72 bg-slate-800/90 backdrop-blur border-l border-indigo-500/20 shadow-2xl transform translate-x-0 transition-transform duration-300 z-[45]';
  
  bookmarksPanel.innerHTML = `
    <div class="p-4 border-b border-indigo-500/20">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-white">Bookmarks</h3>
        <button onclick="closeBookmarksPanel()" class="text-gray-400 hover:text-white transition-colors">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <div class="p-4 overflow-y-auto max-h-[calc(100vh-64px)]">
      ${bookmarks.length === 0 ? 
        `<div class="text-center text-gray-400 py-4">
          <i class="fas fa-bookmark text-3xl mb-2"></i>
          <p>No bookmarks yet</p>
          <p class="text-sm mt-2">Click the star icon to add bookmarks</p>
        </div>` :
        bookmarks.map(bookmark => `
          <div class="mb-3 bg-slate-700/30 rounded-lg p-3 group hover:bg-slate-700/50 transition-all">
            <div class="flex items-center justify-between">
              <button 
                onclick="proxyNavigate('${bookmark.url}')" 
                class="flex-1 text-left text-gray-300 hover:text-white truncate"
              >
                <div class="font-medium">${bookmark.title}</div>
                <div class="text-xs text-gray-400 truncate">${bookmark.url}</div>
              </button>
              <button 
                onclick="removeBookmark('${bookmark.url}')" 
                class="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div class="text-xs text-gray-500 mt-1">
              Added ${new Date(bookmark.timestamp).toLocaleDateString()}
            </div>
          </div>
        `).join('')
      }
    </div>
  `;

  document.body.appendChild(bookmarksPanel);

  // Animate panel in
  requestAnimationFrame(() => {
    bookmarksPanel.style.transform = 'translateX(0)';
  });
}

function closeBookmarksPanel() {
  const panel = document.querySelector('#bookmarks-panel');
  if (panel) {
    panel.style.transform = 'translateX(100%)';
    setTimeout(() => panel.remove(), 300);
  }
}

function removeBookmark(url) {
  bookmarks = bookmarks.filter(b => b.url !== url);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
  // Refresh bookmarks panel
  showBookmarks();
  
  // Update star icon
  updateBookmarkStar(url);
}

function updateBookmarkStar(url) {
  const starIcon = document.querySelector('#bookmark-star');
  if (!starIcon) return;
  
  const isBookmarked = bookmarks.some(b => b.url === url);
  starIcon.classList.toggle('text-yellow-400', isBookmarked);
  starIcon.classList.toggle('text-gray-400', !isBookmarked);
}

document.addEventListener('click', (e) => {
  const panel = document.querySelector('#bookmarks-panel');
  const menu = document.querySelector('#proxy-menu');
  
  if (panel && !panel.contains(e.target) && 
      !menu?.contains(e.target) && 
      !e.target.closest('button[onclick="showBookmarks()"]')) {
    closeBookmarksPanel();
  }
});

function toggleBookmark() {
  const iframe = document.querySelector('#search-iframe');
  const starIcon = document.querySelector('#bookmark-star');
  
  if (!iframe || !starIcon) {
    console.warn('Iframe or bookmark star not found');
    return;
  }
  
  const url = iframe.src;
  const title = document.querySelector('#proxy-url-bar')?.value || url;
  
  const isBookmarked = bookmarks.some(b => b.url === url);
  
  if (isBookmarked) {
    bookmarks = bookmarks.filter(b => b.url !== url);
    starIcon.classList.remove('text-yellow-400');
    starIcon.classList.add('text-gray-400');
  } else {
    bookmarks.push({ url, title, timestamp: Date.now() });
    starIcon.classList.remove('text-gray-400');
    starIcon.classList.add('text-yellow-400');
  }
  
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Add Proxy NavBar
function addProxyNavBar(sidePanel, url) {
  // Defensive checks
  if (!sidePanel) {
    console.error('Side panel is null or undefined');
    return;
  }

  const navBar = document.createElement('div');
  navBar.className = 'flex items-center space-x-2 bg-slate-800/90 backdrop-blur border-b border-indigo-500/20 p-2 sticky top-0 z-50 h-11';
  navBar.id = 'proxy-nav-bar';
  navBar.style.position = 'absolute';
  navBar.style.top = '0';
  navBar.style.left = '0';
  navBar.style.right = '0';
  
  navBar.innerHTML = `
    <button onclick="proxyGoBack()" class="text-gray-400 hover:text-white p-2 rounded-lg transition-colors">
      <i class="fas fa-arrow-left"></i>
    </button>
    <button onclick="proxyGoForward()" class="text-gray-400 hover:text-white p-2 rounded-lg transition-colors">
      <i class="fas fa-arrow-right"></i>
    </button>
    <button onclick="proxyReload()" class="text-gray-400 hover:text-white p-2 rounded-lg transition-colors">
      <i class="fas fa-redo"></i>
    </button>
    <div class="flex-1 relative flex items-center">
      <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"></i>
      <input 
        type="text" 
        id="proxy-url-bar"
        value="${url}"
        class="w-full bg-slate-700/50 text-white pl-10 pr-10 py-2 rounded-lg border border-green-500/20 focus:border-green-500/50 focus:outline-none text-sm"
        onkeydown="if(event.key === 'Enter') proxyNavigate(this.value)"
      >
      <button 
        id="bookmark-star" 
        onclick="toggleBookmark()" 
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors"
      >
        <i class="fas fa-star"></i>
      </button>
    </div>
    <button onclick="toggleProxyMenu()" class="text-gray-400 hover:text-white p-2 rounded-lg transition-colors">
      <i class="fas fa-bars"></i>
    </button>
  `;

  // Create dropdown menu (hidden by default)
  const menu = document.createElement('div');
  menu.className = 'hidden absolute right-2 top-[44px] w-64 bg-slate-800/90 backdrop-blur rounded-lg border border-indigo-500/20 shadow-xl z-50';
  menu.id = 'proxy-menu';
  menu.innerHTML = `
    <div class="py-2">
      <button onclick="showBookmarks()" class="w-full text-left px-4 py-2 text-gray-300 hover:bg-indigo-500/20 flex items-center">
        <i class="fas fa-bookmark mr-2"></i>
        Bookmarks
      </button>
      <button onclick="proxyOpenInNewTab()" class="w-full text-left px-4 py-2 text-gray-300 hover:bg-indigo-500/20 flex items-center">
        <i class="fas fa-external-link-alt mr-2"></i>
        Open in New Tab
      </button>
      <button onclick="proxyCopyUrl()" class="w-full text-left px-4 py-2 text-gray-300 hover:bg-indigo-500/20 flex items-center">
        <i class="fas fa-copy mr-2"></i>
        Copy URL
      </button>
      <button onclick="proxyViewSource()" class="w-full text-left px-4 py-2 text-gray-300 hover:bg-indigo-500/20 flex items-center">
        <i class="fas fa-code mr-2"></i>
        View Source
      </button>
      <button onclick="toggleProxyBar()" class="w-full text-left px-4 py-2 text-gray-300 hover:bg-indigo-500/20 flex items-center">
        <i class="fas fa-eye-slash mr-2"></i>
        Hide Bar
      </button>
      <button onclick="toggleFullscreen()" class="w-full text-left px-4 py-2 text-gray-300 hover:bg-indigo-500/20 flex items-center">
        <i class="fas fa-expand mr-2"></i>
        Fullscreen
      </button>
      <div id="bookmarks-list" class="max-h-60 overflow-y-auto border-t border-indigo-500/20"></div>
    </div>
  `;

  // Append menu to the document body if it doesn't exist
  const existingMenu = document.getElementById('proxy-menu');
  if (!existingMenu) {
    sidePanel.appendChild(menu);
  }

  sidePanel.insertBefore(navBar, sidePanel.firstChild);
  
  // Add click event listener to close menu when clicking outside
  const menuCloseHandler = function(event) {
    const menu = document.getElementById('proxy-menu');
    const menuButton = document.querySelector('button:has(i.fa-bars)');
    
    if (menu && menuButton && 
        !menu.contains(event.target) && 
        !menuButton.contains(event.target)) {
      menu.classList.add('hidden');
    }
  };

  // Remove previous listeners to prevent multiple attachments
  document.removeEventListener('click', menuCloseHandler);
  document.addEventListener('click', menuCloseHandler);
  
  // Update bookmark star state
  updateBookmarkStar(url);
}

function toggleProxyMenu() {
  const menu = document.querySelector('#proxy-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  } else {
    console.warn('Proxy menu element not found');
  }
}

function toggleProxyBar() {
  const navBar = document.getElementById('proxy-nav-bar');
  const iframe = document.querySelector('#search-iframe');
  if (navBar && iframe) {
    navBar.style.display = navBar.style.display === 'none' ? 'flex' : 'none';
    iframe.style.height = navBar.style.display === 'none' ? '100%' : 'calc(100% - 44px)';
    iframe.style.marginTop = navBar.style.display === 'none' ? '0' : '44px';
  }
  toggleProxyMenu();
}

function toggleFullscreen() {
  const sidePanel = document.getElementById('side-panel');
  if (!document.fullscreenElement) {
    sidePanel.requestFullscreen().catch(err => {
      console.log(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
  toggleProxyMenu();
}

function proxyGoBack() {
  const iframe = document.querySelector('#search-iframe');
  if (iframe) {
    iframe.contentWindow.postMessage({ type: 'goBack' }, '*');
  }
}

function proxyGoForward() {
  const iframe = document.querySelector('#search-iframe');
  if (iframe) {
    iframe.contentWindow.postMessage({ type: 'goForward' }, '*');
  }
}

function proxyReload() {
  const iframe = document.querySelector('#search-iframe');
  if (iframe) {
    iframe.contentWindow.postMessage({ type: 'reload' }, '*');
  }
}

function proxyNavigate(url) {
  const iframe = document.querySelector('#search-iframe');
  if (iframe) {
    // Add https:// if not present
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    iframe.src = url;
    document.querySelector('#proxy-url-bar').value = url;
  }
}

window.addEventListener('message', (event) => {
  // Optional: Add origin checking for additional security
  // if (event.origin !== "https://expected-origin.com") return;

  switch(event.data.type) {
    case 'urlChanged':
      const proxyUrlBar = document.querySelector('#proxy-url-bar');
      if (proxyUrlBar) {
        proxyUrlBar.value = event.data.url;
      }
      break;
  }
}, false);

function proxyOpenInNewTab() {
  const iframe = document.querySelector('#search-iframe');
  if (iframe) {
    window.open(iframe.src, '_blank');
  }
  toggleProxyMenu();
}

function proxyCopyUrl() {
  const iframe = document.querySelector('#search-iframe');
  if (iframe) {
    navigator.clipboard.writeText(iframe.src);
    // Show feedback toast
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500/90 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    toast.textContent = 'URL copied to clipboard';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }
  toggleProxyMenu();
}

function proxyViewSource() {
  const iframe = document.querySelector('#search-iframe');
  if (iframe) {
    window.open('view-source:' + iframe.src);
  }
  toggleProxyMenu();
}

// Achievements
const achievements = {
  explorer: {
    id: 'explorer',
    name: 'Explorer',
    description: 'Visit 5 different websites',
    icon: 'fas fa-compass',
    progress: 0,
    goal: 5,
    reward: 'Custom theme unlock',
    completed: false
  },
  socialButterfly: {
    id: 'socialButterfly', 
    name: 'Social Butterfly',
    description: 'Use 3 different social media apps',
    icon: 'fas fa-users',
    progress: 0,
    goal: 3,
    reward: 'Special profile badge',
    completed: false
  },
  customizer: {
    id: 'customizer',
    name: 'Customizer',
    description: 'Try all available themes',
    icon: 'fas fa-paint-brush',
    progress: 0,
    goal: 6,
    reward: 'Custom theme creator unlock',
    completed: false
  },
  widgetMaster: {
    id: 'widgetMaster',
    name: 'Widget Master',
    description: 'Add all types of widgets',
    icon: 'fas fa-th-large',
    progress: 0,
    goal: 3,
    reward: 'Custom widget position save',
    completed: false
  },
  petLover: {
    id: 'petLover',
    name: 'Pet Lover',
    description: 'Play with virtual pet for 5 minutes',
    icon: 'fas fa-paw',
    progress: 0,
    goal: 300,
    reward: 'Pet customization options',
    completed: false
  },
  musicEnthusiast: {
    id: 'musicEnthusiast',
    name: 'Music Enthusiast',
    description: 'Listen to 10 different tracks',
    icon: 'fas fa-music',
    progress: 0,
    goal: 10,
    reward: 'Custom playlist feature',
    completed: false
  },
  securityPro: {
    id: 'securityPro',
    name: 'Security Pro',
    description: 'Use all security features',
    icon: 'fas fa-shield-alt',
    progress: 0,
    goal: 4,
    reward: 'Advanced security options',
    completed: false
  },
  earlyBird: {
    id: 'earlyBird',
    name: 'Early Bird',
    description: 'Use Void in the morning',
    icon: 'fas fa-sun',
    progress: 0,
    goal: 1,
    reward: 'Morning theme unlock',
    completed: false
  },
  nightOwl: {
    id: 'nightOwl',
    name: 'Night Owl',
    description: 'Use Void late at night',
    icon: 'fas fa-moon',
    progress: 0,
    goal: 1,
    reward: 'Dark mode enhancements',
    completed: false
  },
  shareEnthusiast: {
    id: 'shareEnthusiast',
    name: 'Share Enthusiast',
    description: 'Share feedback or report bugs',
    icon: 'fas fa-share-alt',
    progress: 0,
    goal: 3,
    reward: 'Beta tester status',
    completed: false
  }
};

function initAchievements() {
  // Load saved achievements from localStorage
  const savedAchievements = JSON.parse(localStorage.getItem('achievements')) || {};
  
  // Update achievements with saved data
  Object.keys(achievements).forEach(key => {
    if (savedAchievements[key]) {
      achievements[key] = {...achievements[key], ...savedAchievements[key]};
    }
  });
  
  // Check for time-based achievements
  checkTimeAchievements();
}

function checkTimeAchievements() {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour <= 9) {
    updateAchievementProgress('earlyBird', 1);
  }
  
  if (hour >= 22 || hour <= 4) {
    updateAchievementProgress('nightOwl', 1);
  }
}

function updateAchievementProgress(achievementId, increment = 1) {
  const achievement = achievements[achievementId];
  if (!achievement || achievement.completed) return;

  achievement.progress = Math.min(achievement.progress + increment, achievement.goal);
  
  if (achievement.progress >= achievement.goal && !achievement.completed) {
    achievement.completed = true;
    showAchievementNotification(achievement);
  }
  
  // Save achievements
  localStorage.setItem('achievements', JSON.stringify(achievements));
  
  // Update UI if achievements tab is open
  updateAchievementsUI();
}

function showAchievementNotification(achievement) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-indigo-600/90 text-white px-6 py-4 rounded-xl shadow-2xl z-[100] flex items-center space-x-4 transform translate-y-[-100%]';
  notification.innerHTML = `
    <i class="${achievement.icon} text-2xl"></i>
    <div>
      <h3 class="font-bold">${achievement.name} Unlocked!</h3>
      <p class="text-sm opacity-90">Reward: ${achievement.reward}</p>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  requestAnimationFrame(() => {
    notification.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    notification.style.transform = 'translateY(0)';
  });
  
  // Remove after delay
  setTimeout(() => {
    notification.style.transform = 'translateY(-100%)';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

function updateAchievementsUI() {
  const achievementsContainer = document.querySelector('#achievements-tab .achievements-grid');
  if (!achievementsContainer) return;
  
  achievementsContainer.innerHTML = '';
  
  Object.values(achievements).forEach(achievement => {
    const achievementCard = document.createElement('div');
    achievementCard.className = `achievement-card bg-slate-800/50 rounded-xl p-4 border ${achievement.completed ? 'border-green-500/30' : 'border-indigo-500/20'}`;
    achievementCard.innerHTML = `
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center">
          <i class="${achievement.icon} text-xl ${achievement.completed ? 'text-green-400' : 'text-indigo-400'}"></i>
        </div>
        <div class="flex-1">
          <h3 class="font-medium text-white">${achievement.name}</h3>
          <p class="text-sm text-gray-400">${achievement.description}</p>
        </div>
        ${achievement.completed ? 
          '<div class="text-green-400"><i class="fas fa-check-circle"></i></div>' :
          `<div class="text-sm text-gray-400">${achievement.progress}/${achievement.goal}</div>`
        }
      </div>
      <div class="mt-3">
        <div class="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <div class="h-full bg-indigo-500 rounded-full transition-all duration-300" 
               style="width: ${(achievement.progress / achievement.goal) * 100}%"></div>
        </div>
      </div>
      ${achievement.completed ? 
        `<div class="mt-2 text-sm text-green-400">
          <i class="fas fa-gift mr-1"></i> Reward: ${achievement.reward}
        </div>` : ''
      }
    `;
    
    achievementsContainer.appendChild(achievementCard);
  });
}

function triggerAchievementCheck(type, data) {
  switch(type) {
    case 'visit_website':
      updateAchievementProgress('explorer');
      break;
    case 'use_social_media':
      updateAchievementProgress('socialButterfly');
      break;
    case 'change_theme':
      updateAchievementProgress('customizer');
      break;
    case 'add_widget':
      updateAchievementProgress('widgetMaster');
      break;
    case 'play_music':
      updateAchievementProgress('musicEnthusiast');
      break;
    case 'use_security_feature':
      updateAchievementProgress('securityPro');
      break;
    case 'share_feedback':
      updateAchievementProgress('shareEnthusiast');
      break;
  }
}

// Initialize achievements on page load
document.addEventListener('DOMContentLoaded', initAchievements);

function changeSearchEngine(engine) {
  localStorage.setItem('searchEngine', engine);
}

function getCurrentSearchEngine() {
  return localStorage.getItem('searchEngine') || 'duckduckgo';
}

function toggleProxyPreload(enabled) {
  localStorage.setItem('proxyPreload', enabled);
  // Implementation for preloading can be added here
}

function toggleAlwaysNewTab(enabled) {
  localStorage.setItem('alwaysNewTab', enabled);
}

document.addEventListener('DOMContentLoaded', () => {
  // ... existing code ...

  // Initialize proxy settings
  const searchEngineSelect = document.getElementById('search-engine-select');
  if (searchEngineSelect) {
    searchEngineSelect.value = getCurrentSearchEngine();
  }

  const proxyPreload = document.getElementById('proxy-preload');
  if (proxyPreload) {
    proxyPreload.checked = localStorage.getItem('proxyPreload') === 'true';
  }

  const alwaysNewTab = document.getElementById('always-new-tab');
  if (alwaysNewTab) {
    alwaysNewTab.checked = localStorage.getItem('alwaysNewTab') === 'true';
  }
});

function proxySearch() {
  const searchInput = document.getElementById('proxy-search');
  const query = searchInput.value.trim();
  
  if (query) {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    
    let searchUrl;
    if (urlPattern.test(query)) {
      searchUrl = query.startsWith('http') ? query : `https://${query}`;
    } else {
      const searchEngine = getCurrentSearchEngine();
      switch(searchEngine) {
        case 'bing':
          searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
          break;
        case 'yahoo':
          searchUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
          break;
        default:
          searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      }
    }
    
    const sidePanel = document.getElementById('side-panel');
    const updateNotificationBtn = document.getElementById('update-notification-btn');
    
    sidePanel.innerHTML = `
      <iframe 
        id="search-iframe" 
        src="${searchUrl}" 
        class="w-full h-[calc(100%-44px)] border-none mt-[44px]"
        style="margin-top: 44px;"
      ></iframe>
    `;
    
    addProxyNavBar(sidePanel, searchUrl);
    
    sidePanel.classList.add('active');
    updateNotificationBtn.style.display = 'none';
  }
}
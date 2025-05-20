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

function shareFeatureIdea() {
  try {
    // Check if modal already exists to prevent multiple creations
    if (document.querySelector('.feature-idea-modal')) {
      return;
    }

    // Create a modal for sharing feature ideas
    const ideaModal = document.createElement('div');
    ideaModal.className = 'feature-idea-modal fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4';
    ideaModal.innerHTML = `
      <div class="bg-slate-800/90 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-indigo-500/20">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-white space-glow">Share a Feature Idea</h2>
          <button class="close-modal text-gray-400 hover:text-white transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-white mb-2">Feature Title</label>
            <input 
              type="text" 
              id="feature-title" 
              placeholder="Summarize your feature idea" 
              class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20"
              maxlength="100"
            >
          </div>
          
          <div>
            <label class="block text-white mb-2">Detailed Description</label>
            <textarea 
              id="feature-description" 
              placeholder="Provide more details about your feature" 
              rows="4" 
              class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20"
              maxlength="500"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-white mb-2">Category</label>
            <select 
              id="feature-category" 
              class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20"
            >
              <option value="ui">UI/UX</option>
              <option value="proxy">Proxy</option>
              <option value="performance">Performance</option>
              <option value="security">Security</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-4">
          <button 
            class="close-modal bg-slate-700/50 hover:bg-slate-700/70 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            id="submit-feature-idea"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Submit Idea
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(ideaModal);

    // Add event listeners to close buttons
    const closeButtons = ideaModal.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        ideaModal.remove();
      });
    });

    // Add submit event listener
    const submitButton = ideaModal.querySelector('#submit-feature-idea');
    submitButton.addEventListener('click', () => {
      const title = document.getElementById('feature-title').value.trim();
      const description = document.getElementById('feature-description').value.trim();
      const category = document.getElementById('feature-category').value;

      if (!title || !description) {
        alert('Please fill in both title and description.');
        return;
      }

      // In a real-world scenario, you would send this to a backend service
      // For now, we'll log to console and show a success message
      console.log('Feature Idea Submitted:', {
        title,
        description,
        category
      });

      alert('Thank you for your feature idea! We appreciate your feedback.');
      ideaModal.remove();
    });
  } catch (error) {
    console.error('Error creating feature idea modal:', error);
    alert('An error occurred while opening the feature idea modal.');
  }
}

// Ensure this function is added to the global scope
window.shareFeatureIdea = shareFeatureIdea;

// Add event listener to ensure the function is bound after page load
document.addEventListener('DOMContentLoaded', () => {
  const shareFeatureIdeaBtn = document.querySelector('[onclick="shareFeatureIdea()"]');
  if (shareFeatureIdeaBtn) {
    shareFeatureIdeaBtn.addEventListener('click', shareFeatureIdea);
  } else {
    console.warn('Share feature idea button not found');
  }
});

function openBugReportModal() {
  try {
    // Check if modal already exists to prevent multiple creations
    if (document.querySelector('.bug-report-modal')) {
      return;
    }

    // Create a modal for reporting bugs
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
          <div>
            <label class="block text-white mb-2">Bug Title</label>
            <input 
              type="text" 
              id="bug-title" 
              placeholder="Briefly describe the issue" 
              class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20"
              maxlength="100"
            >
          </div>
          
          <div>
            <label class="block text-white mb-2">Detailed Description</label>
            <textarea 
              id="bug-description" 
              placeholder="Provide more details about the bug, including steps to reproduce" 
              rows="4" 
              class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20"
              maxlength="500"
            ></textarea>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-white mb-2">Severity</label>
              <select 
                id="bug-severity" 
                class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            
            <div>
              <label class="block text-white mb-2">Browser</label>
              <select 
                id="bug-browser" 
                class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20"
              >
                <option value="chrome">Chrome</option>
                <option value="firefox">Firefox</option>
                <option value="safari">Safari</option>
                <option value="edge">Edge</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-white mb-2">Additional Information</label>
            <textarea 
              id="bug-additional-info" 
              placeholder="Any other relevant details (e.g., browser version, operating system)" 
              rows="2" 
              class="w-full bg-slate-800/50 text-white rounded-lg px-4 py-2 border border-indigo-500/20"
              maxlength="250"
            ></textarea>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-4">
          <button 
            class="close-modal bg-slate-700/50 hover:bg-slate-700/70 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            id="submit-bug-report"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Submit Bug Report
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(bugReportModal);

    // Add event listeners to close buttons
    const closeButtons = bugReportModal.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        bugReportModal.remove();
      });
    });

    // Add submit event listener
    const submitButton = bugReportModal.querySelector('#submit-bug-report');
    submitButton.addEventListener('click', () => {
      const title = document.getElementById('bug-title').value.trim();
      const description = document.getElementById('bug-description').value.trim();
      const severity = document.getElementById('bug-severity').value;
      const browser = document.getElementById('bug-browser').value;
      const additionalInfo = document.getElementById('bug-additional-info').value.trim();

      if (!title || !description) {
        alert('Please fill in at least the bug title and description.');
        return;
      }

      // In a real-world scenario, you would send this to a backend service
      // For now, we'll log to console and show a success message
      console.log('Bug Report Submitted:', {
        title,
        description,
        severity,
        browser,
        additionalInfo
      });

      alert('Thank you for reporting the bug! We will investigate and address the issue.');
      bugReportModal.remove();
    });
  } catch (error) {
    console.error('Error creating bug report modal:', error);
    alert('An error occurred while opening the bug report modal.');
  }
}

// Ensure this function is added to the global scope
window.openBugReportModal = openBugReportModal;

// Add event listener to ensure the function is bound after page load
document.addEventListener('DOMContentLoaded', () => {
  const openBugReportModalBtn = document.querySelector('[onclick="openBugReportModal()"]');
  if (openBugReportModalBtn) {
    openBugReportModalBtn.addEventListener('click', openBugReportModal);
  } else {
    console.warn('Open bug report modal button not found');
  }
});

function openCategory(category) {
  const sidePanel = document.getElementById('side-panel');
  const updateNotificationBtn = document.getElementById('update-notification-btn');
  
  if (category === 'proxy') {
    // Simplified, centered proxy UI
    sidePanel.innerHTML = `
      <button id="close-panel" class="absolute top-4 right-4 text-3xl text-gray-300 hover:text-white z-50" onclick="closeSidePanel()">
        <i class="fas fa-times"></i>
      </button>
      <div class="w-full h-full flex items-center justify-center p-6">
        <div class="max-w-2xl w-full">
          <!-- Centered Proxy Search Section -->
          <div class="search-container bg-slate-800/90 backdrop-blur rounded-2xl p-8 border border-indigo-500/20 shadow-xl">
            <h2 class="text-3xl font-bold text-white mb-6 text-center space-glow">Void Proxy</h2>
            <div class="relative">
              <input 
                type="text" 
                id="proxy-search" 
                placeholder="Enter URL or search" 
                class="w-full px-6 py-4 rounded-xl bg-slate-900/50 backdrop-blur text-white 
                border border-indigo-500/20 focus:border-indigo-500/50 focus:outline-none
                text-lg placeholder-gray-400"
              >
              <button 
                onclick="proxySearch()" 
                class="absolute right-4 top-1/2 transform -translate-y-1/2 
                text-indigo-400 hover:text-indigo-300 text-xl transition-colors"
              >
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <!-- Quick Access Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
            ${[
              {name: 'YouTube', icon: 'fab fa-youtube', color: 'text-red-500', url: 'https://www.youtube.com'},
              {name: 'Discord', icon: 'fab fa-discord', color: 'text-indigo-500', url: 'https://discord.com'},
              {name: 'Reddit', icon: 'fab fa-reddit', color: 'text-orange-500', url: 'https://www.reddit.com'},
              {name: 'Twitter', icon: 'fab fa-twitter', color: 'text-blue-400', url: 'https://twitter.com'},
              {name: 'TikTok', icon: 'fab fa-tiktok', color: 'text-white', url: 'https://www.tiktok.com'},
              {name: 'Instagram', icon: 'fab fa-instagram', color: 'text-pink-500', url: 'https://www.instagram.com'},
              {name: 'Netflix', icon: 'fas fa-film', color: 'text-red-600', url: 'https://www.netflix.com'},
              {name: 'Spotify', icon: 'fab fa-spotify', color: 'text-green-500', url: 'https://open.spotify.com'}
            ].map(site => `
              <div 
                onclick="proxyApp('${site.url}')" 
                class="quick-access-card bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-indigo-500/20
                hover:bg-indigo-500/10 hover:border-indigo-500/40 transition-all duration-300 cursor-pointer
                flex flex-col items-center justify-center gap-2"
              >
                <i class="${site.icon} ${site.color} text-2xl"></i>
                <span class="text-white text-sm">${site.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else {
    // ... rest of the existing code for other categories ...
  }
  
  sidePanel.classList.add('active');
  updateNotificationBtn.style.display = 'none';
}

// ... rest of the existing script.js code ...


function filterApps(category) {
  const allApps = document.querySelectorAll('#apps-grid .app-card');
  const tabs = document.querySelectorAll('.category-tab');
  
  // Update active tab
  tabs.forEach(tab => tab.classList.remove('active'));
  event.currentTarget.classList.add('active');
  
  allApps.forEach(app => {
    const appCategories = app.dataset.category.split(' ');
    if (category === 'all' || appCategories.includes(category)) {
      app.style.display = 'block';
    } else {
      app.style.display = 'none';
    }
  });
}

let currentSearchEngine = localStorage.getItem('searchEngine') || 'google';

function setSearchEngine(engine) {
  currentSearchEngine = engine;
  localStorage.setItem('searchEngine', engine);
  
  // Update UI to show active search engine
  document.querySelectorAll('.search-engine-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.currentTarget.classList.add('active');
}

function proxySearch() {
  const input = document.getElementById('proxy-search');
  const query = input.value.trim();
  
  if (!query) return;
  
  let url;
  if (isValidUrl(query)) {
    url = query.startsWith('http') ? query : `https://${query}`;
  } else {
    switch(currentSearchEngine) {
      case 'google':
        url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        break;
      case 'bing':
        url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        break;
      case 'duckduckgo':
        url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        break;
    }
  }
  
  proxyApp(url);
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(string);
  }
}
function openCategory(category) {
  const sidePanel = document.getElementById('side-panel');
  const updateNotificationBtn = document.getElementById('update-notification-btn');
  
  // Reset panel and prepare for new content
  sidePanel.innerHTML = `
    <button id="close-panel" class="absolute top-4 right-4 text-3xl text-gray-300 hover:text-white z-50" onclick="closeSidePanel()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  switch(category) {
    case 'proxy':
      sidePanel.innerHTML += `
        <div class="w-full h-full flex flex-col items-center p-6">
          <div class="max-w-2xl w-full">
            <div class="text-center mb-8">
              <h1 class="text-4xl font-bold text-white mb-2 space-glow">Void Proxy</h1>
              <p class="text-indigo-400">Fast, secure, and reliable web proxy service</p>
            </div>

            <div class="search-container mb-8">
              <div class="relative w-full max-w-xl mx-auto">
                <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <i class="fas fa-globe text-indigo-400"></i>
                </div>
                <input 
                  type="text" 
                  id="proxy-search" 
                  placeholder="Search or enter a URL" 
                  class="w-full px-12 py-4 rounded-xl bg-slate-800/50 backdrop-blur text-white 
                  border border-indigo-500/20 focus:border-indigo-500/50 focus:outline-none
                  placeholder-gray-400"
                >
                <button 
                  onclick="proxySearch()" 
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 
                  bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg
                  transition-all duration-300 flex items-center space-x-2"
                >
                  <i class="fas fa-search"></i>
                  <span>Search</span>
                </button>
              </div>
            </div>

            <div class="app-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div onclick="proxyApp('https://www.youtube.com')" class="app-card flex flex-col items-center">
                <i class="fab fa-youtube app-icon text-red-500 text-3xl mb-2"></i>
                <span class="app-name">YouTube</span>
              </div>
              <div onclick="proxyApp('https://discord.com')" class="app-card flex flex-col items-center">
                <i class="fab fa-discord app-icon text-indigo-500 text-3xl mb-2"></i>
                <span class="app-name">Discord</span>
              </div>
              <div onclick="proxyApp('https://www.tiktok.com')" class="app-card flex flex-col items-center">
                <i class="fab fa-tiktok app-icon text-black text-3xl mb-2"></i>
                <span class="app-name">TikTok</span>
              </div>
              <div onclick="proxyApp('https://www.twitch.tv')" class="app-card flex flex-col items-center">
                <i class="fab fa-twitch app-icon text-purple-500 text-3xl mb-2"></i>
                <span class="app-name">Twitch</span>
              </div>
              <div onclick="proxyApp('https://www.reddit.com')" class="app-card flex flex-col items-center">
                <i class="fab fa-reddit app-icon text-orange-500 text-3xl mb-2"></i>
                <span class="app-name">Reddit</span>
              </div>
              <div onclick="proxyApp('https://twitter.com')" class="app-card flex flex-col items-center">
                <i class="fab fa-twitter app-icon text-blue-400 text-3xl mb-2"></i>
                <span class="app-name">Twitter</span>
              </div>
              <div onclick="proxyApp('https://www.spotify.com')" class="app-card flex flex-col items-center">
                <i class="fab fa-spotify app-icon text-green-500 text-3xl mb-2"></i>
                <span class="app-name">Spotify</span>
              </div>
              <div onclick="proxyApp('https://www.netflix.com')" class="app-card flex flex-col items-center">
                <i class="fas fa-film app-icon text-red-600 text-3xl mb-2"></i>
                <span class="app-name">Netflix</span>
              </div>
              <div onclick="proxyApp('https://www.instagram.com')" class="app-card flex flex-col items-center">
                <i class="fab fa-instagram app-icon text-pink-500 text-3xl mb-2"></i>
                <span class="app-name">Instagram</span>
              </div>
              <div onclick="proxyApp('https://www.facebook.com')" class="app-card flex flex-col items-center">
                <i class="fab fa-facebook app-icon text-blue-500 text-3xl mb-2"></i>
                <span class="app-name">Facebook</span>
              </div>
            </div>
          </div>
        </div>
      `;
      break;
    
    case 'apps':
      sidePanel.innerHTML += `
        <div class="w-full h-full flex flex-col items-center p-6">
          <div class="max-w-6xl w-full">
            <div class="flex items-center justify-between mb-8">
              <h1 class="text-3xl font-bold text-white space-glow">Apps</h1>
            </div>
            
            <div class="flex justify-center mb-8">
              <div class="relative w-96">
                <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <i class="fas fa-search text-indigo-400"></i>
                </div>
                <input 
                  type="text" 
                  id="app-search-input" 
                  placeholder="Search apps..." 
                  class="w-full bg-slate-800/50 backdrop-blur text-white rounded-xl px-4 py-3 border border-indigo-500/20 focus:border-indigo-500/50 focus:outline-none
                  placeholder-gray-400"
                  oninput="searchApps()"
                >
              </div>
            </div>

            <div class="app-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-y-auto max-h-[calc(100vh-220px)]">
              <div onclick="proxyApp('https://discord.com')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-discord app-icon text-indigo-500 text-3xl mb-2"></i>
                <span class="app-name">Discord</span>
                <span class="category-label">Social</span>
              </div>
              <div onclick="proxyApp('https://youtube.com')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-youtube app-icon text-red-500 text-3xl mb-2"></i>
                <span class="app-name">YouTube</span>
                <span class="category-label">Media</span>
              </div>
              <div onclick="proxyApp('https://spotify.com')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-spotify app-icon text-green-500 text-3xl mb-2"></i>
                <span class="app-name">Spotify</span>
                <span class="category-label">Music</span>
              </div>
              <div onclick="proxyApp('https://twitch.tv')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-twitch app-icon text-purple-500 text-3xl mb-2"></i>
                <span class="app-name">Twitch</span>
                <span class="category-label">Streaming</span>
              </div>
              <div onclick="proxyApp('https://reddit.com')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-reddit app-icon text-orange-500 text-3xl mb-2"></i>
                <span class="app-name">Reddit</span>
                <span class="category-label">Social</span>
              </div>
              <div onclick="proxyApp('https://tiktok.com')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-tiktok app-icon text-black text-3xl mb-2"></i>
                <span class="app-name">TikTok</span>
                <span class="category-label">Social</span>
              </div>
              <div onclick="proxyApp('https://twitter.com')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-twitter app-icon text-blue-400 text-3xl mb-2"></i>
                <span class="app-name">Twitter</span>
                <span class="category-label">Social</span>
              </div>
              <div onclick="proxyApp('https://netflix.com')" class="app-card flex flex-col items-center text-center">
                <i class="fas fa-film app-icon text-red-600 text-3xl mb-2"></i>
                <span class="app-name">Netflix</span>
                <span class="category-label">Streaming</span>
              </div>
              <div onclick="proxyApp('https://instagram.com')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-instagram app-icon text-pink-500 text-3xl mb-2"></i>
                <span class="app-name">Instagram</span>
                <span class="category-label">Social</span>
              </div>
              <div onclick="proxyApp('https://pinterest.com')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-pinterest app-icon text-red-500 text-3xl mb-2"></i>
                <span class="app-name">Pinterest</span>
                <span class="category-label">Social</span>
              </div>
              <div onclick="proxyApp('https://messenger.com')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-facebook-messenger app-icon text-blue-500 text-3xl mb-2"></i>
                <span class="app-name">Messenger</span>
                <span class="category-label">Social</span>
              </div>
              <div onclick="proxyApp('https://whatsapp.com')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-whatsapp app-icon text-green-500 text-3xl mb-2"></i>
                <span class="app-name">WhatsApp</span>
                <span class="category-label">Social</span>
              </div>
              <div onclick="proxyApp('https://telegram.org')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-telegram app-icon text-blue-400 text-3xl mb-2"></i>
                <span class="app-name">Telegram</span>
                <span class="category-label">Social</span>
              </div>
              <div onclick="proxyApp('https://hulu.com')" class="app-card flex flex-col items-center text-center">
                <i class="fas fa-tv app-icon text-green-400 text-3xl mb-2"></i>
                <span class="app-name">Hulu</span>
                <span class="category-label">Streaming</span>
              </div>
              <div onclick="proxyApp('https://disneyplus.com')" class="app-card flex flex-col items-center text-center">
                <i class="fas fa-video app-icon text-blue-500 text-3xl mb-2"></i>
                <span class="app-name">Disney+</span>
                <span class="category-label">Streaming</span>
              </div>
              <div onclick="proxyApp('https://pandora.com')" class="app-card flex flex-col items-center text-center">
                <i class="fas fa-music app-icon text-blue-400 text-3xl mb-2"></i>
                <span class="app-name">Pandora</span>
                <span class="category-label">Music</span>
              </div>
              <div onclick="proxyApp('https://deezer.com')" class="app-card flex flex-col items-center text-center">
                <i class="fas fa-headphones app-icon text-purple-500 text-3xl mb-2"></i>
                <span class="app-name">Deezer</span>
                <span class="category-label">Music</span>
              </div>
              <div onclick="proxyApp('https://tumblr.com')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-tumblr app-icon text-blue-600 text-3xl mb-2"></i>
                <span class="app-name">Tumblr</span>
                <span class="category-label">Social</span>
              </div>
              <div onclick="proxyApp('https://vimeo.com')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-vimeo app-icon text-cyan-500 text-3xl mb-2"></i>
                <span class="app-name">Vimeo</span>
                <span class="category-label">Video</span>
              </div>
              <div onclick="proxyApp('https://primevideo.com')" class="app-card flex flex-col items-center text-center">
                <i class="fab fa-amazon app-icon text-blue-500 text-3xl mb-2"></i>
                <span class="app-name">Prime Video</span>
                <span class="category-label">Streaming</span>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'terminal':
      sidePanel.innerHTML += `
        <iframe 
          id="terminal-iframe" 
          src="https://school-terminal-com.pages.dev" 
          class="w-full h-full border-none"
        ></iframe>
      `;
      break;
  
    case 'games':
      sidePanel.innerHTML += `
        <iframe 
          id="games-iframe" 
          src="https://voidgames-com.pages.dev/" 
          class="w-full h-full border-none"
        ></iframe>
      `;
      break;
  
    case 'ai':
      sidePanel.innerHTML += `
        <iframe 
          id="ai-iframe" 
          src="https://gemini.google.com/" 
          class="w-full h-full border-none"
        ></iframe>
      `;
      break;
  
    case 'movies':
      sidePanel.innerHTML += `
        <iframe 
          id="movies-iframe" 
          src="https://movies.usewaves.site/" 
          class="w-full h-full border-none"
        ></iframe>
      `;
      break;
  }

  // Add proxySearch function
  function proxySearch() {
    const searchInput = document.getElementById('proxy-search');
    const query = searchInput.value.trim();
    
    if (query) {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      
      let searchUrl;
      if (urlPattern.test(query)) {
        searchUrl = query.startsWith('http') ? query : `https://${query}`;
      } else {
        searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      }
      
      proxyApp(searchUrl);
    }
  }
  
  sidePanel.classList.add('active');
  updateNotificationBtn.style.display = 'none';
}

function proxyApp(url) {
  const sidePanel = document.getElementById('side-panel');
  const updateNotificationBtn = document.getElementById('update-notification-btn');
  
  sidePanel.innerHTML = `
    <button id="close-panel" class="absolute top-4 right-4 text-3xl text-gray-300 hover:text-white z-50" onclick="closeSidePanel()">
      <i class="fas fa-times"></i>
    </button>
    <div class="w-full flex flex-col h-full">
      <div class="flex items-center gap-4 p-4 bg-slate-800/90 border-b border-indigo-500/20">
        <div class="flex items-center gap-2 flex-1">
          <button onclick="history.back()" class="text-gray-400 hover:text-white">
            <i class="fas fa-arrow-left"></i>
          </button>
          <button onclick="history.forward()" class="text-gray-400 hover:text-white">
            <i class="fas fa-arrow-right"></i>
          </button>
          <button onclick="document.getElementById('proxy-iframe').contentWindow.location.reload()" class="text-gray-400 hover:text-white">
            <i class="fas fa-redo"></i>
          </button>
          <input 
            type="text" 
            id="url-bar" 
            value="${url}"
            class="flex-1 bg-slate-700/50 text-white px-4 py-2 rounded-lg"
            onkeydown="if(event.key === 'Enter') proxyApp(this.value)"
          >
        </div>
      </div>
      <iframe 
        id="proxy-iframe" 
        src="${__uv$config.prefix}${__uv$config.encodeUrl(url)}" 
        class="flex-1 w-full border-none"
      ></iframe>
    </div>
  `;
  
  sidePanel.classList.add('active');
  updateNotificationBtn.style.display = 'none';
}

function searchApps() {
  const searchInput = document.getElementById('app-search-input');
  if (!searchInput) return;
  
  const query = searchInput.value.trim().toLowerCase();
  const appGrid = document.querySelector('.app-grid');
  if (!appGrid) return;
  
  const apps = appGrid.getElementsByClassName('app-card');
  let visibleAppsCount = 0;
  
  Array.from(apps).forEach(app => {
    const appName = app.querySelector('.app-name')?.textContent.toLowerCase() || '';
    const appCategory = app.querySelector('.category-label')?.textContent.toLowerCase() || '';
    
    if (appName.includes(query) || appCategory.includes(query)) {
      app.style.display = 'flex';
      visibleAppsCount++;
    } else {
      app.style.display = 'none';
    }
  });

  // Remove existing no results message if it exists
  const existingMessage = document.getElementById('no-results-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Show no results message if needed
  if (visibleAppsCount === 0 && query !== '') {
    const message = document.createElement('div');
    message.id = 'no-results-message';
    message.className = 'col-span-full text-center py-8 text-gray-400';
    message.innerHTML = `
      <i class="fas fa-search mb-2 text-2xl"></i>
      <p>No apps found matching "${query}"</p>
    `;
    appGrid.appendChild(message);
  }
}

function changeMonth(change, button) {
  const widget = button.closest('.calendar-widget');
  const monthDisplay = widget.querySelector('.month-display');
  const calendarGrid = widget.querySelector('.calendar-grid');
  
  // Get current displayed month
  const [monthName, year] = monthDisplay.textContent.split(' ');
  const date = new Date(`${monthName} 1, ${year}`);
  
  // Change month
  date.setMonth(date.getMonth() + change);
  
  // Update display
  monthDisplay.textContent = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  
  // Rebuild calendar grid
  updateCalendarGrid(calendarGrid, date);
}

function updateCalendarGrid(grid, date) {
  // Clear existing content
  grid.innerHTML = '';
  
  // Add day headers
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.className = 'text-center text-indigo-400 text-sm font-medium';
    dayHeader.textContent = day;
    grid.appendChild(dayHeader);
  });
  
  // Get first day of month and number of days
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
  // Add empty cells for days before first of month
  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyDay = document.createElement('div');
    grid.appendChild(emptyDay);
  }
  
  // Add days of month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'text-center py-1 text-gray-300 hover:bg-indigo-500/20 rounded cursor-pointer transition-colors';
    dayCell.textContent = i;
    
    // Highlight current day
    if (date.getMonth() === new Date().getMonth() && 
        date.getFullYear() === new Date().getFullYear() && 
        i === new Date().getDate()) {
      dayCell.className += ' bg-indigo-500/30 text-white';
    }
    
    grid.appendChild(dayCell);
  }
}

function initCalendarWidget(widget) {
  const monthDisplay = widget.querySelector('.month-display');
  const calendarGrid = widget.querySelector('.calendar-grid');
  const today = new Date();
  
  monthDisplay.textContent = `${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`;
  updateCalendarGrid(calendarGrid, today);
}

function addWidget(type) {
  const widgetsContainer = document.getElementById('widgets-container');
  const templateId = `${type}-widget-template`;
  const template = document.getElementById(templateId);
  
  if (template) {
    const widget = template.content.cloneNode(true).querySelector('.widget');
    widget.style.position = 'absolute';
    widget.style.left = '50px';
    widget.style.top = '50px';
    
    // Make widget draggable
    makeDraggable(widget);
    
    // Initialize specific widget types
    if (type === 'calendar') {
      initCalendarWidget(widget);
    }
    
    widgetsContainer.appendChild(widget);
  }
}

function showTabCloakMenu() {
  const contextMenu = document.getElementById('context-menu');
  const tabCloakMenu = document.getElementById('tab-cloak-menu');
  
  // Position tab cloak menu where context menu was
  const rect = contextMenu.getBoundingClientRect();
  
  // Hide context menu
  contextMenu.style.display = 'none';
  
  // Show and position tab cloak menu
  tabCloakMenu.style.display = 'block';
  tabCloakMenu.style.left = rect.left + 'px';
  tabCloakMenu.style.top = rect.top + 'px';
  
  // Handle clicking outside to close
  function closeTabCloakMenu(e) {
    if (!tabCloakMenu.contains(e.target)) {
      tabCloakMenu.style.display = 'none';
      document.removeEventListener('click', closeTabCloakMenu);
    }
  }
  
  // Add close handler after a small delay to prevent immediate closing
  setTimeout(() => {
    document.addEventListener('click', closeTabCloakMenu);
  }, 100);
}

// Music player initialization
let currentTrackIndex = 0;
const musicTracks = [
  {
    title: "Ambient Lofi",
    url: "https://example.com/ambient-lofi.mp3",
    category: "lofi"
  },
  {
    title: "Study Beats",
    url: "https://example.com/study-beats.mp3", 
    category: "study"
  },
  {
    title: "Chill Wave",
    url: "https://example.com/chill-wave.mp3",
    category: "chill"
  }
];

function initMusicPlayer() {
  const audioPlayer = document.getElementById('audio-player');
  const playBtn = document.getElementById('play-btn');
  const trackTitle = document.getElementById('track-title');
  
  // Load first track
  loadTrack(0);
  
  // Add event listeners
  audioPlayer.addEventListener('ended', () => {
    nextTrack();
  });
  
  // Make music player draggable
  const musicPlayer = document.getElementById('music-player');
  makeDraggable(musicPlayer);
}

function loadTrack(index) {
  const audioPlayer = document.getElementById('audio-player');
  const trackTitle = document.getElementById('track-title');
  
  currentTrackIndex = index;
  audioPlayer.src = musicTracks[index].url;
  trackTitle.textContent = musicTracks[index].title;
  
  // Start playing if was playing before
  if (!audioPlayer.paused) {
    audioPlayer.play();
  }
}

function togglePlay() {
  const audioPlayer = document.getElementById('audio-player');
  const playBtn = document.getElementById('play-btn');
  
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audioPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function nextTrack() {
  loadTrack((currentTrackIndex + 1) % musicTracks.length);
}

function prevTrack() {
  loadTrack((currentTrackIndex - 1 + musicTracks.length) % musicTracks.length);
}

function updateVolume(value) {
  const audioPlayer = document.getElementById('audio-player');
  audioPlayer.volume = value;
  localStorage.setItem('playerVolume', value);
}

function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // Get mouse position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // Call function whenever cursor moves
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Calculate new position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // Set element's new position
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // Stop moving when mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function handleContextMenu(event) {
  event.preventDefault(); // Prevent default right-click menu
  
  const contextMenu = document.getElementById('context-menu');
  const widgetParent = contextMenu.querySelector('.widget-parent');
  const widgetSubmenu = contextMenu.querySelector('.widget-submenu');
  
  // Position the context menu
  contextMenu.style.display = 'block';
  contextMenu.style.left = `${event.clientX}px`;
  contextMenu.style.top = `${event.clientY}px`;
  
  // Toggle submenu visibility
  widgetParent.addEventListener('click', () => {
    widgetSubmenu.classList.toggle('hidden');
  });

  // Close menu when clicking outside
  function closeContextMenu(e) {
    if (!contextMenu.contains(e.target)) {
      contextMenu.style.display = 'none';
      widgetSubmenu.classList.add('hidden');
      document.removeEventListener('click', closeContextMenu);
    }
  }
  
  // Add event listener to close menu
  document.addEventListener('click', closeContextMenu);
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('contextmenu', handleContextMenu);
});

function removeWidget(widget) {
  widget.remove();
}
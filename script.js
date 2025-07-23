let userCoins = parseInt(localStorage.getItem('userCoins')) || 0;
let lastCoinUpdate = parseInt(localStorage.getItem('lastCoinUpdate')) || Date.now();
const COIN_REWARD = 10;
const COIN_INTERVAL = 8 * 60 * 1000; // 8 minutes in milliseconds

const storeItems = [
  {
    id: 'pet_companion',
    name: 'Virtual Pet Companion',
    description: 'A cute virtual pet that follows your cursor around the screen',
    price: 100,
    category: 'companion',
    icon: 'fa-paw'
  },
  {
    id: 'custom_sounds',
    name: 'UI Sound Effects',
    description: 'Premium sound effects for clicks, hovers, and notifications',
    price: 75,
    category: 'audio',
    icon: 'fa-volume-up'
  },
  {
    id: 'tab_groups',
    name: 'Tab Groups',
    description: 'Organize your proxy tabs into custom groups',
    price: 150,
    category: 'productivity',
    icon: 'fa-layer-group'
  },
  {
    id: 'quick_notes',
    name: 'Quick Notes Widget',
    description: 'Add a floating notepad for quick notes',
    price: 120,
    category: 'widgets',
    icon: 'fa-sticky-note'
  },
  {
    id: 'custom_hotkeys',
    name: 'Custom Hotkeys',
    description: 'Create your own keyboard shortcuts',
    price: 200,
    category: 'productivity',
    icon: 'fa-keyboard'
  },
  {
    id: 'proxy_history',
    name: 'Browsing History',
    description: 'View and manage your proxy browsing history',
    price: 180,
    category: 'productivity',
    icon: 'fa-history'
  },
  {
    id: 'search_filters',
    name: 'Advanced Search Filters',
    description: 'Additional search options and filters',
    price: 160,
    category: 'productivity',
    icon: 'fa-filter'
  },
  {
    id: 'proxy_speed',
    name: 'Speed Boost',
    description: 'Enhanced proxy connection speed',
    price: 250,
    category: 'performance',
    icon: 'fa-tachometer-alt'
  },
  {
    id: 'download_manager',
    name: 'Download Manager',
    description: 'Manage and organize your downloads',
    price: 200,
    category: 'productivity',
    icon: 'fa-download'
  }
];

function openCategory(category) {
  const sidePanel = document.getElementById('side-panel');
  const updateNotificationBtn = document.getElementById('update-notification-btn');
  
  if (category === 'proxy') {
    sidePanel.innerHTML = `
      <button id="close-panel" class="absolute top-4 right-4 text-3xl text-gray-300 hover:text-white z-50" onclick="closeSidePanel()">
        <i class="fas fa-times"></i>
      </button>
      <iframe 
        id="proxy-iframe" 
        src="https://uv-static-f3u.pages.dev/static/#"
        class="w-full h-full border-none"
      ></iframe>
    `;
    
    sidePanel.classList.add('active');
    updateNotificationBtn.style.display = 'none';
  } else if (category === 'music') {
    sidePanel.innerHTML = `
      <button id="close-panel" class="absolute top-4 right-4 text-3xl text-gray-300 hover:text-white z-50" onclick="closeSidePanel()">
        <i class="fas fa-times"></i>
      </button>
      <iframe 
        id="music-iframe" 
        src="https://lumabeats-com.pages.dev"
        class="w-full h-full border-none"
      ></iframe>
    `;
    
    sidePanel.classList.add('active');
    updateNotificationBtn.style.display = 'none';
  } else if (category === 'partners') {
    sidePanel.innerHTML = `
      <button id="close-panel" class="absolute top-4 right-4 text-3xl text-gray-300 hover:text-white z-50" onclick="closeSidePanel()">
        <i class="fas fa-times"></i>
      </button>
      <div class="w-full h-full flex flex-col items-center p-6">
        <div class="max-w-4xl w-full">
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-white mb-2 space-glow" style="font-family: 'Orbitron', monospace;">Our Partner</h1>
            <p class="text-indigo-400">Thank you to Petazah for helping create this proxy</p>
          </div>

          <div class="flex justify-center">
            <!-- Petazah Partner -->
            <div class="category-card p-6 rounded-xl relative overflow-hidden max-w-md">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold text-white" style="font-family: 'Orbitron', monospace;">Petazah</h2>
                <i class="fas fa-shield-alt text-green-400 text-2xl"></i>
              </div>
              <p class="text-gray-300 mb-4">Special thanks to Petazah for helping create and develop this proxy service</p>
              <a href="https://petezah.net" target="_blank"
                class="w-full bg-green-600/20 hover:bg-green-600/30 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-between">
                <span>Visit Petazah</span>
                <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-lg">
            <div class="flex items-center mb-2">
              <i class="fas fa-heart text-indigo-500 mr-2"></i>
              <h3 class="text-white font-bold" style="font-family: 'Orbitron', monospace;">Special Thanks</h3>
            </div>
            <p class="text-gray-300 text-sm">
              This proxy wouldn't be possible without Petazah's contributions and support in the development process.
            </p>
          </div>
        </div>
      </div>
    `;
    
    sidePanel.classList.add('active');
    updateNotificationBtn.style.display = 'none';
  } else if (category === 'vm') {
    sidePanel.innerHTML = `
      <button id="close-panel" class="absolute top-4 right-4 text-3xl text-gray-300 hover:text-white z-50" onclick="closeSidePanel()">
        <i class="fas fa-times"></i>
      </button>
      <div class="w-full h-full flex flex-col items-center p-6">
        <div class="max-w-2xl w-full">
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-white mb-2 space-glow">VAPOR Private VMs</h1>
            <p class="text-indigo-400">Isolated, personal browsers available in the cloud</p>
          </div>

          <div class="flex items-center justify-center h-full p-8 space-y-6">
            <div class="bg-slate-800/50 backdrop-blur p-8 rounded-2xl border border-indigo-500/20 max-w-2xl w-full">
              <h2 class="text-4xl font-bold text-white space-glow text-center mb-8">VAPOR Private VMs</h2>
              
              <div class="text-center space-y-4">
                <p class="text-gray-300 text-lg">
                  VAPOR Private VMs are isolated, personal browsers available in the cloud.
                </p>
                
                <p class="text-gray-300 text-lg">
                  Need to search something? Need to test a sketchy site? Try Private VMs.
                </p>
                
                <p class="text-indigo-400 text-lg">
                  12 minutes of uninterrupted browsing. Ran out of time? In a single click, create a new session right away.
                </p>
              </div>

              <div class="mt-8 text-center">
                <button 
                  onclick="startVMSession()"
                  class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center space-x-3 text-lg font-medium mx-auto"
                >
                  <i class="fas fa-play"></i>
                  <span>Start Session</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (category === 'apps') {
    sidePanel.innerHTML = `
      <button id="close-panel" class="absolute top-4 right-4 text-3xl text-gray-300 hover:text-white z-50" onclick="closeSidePanel()">
        <i class="fas fa-times"></i>
      </button>
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
                class="w-full bg-slate-800/50 backdrop-blur text-white rounded-xl px-12 py-3 border border-indigo-500/20 focus:border-indigo-500/50 focus:outline-none
                placeholder-gray-400"
                oninput="searchApps()"
              >
            </div>
          </div>

          <div class="app-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <!-- Original Apps -->
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
            
            <!-- Additional Apps -->
            <div onclick="proxyApp('https://instagram.com')" class="app-card flex flex-col items-center text-center">
              <i class="fab fa-instagram app-icon text-pink-500 text-3xl mb-2"></i>
              <span class="app-name">Instagram</span>
              <span class="category-label">Social</span>
            </div>
            <div onclick="proxyApp('https://facebook.com')" class="app-card flex flex-col items-center text-center">
              <i class="fab fa-facebook app-icon text-blue-500 text-3xl mb-2"></i>
              <span class="app-name">Facebook</span>
              <span class="category-label">Social</span>
            </div>
            <div onclick="proxyApp('https://pinterest.com')" class="app-card flex flex-col items-center text-center">
              <i class="fab fa-pinterest app-icon text-red-500 text-3xl mb-2"></i>
              <span class="app-name">Pinterest</span>
              <span class="category-label">Social</span>
            </div>
            <div onclick="proxyApp('https://linkedin.com')" class="app-card flex flex-col items-center text-center">
              <i class="fab fa-linkedin app-icon text-blue-600 text-3xl mb-2"></i>
              <span class="app-name">LinkedIn</span>
              <span class="category-label">Professional</span>
            </div>
            <div onclick="proxyApp('https://github.com')" class="app-card flex flex-col items-center text-center">
              <i class="fab fa-github app-icon text-gray-800 text-3xl mb-2"></i>
              <span class="app-name">GitHub</span>
              <span class="category-label">Development</span>
            </div>
            <div onclick="proxyApp('https://outlook.com')" class="app-card flex flex-col items-center text-center">
              <i class="fas fa-envelope app-icon text-blue-500 text-3xl mb-2"></i>
              <span class="app-name">Outlook</span>
              <span class="category-label">Email</span>
            </div>
            <div onclick="proxyApp('https://amazon.com')" class="app-card flex flex-col items-center text-center">
              <i class="fab fa-amazon app-icon text-yellow-500 text-3xl mb-2"></i>
              <span class="app-name">Amazon</span>
              <span class="category-label">Shopping</span>
            </div>
            <div onclick="proxyApp('https://ebay.com')" class="app-card flex flex-col items-center text-center">
              <i class="fas fa-shopping-cart app-icon text-blue-500 text-3xl mb-2"></i>
              <span class="app-name">eBay</span>
              <span class="category-label">Shopping</span>
            </div>
            <div onclick="proxyApp('https://walmart.com')" class="app-card flex flex-col items-center text-center">
              <i class="fas fa-store app-icon text-blue-700 text-3xl mb-2"></i>
              <span class="app-name">Walmart</span>
              <span class="category-label">Shopping</span>
            </div>
            <div onclick="proxyApp('https://target.com')" class="app-card flex flex-col items-center text-center">
              <i class="fas fa-bullseye app-icon text-red-600 text-3xl mb-2"></i>
              <span class="app-name">Target</span>
              <span class="category-label">Shopping</span>
            </div>
            <div onclick="proxyApp('https://crunchyroll.com')" class="app-card flex flex-col items-center text-center">
              <i class="fas fa-tv app-icon text-orange-500 text-3xl mb-2"></i>
              <span class="app-name">Crunchyroll</span>
              <span class="category-label">Streaming</span>
            </div>
            <div onclick="proxyApp('https://hulu.com')" class="app-card flex flex-col items-center text-center">
              <i class="fas fa-play-circle app-icon text-green-500 text-3xl mb-2"></i>
              <span class="app-name">Hulu</span>
              <span class="category-label">Streaming</span>
            </div>
            <div onclick="proxyApp('https://disneyplus.com')" class="app-card flex flex-col items-center text-center">
              <i class="fas fa-magic app-icon text-blue-400 text-3xl mb-2"></i>
              <span class="app-name">Disney+</span>
              <span class="category-label">Streaming</span>
            </div>
            <div onclick="proxyApp('https://hbomax.com')" class="app-card flex flex-col items-center text-center">
              <i class="fas fa-film app-icon text-purple-600 text-3xl mb-2"></i>
              <span class="app-name">HBO Max</span>
              <span class="category-label">Streaming</span>
            </div>
            <div onclick="proxyApp('https://peacocktv.com')" class="app-card flex flex-col items-center text-center">
              <i class="fas fa-feather-alt app-icon text-indigo-400 text-3xl mb-2"></i>
              <span class="app-name">Peacock</span>
              <span class="category-label">Streaming</span>
            </div>
            <div onclick="proxyApp('https://primevideo.com')" class="app-card flex flex-col items-center text-center">
              <i class="fab fa-amazon app-icon text-blue-500 text-3xl mb-2"></i>
              <span class="app-name">Prime Video</span>
              <span class="category-label">Streaming</span>
            </div>
            <div onclick="proxyApp('https://dailymotion.com')" class="app-card flex flex-col items-center text-center">
              <i class="fas fa-video app-icon text-blue-400 text-3xl mb-2"></i>
              <span class="app-name">Dailymotion</span>
              <span class="category-label">Video</span>
            </div>
            <div onclick="proxyApp('https://vimeo.com')" class="app-card flex flex-col items-center text-center">
              <i class="fab fa-vimeo-v app-icon text-cyan-500 text-3xl mb-2"></i>
              <span class="app-name">Vimeo</span>
              <span class="category-label">Video</span>
            </div>
            <div onclick="proxyApp('https://soundcloud.com')" class="app-card flex flex-col items-center text-center">
              <i class="fab fa-soundcloud app-icon text-orange-500 text-3xl mb-2"></i>
              <span class="app-name">SoundCloud</span>
              <span class="category-label">Music</span>
            </div>
            <div onclick="proxyApp('https://pandora.com')" class="app-card flex flex-col items-center text-center">
              <i class="fas fa-music app-icon text-blue-400 text-3xl mb-2"></i>
              <span class="app-name">Pandora</span>
              <span class="category-label">Music</span>
            </div>
            <div onclick="proxyApp('https://deezer.com')" class="app-card flex flex-col items-center text-center">
              <i class="fas fa-headphones app-icon text-indigo-500 text-3xl mb-2"></i>
              <span class="app-name">Deezer</span>
              <span class="category-label">Music</span>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (category === 'cheats') {
    sidePanel.innerHTML = `
      <button id="close-panel" class="absolute top-4 right-4 text-3xl text-gray-300 hover:text-white z-50" onclick="closeSidePanel()">
        <i class="fas fa-times"></i>
      </button>
      <div class="w-full h-full flex flex-col items-center p-6 overflow-y-auto">
        <div class="max-w-4xl w-full">
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-white mb-2 space-glow">Cheats for school</h1>
            <p class="text-indigo-400">Free cheats for school</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Edpuzzle Section -->
            <div class="category-card p-6 rounded-xl relative overflow-hidden">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold text-white">Edpuzzle</h2>
                <i class="fas fa-video text-indigo-400 text-2xl"></i>
              </div>
              <p class="text-gray-300 mb-4">Auto-answer and video acceleration tools</p>
              <div class="space-y-2">
                <a href="https://schoolcheats.net/edpuzzle" target="_blank"
                  class="w-full bg-indigo-600/20 hover:bg-indigo-600/30 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-between">
                  <span>Edpuzzle Answers</span>
                  <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>

            <!-- Kahoot Section -->
            <div class="category-card p-6 rounded-xl relative overflow-hidden">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold text-white">Kahoot</h2>
                <i class="fas fa-gamepad text-indigo-400 text-2xl"></i>
              </div>
              <p class="text-gray-300 mb-4">Answer viewer and game automation</p>
              <div class="space-y-2">
                <a href="https://schoolcheats.net/kahoot" target="_blank"
                  class="w-full bg-indigo-600/20 hover:bg-indigo-600/30 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-between">
                  <span>Kahoot Answers</span>
                  <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>

            <!-- Blooket Section -->
            <div class="category-card p-6 rounded-xl relative overflow-hidden">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold text-white">Blooket</h2>
                <i class="fas fa-puzzle-piece text-indigo-400 text-2xl"></i>
              </div>
              <p class="text-gray-300 mb-4">Game modifications and answer tools</p>
              <div class="space-y-2">
                <a href="https://schoolcheats.net/blooket" target="_blank"
                  class="w-full bg-indigo-600/20 hover:bg-indigo-600/30 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-between">
                  <span>Blooket Answers</span>
                  <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>

            <!-- Gimkit Section -->
            <div class="category-card p-6 rounded-xl relative overflow-hidden">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold text-white">Gimkit</h2>
                <i class="fas fa-bolt text-indigo-400 text-2xl"></i>
              </div>
              <p class="text-gray-300 mb-4">Answer assistance and game automation</p>
              <div class="space-y-2">
                <a href="https://schoolcheats.net/gimkit" target="_blank"
                  class="w-full bg-indigo-600/20 hover:bg-indigo-600/30 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-between">
                  <span>Gimkit Answers</span>
                  <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-yellow-600/10 border border-yellow-500/20 rounded-lg">
            <div class="flex items-center mb-2">
              <i class="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
              <h3 class="text-white font-bold">Important Notice</h3>
            </div>
            <p class="text-gray-300 text-sm">
              Make sure to be carful using these to not get cought.
            </p>
          </div>
        </div>
      </div>
    `;
    
    sidePanel.classList.add('active');
    updateNotificationBtn.style.display = 'none';
  } else if (category === 'movies') {
    sidePanel.innerHTML = `
      <button id="close-panel" class="absolute top-4 right-4 text-3xl text-gray-300 hover:text-white z-50" onclick="closeSidePanel()">
        <i class="fas fa-times"></i>
      </button>
      <iframe 
        id="movie-iframe" 
        src="/movie.html" 
        class="w-full h-full border-none"
      ></iframe>
    `;
    
    sidePanel.classList.add('active');
    updateNotificationBtn.style.display = 'none';
  } else {
    let url = '';
    switch(category) {
      case 'games':
        url = 'https://gamehub-com.pages.dev/';
        break;
      case 'ai':
        url = 'http://gemini.google.com/';
        break;
    }

    if (url) {
      sidePanel.innerHTML = `
        <button id="close-panel" class="absolute top-4 right-4 text-3xl text-gray-300 hover:text-white z-50" onclick="closeSidePanel()">
          <i class="fas fa-times"></i>
        </button>
        <iframe 
          id="category-iframe" 
          src="${url}" 
          class="w-full h-full border-none"
        ></iframe>
      `;
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
    <iframe 
      id="proxy-iframe" 
      src="https://uv-static-f3u.pages.dev/static/#"
      class="w-full h-full border-none"
    ></iframe>
  `;
  
  sidePanel.classList.add('active');
  updateNotificationBtn.style.display = 'none';
}

function proxySearch() {
  const searchInput = document.getElementById('proxy-search');
  const query = searchInput.value.trim();
  
  if (query) {
    const sidePanel = document.getElementById('side-panel');
    const updateNotificationBtn = document.getElementById('update-notification-btn');
    
    sidePanel.innerHTML = `
      <button id="close-panel" class="absolute top-4 right-4 text-3xl text-gray-300 hover:text-white z-50" onclick="closeSidePanel()">
        <i class="fas fa-times"></i>
      </button>
      <iframe 
        id="proxy-iframe" 
        src="https://uv-static-f3u.pages.dev/static/#${encodeURIComponent(query)}"
        class="w-full h-full border-none"
      ></iframe>
    `;
    
    sidePanel.classList.add('active');
    updateNotificationBtn.style.display = 'none';
  }
}

function handleProxyMessage(event) {
  switch(event.data.type) {
    case 'urlChanged':
      document.getElementById('url-bar').value = event.data.url;
      break;
  }
}

function proxyGoBack() {
  const iframe = document.getElementById('proxy-iframe');
  iframe.contentWindow.postMessage({ type: 'goBack' }, '*');
}

function proxyGoForward() {
  const iframe = document.getElementById('proxy-iframe');
  iframe.contentWindow.postMessage({ type: 'goForward' }, '*');
}

function proxyRefresh() {
  const iframe = document.getElementById('proxy-iframe');
  iframe.contentWindow.postMessage({ type: 'refresh' }, '*');
}

function proxyToggleFullscreen() {
  const iframe = document.getElementById('proxy-iframe');
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  }
}

function proxyCopyUrl() {
  const urlBar = document.getElementById('url-bar');
  navigator.clipboard.writeText(urlBar.value)
    .then(() => {
      const notification = document.createElement('div');
      notification.textContent = 'URL copied!';
      notification.className = 'fixed bottom-4 right-4 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-lg';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2000);
    });
  document.getElementById('toolbar-menu').classList.add('hidden');
}

function handleProxyUrlBarKeyPress(event) {
  if (event.key === 'Enter') {
    const urlBar = document.getElementById('url-bar');
    const url = urlBar.value;
    const iframe = document.getElementById('proxy-iframe');
    iframe.contentWindow.postMessage({ 
      type: 'navigate', 
      url: encodeURI(url) 
    }, '*');
  }
}

function proxyToggleToolbar() {
  const toolbar = document.querySelector('.flex.items-center.px-4.py-2');
  toolbar.style.display = 'none';
  
  const showButton = document.createElement('button');
  showButton.className = 'fixed top-2 right-2 bg-slate-800/90 text-gray-300 hover:text-white p-2 rounded-lg z-50';
  showButton.innerHTML = '<i class="fas fa-bars"></i>';
  showButton.onclick = function() {
    toolbar.style.display = 'flex';
    showButton.remove();
  };
  document.body.appendChild(showButton);
  
  document.getElementById('toolbar-menu').classList.add('hidden');
}

function proxyToggleBookmark() {
  const urlBar = document.getElementById('url-bar');
  const url = urlBar.value;
  const title = document.title;
  
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  
  const isBookmarked = bookmarks.some(bookmark => bookmark.url === url);
  
  if (isBookmarked) {
    bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
    showNotification('Bookmark removed');
  } else {
    bookmarks.push({ url, title, date: new Date().toISOString() });
    showNotification('Bookmark added');
  }
  
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  document.getElementById('toolbar-menu').classList.add('hidden');
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.className = 'fixed bottom-4 right-4 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-lg z-[100]';
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 2000);
}

document.addEventListener('contextmenu', function(e) {
  e.preventDefault(); // Prevent default context menu
  
  const contextMenu = document.getElementById('context-menu');
  if (!contextMenu) return;

  // Position the menu at click coordinates
  contextMenu.style.display = 'block';
  
  // Adjust menu position to prevent it going off-screen
  let x = e.clientX;
  let y = e.clientY;
  
  const menuWidth = contextMenu.offsetWidth;
  const menuHeight = contextMenu.offsetHeight;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  if (x + menuWidth > windowWidth) {
    x = windowWidth - menuWidth;
  }
  
  if (y + menuHeight > windowHeight) {
    y = windowHeight - menuHeight;
  }
  
  contextMenu.style.left = x + 'px';
  contextMenu.style.top = y + 'px';
  
  // Add handler to close menu when clicking outside
  const closeContextMenu = function(e) {
    if (!contextMenu.contains(e.target)) {
      contextMenu.style.display = 'none';
      document.removeEventListener('click', closeContextMenu);
    }
  };
  
  // Small delay to prevent immediate closing
  setTimeout(() => {
    document.addEventListener('click', closeContextMenu);
  }, 0);
});

// Add handler for widget submenu
document.addEventListener('DOMContentLoaded', function() {
  const widgetParent = document.querySelector('.widget-parent');
  if (widgetParent) {
    widgetParent.addEventListener('click', function(e) {
      const submenu = this.querySelector('.widget-submenu');
      if (submenu) {
        submenu.classList.toggle('hidden');
      }
    });
  }
});

// Close context menu when clicking anywhere else
document.addEventListener('click', function(e) {
  const contextMenu = document.getElementById('context-menu');
  const tabCloakMenu = document.getElementById('tab-cloak-menu');
  
  if (!contextMenu.contains(e.target)) {
    contextMenu.style.display = 'none';
  }
  
  if (tabCloakMenu && !tabCloakMenu.contains(e.target)) {
    tabCloakMenu.style.display = 'none';
  }
});

// Show tab cloak submenu
function showTabCloakMenu() {
  const contextMenu = document.getElementById('context-menu');
  const tabCloakMenu = document.getElementById('tab-cloak-menu');
  
  if (!tabCloakMenu) return;
  
  const contextRect = contextMenu.getBoundingClientRect();
  
  tabCloakMenu.style.display = 'block';
  tabCloakMenu.style.left = (contextRect.right + 5) + 'px';
  tabCloakMenu.style.top = contextRect.top + 'px';
}

const widgets = {
  calendar: {
    name: 'Calendar',
    template: '#calendar-widget-template',
    initializer: initCalendarWidget
  },
  weather: {
    name: 'Weather',
    template: '#weather-widget-template',
    initializer: initWeatherWidget
  },
  timer: {
    name: 'Timer',
    template: '#timer-widget-template',
    initializer: initTimerWidget
  }
};

function addWidget(type) {
  const widgetsContainer = document.getElementById('widgets-container');
  if (!widgetsContainer) return;

  const widgetInfo = widgets[type];
  if (!widgetInfo) return;

  const templateEl = document.querySelector(widgetInfo.template);
  if (!templateEl) return;

  const widgetClone = templateEl.content.cloneNode(true);
  const widgetElement = widgetClone.querySelector('.widget');

  // Make widget draggable
  widgetElement.addEventListener('mousedown', startDragging);

  widgetsContainer.appendChild(widgetElement);

  // Call widget-specific initialization
  if (widgetInfo.initializer) {
    widgetInfo.initializer(widgetElement);
  }

  // Close context menu after adding widget
  const contextMenu = document.getElementById('context-menu');
  if (contextMenu) {
    contextMenu.style.display = 'none';
  }
}

let isDragging = false;
let currentWidget = null;
let offsetX, offsetY;

function startDragging(e) {
  if (e.target.closest('.widget-header')) {
    isDragging = true;
    currentWidget = e.currentTarget;
    
    const rect = currentWidget.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    currentWidget.style.position = 'fixed';
    currentWidget.style.zIndex = '1000';
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
  }
}

function drag(e) {
  if (!isDragging) return;
  
  currentWidget.style.left = `${e.clientX - offsetX}px`;
  currentWidget.style.top = `${e.clientY - offsetY}px`;
}

function stopDragging() {
  isDragging = false;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDragging);
}

function removeWidget(widgetElement) {
  widgetElement.remove();
}

function initCalendarWidget(widgetElement) {
  const monthDisplay = widgetElement.querySelector('.month-display');
  const calendarGrid = widgetElement.querySelector('.calendar-grid');
  let currentDate = new Date();

  function renderCalendar(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    
    monthDisplay.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    calendarGrid.innerHTML = '';
    
    // Add days of the week headers
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
      const dayEl = document.createElement('div');
      dayEl.textContent = day;
      dayEl.classList.add('text-white', 'text-center', 'font-bold');
      calendarGrid.appendChild(dayEl);
    });
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarGrid.appendChild(document.createElement('div'));
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = document.createElement('div');
      dayEl.textContent = day;
      dayEl.classList.add('text-white', 'text-center', 'p-1');
      
      // Highlight current day
      if (
        year === new Date().getFullYear() && 
        month === new Date().getMonth() && 
        day === new Date().getDate()
      ) {
        dayEl.classList.add('bg-indigo-500', 'rounded');
      }
      
      calendarGrid.appendChild(dayEl);
    }
  }

  renderCalendar(currentDate);

  widgetElement.querySelector('button:first-of-type').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  widgetElement.querySelector('button:last-of-type').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });
}

function initWeatherWidget(widgetElement) {
  const weatherLocation = widgetElement.querySelector('.weather-location');
  const weatherTemp = widgetElement.querySelector('.weather-temp');
  const weatherDesc = widgetElement.querySelector('.weather-desc');

  function fetchWeather() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY&units=metric`);
          const data = await response.json();
          
          weatherLocation.textContent = data.name;
          weatherTemp.textContent = `${Math.round(data.main.temp)}°C`;
          weatherDesc.innerHTML = `<i class="owf owf-${data.weather[0].id}"></i> ${data.weather[0].description}`;
        } catch (error) {
          weatherLocation.textContent = 'Error fetching weather';
        }
      }, () => {
        weatherLocation.textContent = 'Location unavailable';
      });
    } else {
      weatherLocation.textContent = 'Geolocation not supported';
    }
  }

  fetchWeather();
}

function initTimerWidget(widgetElement) {
  const timerDisplay = widgetElement.querySelector('.timer-display');
  const startButton = widgetElement.querySelector('.start-timer');
  const pauseButton = widgetElement.querySelector('.pause-timer');
  const resetButton = widgetElement.querySelector('.reset-timer');
  const minutesInput = widgetElement.querySelector('input');

  let interval;
  let totalSeconds = 0;
  let isRunning = false;

  startButton.addEventListener('click', () => {
    if (!isRunning) {
      const minutes = parseInt(minutesInput.value) || 0;
      if (minutes > 0) {
        totalSeconds = minutes * 60;
      }
      
      if (totalSeconds > 0) {
        interval = setInterval(() => {
          totalSeconds--;
          updateDisplay();
          
          if (totalSeconds <= 0) {
            clearInterval(interval);
            isRunning = false;
            startButton.disabled = false;
            pauseButton.disabled = true;
          }
        }, 1000);
        
        isRunning = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
      }
    }
  });

  pauseButton.addEventListener('click', () => {
    if (isRunning) {
      clearInterval(interval);
      isRunning = false;
      startButton.disabled = false;
      pauseButton.disabled = true;
    }
  });

  resetButton.addEventListener('click', () => {
    clearInterval(interval);
    totalSeconds = 0;
    isRunning = false;
    updateDisplay();
    startButton.disabled = false;
    pauseButton.disabled = true;
  });

  function updateDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    timerDisplay.textContent = [hours, minutes, seconds]
      .map(v => v.toString().padStart(2, '0'))
      .join(':');
  }

  updateDisplay();
  pauseButton.disabled = true;
}

function toggleToolbarMenu() {
  const toolbarMenu = document.getElementById('toolbar-menu');
  
  if (toolbarMenu) {
    toolbarMenu.classList.toggle('hidden');
  }
}

function checkAndUpdateCoins() {
  const now = Date.now();
  const timeDiff = now - lastCoinUpdate;
  
  if (timeDiff >= COIN_INTERVAL) {
    const coinRewards = Math.floor(timeDiff / COIN_INTERVAL) * COIN_REWARD;
    userCoins += coinRewards;
    lastCoinUpdate = now;
    
    // Save to localStorage
    localStorage.setItem('userCoins', userCoins);
    localStorage.setItem('lastCoinUpdate', lastCoinUpdate);
    
    // Update display if visible
    updateCoinDisplay();
    
    // Show notification
    showNotification(`+${coinRewards} coins earned!`);
  }
}

function updateCoinDisplay() {
  const coinDisplay = document.getElementById('coin-display');
  if (coinDisplay) {
    coinDisplay.textContent = userCoins;
  }
}

function purchaseItem(itemId) {
  const item = storeItems.find(i => i.id === itemId);
  if (!item) return;
  
  if (userCoins >= item.price) {
    userCoins -= item.price;
    localStorage.setItem('userCoins', userCoins);
    
    // Save purchased item
    const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems') || '[]');
    if (!purchasedItems.includes(itemId)) {
      purchasedItems.push(itemId);
      localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
    }
    
    updateCoinDisplay();
    showNotification(`Successfully purchased ${item.name}!`);
    
    // Apply item effects
    applyPurchasedItem(item);
    
    // Refresh store display
    openCategory('store');
  } else {
    showNotification('Not enough coins!', 'error');
  }
}

function applyPurchasedItem(item) {
  switch(item.id) {
    case 'pet_companion':
      enableVirtualPet();
      break;
    case 'custom_sounds':
      enableCustomSounds();
      break;
    case 'tab_groups':
      enableTabGroups();
      break;
    case 'quick_notes':
      enableQuickNotes();
      break;
    case 'custom_hotkeys':
      enableCustomHotkeys();
      break;
    case 'proxy_history':
      enableProxyHistory();
      break;
    case 'search_filters':
      enableSearchFilters();
      break;
    case 'proxy_speed':
      enableSpeedBoost();
      break;
    case 'download_manager':
      enableDownloadManager();
      break;
  }
}

function enableVirtualPet() {
  const pet = document.createElement('div');
  pet.className = 'virtual-pet';
  pet.innerHTML = `<img src="/pet-cat.png" alt="Virtual Pet">`;
  document.body.appendChild(pet);
  
  document.addEventListener('mousemove', (e) => {
    if (!pet) return;
    const x = e.clientX;
    const y = e.clientY;
    pet.style.transform = `translate(${x + 20}px, ${y + 20}px)`;
  });
}

function enableCustomSounds() {
  // Add sound effects to various UI interactions
  document.body.addEventListener('click', () => {
    playSound('click');
  });
  
  // Add hover sound to buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
      playSound('hover');
    });
  });
}

function enableTabGroups() {
  // Add tab grouping functionality to proxy interface
  const proxyTabs = document.createElement('div');
  proxyTabs.className = 'proxy-tabs';
  // Implementation details...
}

function enableQuickNotes() {
  // Add floating notepad widget
  const notepad = document.createElement('div');
  notepad.className = 'quick-notes-widget';
  // Implementation details...
}

function enableCustomHotkeys() {
  // Add hotkey configuration interface
  const hotkeyManager = document.createElement('div');
  hotkeyManager.className = 'hotkey-manager';
  // Implementation details...
}

function enableProxyHistory() {
  // Add browsing history tracking and management
  const historyManager = document.createElement('div');
  historyManager.className = 'history-manager';
  // Implementation details...
}

function enableSearchFilters() {
  // Add advanced search filtering options
  const searchFilters = document.createElement('div');
  searchFilters.className = 'search-filters';
  // Implementation details...
}

function enableSpeedBoost() {
  // Implement proxy speed optimizations
  // Implementation details...
}

function enableDownloadManager() {
  // Add download management interface
  const downloadManager = document.createElement('div');
  downloadManager.className = 'download-manager';
  // Implementation details...
}

function playSound(type) {
  const sounds = {
    click: 'click.mp3',
    hover: 'hover.mp3',
    notification: 'notification.mp3'
  };
  
  const audio = new Audio(sounds[type]);
  audio.play().catch(() => {}); // Ignore errors if sound can't play
}

async function initVM() {
  const container = document.getElementById('vm-container');
  
  // First show the welcome message
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center h-full p-8 space-y-6">
      <h2 class="text-4xl font-bold text-white space-glow text-center">VAPOR Private VMs</h2>
      
      <div class="max-w-2xl text-center space-y-4">
        <p class="text-gray-300 text-lg">
          VAPOR Private VMs are isolated, personal browsers available in the cloud.
        </p>
        
        <p class="text-gray-300 text-lg">
          Need to search something? Need to test a sketchy site? Try Private VMs.
        </p>
        
        <p class="text-indigo-400 text-lg">
          12 minutes of uninterrupted browsing. Ran out of time? In a single click, create a new session right away.
        </p>
      </div>

      <button 
        onclick="startVMSession()"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center space-x-3 text-lg font-medium mx-auto"
      >
        <i class="fas fa-play"></i>
        <span>Start Session</span>
      </button>
    </div>
  `;
}

async function startVMSession() {
  const container = document.getElementById('vm-container');
  
  if (!container) {
    console.error('VM container not found. Make sure the element with ID "vm-container" exists.');
    alert('Error initializing VM session. Please try again or contact support.');
    return;
  }

  container.innerHTML = `
    <div class="flex items-center justify-center h-full">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
    </div>
  `;
  
  try {
    const response = await fetch('https://engine.hyperbeam.com/v0/vm', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer sk_live_sW8gQ_SRglb2SzTdx82Jn7x21Tv6Kc2HDy8qIqgLzmk`
      }
    });

    const data = await response.json();
    
    if (data.embed_url) {
      const iframe = document.createElement('iframe');
      iframe.src = data.embed_url;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '0.75rem';
      
      container.innerHTML = ''; // Clear loading spinner
      container.appendChild(iframe);
    } else {
      container.innerHTML = '<p class="text-red-500 text-center mt-4">Failed to initialize VM</p>';
    }
  } catch (error) {
    console.error('VM Error:', error);
    container.innerHTML = `
      <p class="text-red-500 text-center mt-4">
        Error connecting to VM service: ${error.message}
      </p>
    `;
  }
}

setInterval(checkAndUpdateCoins, 60000); // Check every minute
checkAndUpdateCoins(); // Initial check
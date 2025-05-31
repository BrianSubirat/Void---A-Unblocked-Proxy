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

    case 'cheats':
      sidePanel.innerHTML += `
        <iframe 
          id="cheats-iframe" 
          src="https://voidgames-com.pages.dev/cheats" 
          class="w-full h-full border-none"
        ></iframe>
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
      src="${__uv$config.prefix}${__uv$config.encodeUrl(url)}" 
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
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    
    let searchUrl;
    if (urlPattern.test(query)) {
      searchUrl = query.startsWith('http') ? query : `https://${query}`;
    } else {
      searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    }
    
    const sidePanel = document.getElementById('side-panel');
    const updateNotificationBtn = document.getElementById('update-notification-btn');
    
    sidePanel.innerHTML = `
      <div class="w-full flex flex-col h-full">
        <div class="flex items-center gap-2 p-1.5 bg-slate-800/90 border-b border-indigo-500/20">
          <button onclick="proxyGoBack()" class="text-gray-400 hover:text-white p-1.5 rounded hover:bg-slate-700/50 transition-colors">
            <i class="fas fa-arrow-left"></i>
          </button>
          <button onclick="proxyGoForward()" class="text-gray-400 hover:text-white p-1.5 rounded hover:bg-slate-700/50 transition-colors">
            <i class="fas fa-arrow-right"></i>
          </button>
          <button onclick="proxyReload()" class="text-gray-400 hover:text-white p-1.5 rounded hover:bg-slate-700/50 transition-colors">
            <i class="fas fa-redo"></i>
          </button>
          <div class="flex-1 relative flex items-center">
            <input 
              type="text" 
              id="url-bar" 
              value="${searchUrl}"
              class="w-full bg-slate-700/50 text-white px-3 py-1.5 rounded text-sm"
              onkeydown="if(event.key === 'Enter') proxyNavigate(this.value)"
            >
            <div class="absolute right-2 flex items-center gap-1">
              <button onclick="toggleBookmark()" id="bookmark-btn" class="text-gray-400 hover:text-white p-1 rounded hover:bg-slate-700/50 transition-colors">
                <i class="far fa-bookmark"></i>
              </button>
              <button onclick="showProxyMenu(event)" class="text-gray-400 hover:text-white p-1 rounded hover:bg-slate-700/50 transition-colors">
                <i class="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>
        </div>
        <iframe 
          id="proxy-iframe" 
          src="${__uv$config.prefix}${__uv$config.encodeUrl(searchUrl)}" 
          class="flex-1 w-full border-none"
        ></iframe>
      </div>

      <div id="proxy-menu" class="hidden absolute right-4 top-12 bg-slate-800/90 backdrop-blur rounded-lg border border-indigo-500/20 shadow-xl z-50 w-48">
        <div class="py-2">
          <button onclick="showBookmarks()" class="w-full text-left px-4 py-2 text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors flex items-center gap-2">
            <i class="fas fa-bookmark"></i>
            <span>Bookmarks</span>
          </button>
          <button onclick="toggleFullscreen()" class="w-full text-left px-4 py-2 text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors flex items-center gap-2">
            <i class="fas fa-expand"></i>
            <span>Toggle Fullscreen</span>
          </button>
          <button onclick="hideProxy()" class="w-full text-left px-4 py-2 text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors flex items-center gap-2">
            <i class="fas fa-eye-slash"></i>
            <span>Hide Proxy</span>
          </button>
          <button onclick="copyProxyUrl()" class="w-full text-left px-4 py-2 text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors flex items-center gap-2">
            <i class="fas fa-copy"></i>
            <span>Copy URL</span>
          </button>
        </div>
      </div>

      <div id="bookmarks-panel" class="hidden fixed right-0 top-0 h-full w-80 bg-slate-800/90 backdrop-blur border-l border-indigo-500/20 overflow-y-auto z-50 transition-transform duration-300">
        <div class="p-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-white">Bookmarks</h3>
            <button onclick="closeBookmarks()" class="text-gray-400 hover:text-white">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div id="bookmarks-list" class="space-y-2">
            <!-- Bookmarks will be populated here -->
          </div>
        </div>
      </div>
    `;
    
    sidePanel.classList.add('active');
    updateNotificationBtn.style.display = 'none';

    // Update bookmark button if URL is already bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (bookmarks.includes(searchUrl)) {
      bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
    }
  }
}

function proxyGoBack() {
  const iframe = document.getElementById('proxy-iframe');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.history.back();
  }
}

function proxyGoForward() {
  const iframe = document.getElementById('proxy-iframe');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.history.forward();
  }
}

function proxyReload() {
  const iframe = document.getElementById('proxy-iframe');
  if (iframe) {
    iframe.contentWindow.location.reload();
  }
}

function proxyNavigate(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  const iframe = document.getElementById('proxy-iframe');
  if (iframe) {
    iframe.src = `${__uv$config.prefix}${__uv$config.encodeUrl(url)}`;
  }
}

function toggleBookmark() {
  const bookmarkBtn = document.getElementById('bookmark-btn');
  const urlBar = document.getElementById('url-bar');
  const url = urlBar.value;
  
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  const isBookmarked = bookmarks.includes(url);
  
  if (isBookmarked) {
    bookmarks = bookmarks.filter(b => b !== url);
    bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
  } else {
    bookmarks.push(url);
    bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
  }
  
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function showProxyMenu(event) {
  event.stopPropagation();
  const menu = document.getElementById('proxy-menu');
  menu.style.display = 'block';
  
  function closeMenu(e) {
    if (!menu.contains(e.target) && e.target !== event.target) {
      menu.style.display = 'none';
      document.removeEventListener('click', closeMenu);
    }
  }
  
  document.addEventListener('click', closeMenu);
}

function toggleFullscreen() {
  const iframe = document.getElementById('proxy-iframe');
  if (iframe) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      iframe.requestFullscreen();
    }
  }
}

function hideProxy() {
  closeSidePanel();
}

function copyProxyUrl() {
  const urlBar = document.getElementById('url-bar');
  navigator.clipboard.writeText(urlBar.value)
    .then(() => {
      const menu = document.getElementById('proxy-menu');
      const originalHTML = menu.innerHTML;
      menu.innerHTML = `
        <div class="py-4 px-4 text-center text-green-400">
          <i class="fas fa-check mr-2"></i>URL Copied!
        </div>
      `;
      setTimeout(() => {
        menu.innerHTML = originalHTML;
      }, 1500);
    });
}

function showBookmarks() {
  const bookmarksPanel = document.getElementById('bookmarks-panel');
  const bookmarksList = document.getElementById('bookmarks-list');
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  
  bookmarksList.innerHTML = '';
  
  if (bookmarks.length === 0) {
    bookmarksList.innerHTML = `
      <div class="text-center py-4 text-gray-400">
        <i class="fas fa-bookmark mb-2 text-2xl"></i>
        <p>No bookmarks yet</p>
      </div>
    `;
  } else {
    bookmarks.forEach(url => {
      const bookmarkItem = document.createElement('div');
      bookmarkItem.className = 'group flex items-center justify-between p-2 rounded hover:bg-indigo-500/20 transition-colors';
      bookmarkItem.innerHTML = `
        <a href="#" onclick="proxyNavigate('${url}'); return false;" class="flex-1 text-gray-300 hover:text-white truncate">
          <i class="fas fa-globe mr-2"></i>
          ${url}
        </a>
        <button onclick="removeBookmark('${url}')" class="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <i class="fas fa-trash"></i>
        </button>
      `;
      bookmarksList.appendChild(bookmarkItem);
    });
  }
  
  bookmarksPanel.classList.remove('hidden');
  bookmarksPanel.style.transform = 'translateX(0)';
  
  // Close proxy menu
  document.getElementById('proxy-menu').style.display = 'none';
}

function closeBookmarks() {
  const bookmarksPanel = document.getElementById('bookmarks-panel');
  bookmarksPanel.style.transform = 'translateX(100%)';
  setTimeout(() => {
    bookmarksPanel.classList.add('hidden');
  }, 300);
}

function removeBookmark(url) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  bookmarks = bookmarks.filter(b => b !== url);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
  // Update bookmark button if current URL is removed
  const urlBar = document.getElementById('url-bar');
  const bookmarkBtn = document.getElementById('bookmark-btn');
  if (urlBar.value === url) {
    bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
  }
  
  showBookmarks(); // Refresh bookmarks panel
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

  const existingMessage = document.getElementById('no-results-message');
  if (existingMessage) {
    existingMessage.remove();
  }

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
  
  const [monthName, year] = monthDisplay.textContent.split(' ');
  const date = new Date(`${monthName} 1, ${year}`);
  
  date.setMonth(date.getMonth() + change);
  
  monthDisplay.textContent = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  
  updateCalendarGrid(calendarGrid, date);
}

function updateCalendarGrid(grid, date) {
  grid.innerHTML = '';
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.className = 'text-center text-indigo-400 text-sm font-medium';
    dayHeader.textContent = day;
    grid.appendChild(dayHeader);
  });
  
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyDay = document.createElement('div');
    grid.appendChild(emptyDay);
  }
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'text-center py-1 text-gray-300 hover:bg-indigo-500/20 rounded cursor-pointer transition-colors';
    dayCell.textContent = i;
    
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
    
    makeDraggable(widget);
    
    if (type === 'calendar') {
      initCalendarWidget(widget);
    }
    
    widgetsContainer.appendChild(widget);
  }
}

function showTabCloakMenu() {
  const contextMenu = document.getElementById('context-menu');
  const tabCloakMenu = document.getElementById('tab-cloak-menu');
  
  const rect = contextMenu.getBoundingClientRect();
  
  contextMenu.style.display = 'none';
  
  tabCloakMenu.style.display = 'block';
  tabCloakMenu.style.left = rect.left + 'px';
  tabCloakMenu.style.top = rect.top + 'px';
  
  function closeTabCloakMenu(e) {
    if (!tabCloakMenu.contains(e.target)) {
      tabCloakMenu.style.display = 'none';
      document.removeEventListener('click', closeTabCloakMenu);
    }
  }
  
  setTimeout(() => {
    document.addEventListener('click', closeTabCloakMenu);
  }, 100);
}

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
  
  loadTrack(0);
  
  audioPlayer.addEventListener('ended', () => {
    nextTrack();
  });
  
  const musicPlayer = document.getElementById('music-player');
  makeDraggable(musicPlayer);
}

function loadTrack(index) {
  const audioPlayer = document.getElementById('audio-player');
  const trackTitle = document.getElementById('track-title');
  
  currentTrackIndex = index;
  audioPlayer.src = musicTracks[index].url;
  trackTitle.textContent = musicTracks[index].title;
  
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
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function handleContextMenu(event) {
  event.preventDefault(); 
  
  const contextMenu = document.getElementById('context-menu');
  const widgetParent = contextMenu.querySelector('.widget-parent');
  const widgetSubmenu = contextMenu.querySelector('.widget-submenu');
  
  contextMenu.style.display = 'block';
  contextMenu.style.left = `${event.clientX}px`;
  contextMenu.style.top = `${event.clientY}px`;
  
  widgetParent.addEventListener('click', () => {
    widgetSubmenu.classList.toggle('hidden');
  });

  function closeContextMenu(e) {
    if (!contextMenu.contains(e.target)) {
      contextMenu.style.display = 'none';
      widgetSubmenu.classList.add('hidden');
      document.removeEventListener('click', closeContextMenu);
    }
  }
  
  document.addEventListener('click', closeContextMenu);
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('contextmenu', handleContextMenu);
});

function removeWidget(widget) {
  widget.remove();
}

async function updateSystemInfo() {
  // Get battery info
  try {
    const battery = await navigator.getBattery();
    const batteryLevel = Math.round(battery.level * 100);
    const batteryStatus = battery.charging ? 'Charging' : 'Not charging';
    document.getElementById('battery-info').innerHTML = `
      <span class="flex items-center gap-2">
        <i class="${getBatteryIcon(batteryLevel, battery.charging)}"></i>
        ${batteryLevel}%
      </span>
    `;
  } catch (err) {
    document.getElementById('battery-info').innerHTML = `
      <span class="flex items-center gap-2">
        <i class="fas fa-battery-full"></i>
        N/A
      </span>
    `;
  }

  // Get ping
  try {
    const start = performance.now();
    await fetch('/ping', { method: 'HEAD' });
    const end = performance.now();
    const ping = Math.round(end - start);
    document.getElementById('ping-info').innerHTML = `
      <span class="flex items-center gap-2">
        <i class="${getPingIcon(ping)}"></i>
        ${ping}ms
      </span>
    `;
  } catch (err) {
    document.getElementById('ping-info').innerHTML = `
      <span class="flex items-center gap-2">
        <i class="fas fa-signal"></i>
        N/A
      </span>
    `;
  }
}

function getBatteryIcon(level, charging) {
  if (charging) return 'fas fa-battery-full text-green-400';
  if (level > 75) return 'fas fa-battery-full text-green-400';
  if (level > 50) return 'fas fa-battery-three-quarters text-green-400';
  if (level > 25) return 'fas fa-battery-half text-yellow-400';
  return 'fas fa-battery-quarter text-red-400';
}

function getPingIcon(ping) {
  if (ping < 50) return 'fas fa-signal text-green-400';
  if (ping < 100) return 'fas fa-signal text-yellow-400';
  return 'fas fa-signal text-red-400';
}

document.addEventListener('DOMContentLoaded', () => {
  updateSystemInfo();
  setInterval(updateSystemInfo, 5000); // Update every 5 seconds
});
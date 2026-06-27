const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const fs = require('fs');

// VERİ DİZİNİ: C:\ProgramData\2jyymium\browser_data
const programDataDir = process.env.PROGRAMDATA || 'C:\\ProgramData';
const customDataPath = path.join(programDataDir, '2jyymium', 'browser_data');
try {
  if (!fs.existsSync(customDataPath)) fs.mkdirSync(customDataPath, { recursive: true });
  app.setPath('userData', customDataPath);
  app.setPath('sessionData', customDataPath);
} catch (err) {
  console.log('Veri dizini uyarısı:', err.message);
}

// ── DE-GOOGLING & TELEMETRİ TEMİZLİĞİ ──────────────────────────
app.commandLine.appendSwitch('disable-client-side-phishing-detection');
app.commandLine.appendSwitch('disable-component-extensions-with-background-pages');
app.commandLine.appendSwitch('disable-default-apps');
app.commandLine.appendSwitch('disable-domain-reliability');
app.commandLine.appendSwitch('disable-features',
  'AutofillServerCommunication,CertificateTransparencyComponentUpdater,' +
  'InterestFeedContentSuggestions,SafetyCheck,Translate,OptimizationHints,MediaRouter');
app.commandLine.appendSwitch('disable-hang-monitor');
app.commandLine.appendSwitch('disable-prompt-on-repost');
app.commandLine.appendSwitch('disable-sync');
app.commandLine.appendSwitch('no-default-browser-check');
app.commandLine.appendSwitch('no-first-run');
app.commandLine.appendSwitch('no-pings');
app.commandLine.appendSwitch('no-service-autorun');

// ── PERFORMANS & GPU (stabil set) ────────────────────────────────
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-accelerated-2d-canvas');
app.commandLine.appendSwitch('enable-features',
  'GpuRasterization,ZeroCopy,FastUnload,ParallelDownloading,TcpFastOpen');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disk-cache-size', '1073741824');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 850,
    title: '2jyymium',
    autoHideMenuBar: true,
    backgroundColor: '#202124',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
      experimentalFeatures: true,
      spellcheck: false,
      nativeWindowOpen: true
    }
  });

  const customUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 2jyymium/1.0.0';
  session.defaultSession.setUserAgent(customUserAgent);

  // Native WebRequest Adblocker
  const blockRules = [
    'doubleclick.net', 'google-analytics.com', 'googletagmanager.com',
    'facebook.net/tr', 'analytics.twitter.com', 'scorecardresearch.com',
    'quantserve.com', 'outbrain.com', 'taboola.com', 'adnxs.com',
    'adservice.google.com', 'pagead2.googlesyndication.com', 'amazon-adsystem.com',
    'criteo.com', 'popads.net', 'popcash.net', 'propellerads.com'
  ];
  session.defaultSession.webRequest.onBeforeRequest({ urls: ['*://*/*'] }, (details, callback) => {
    const url = details.url.toLowerCase();
    callback({ cancel: blockRules.some(r => url.includes(r)) });
  });

  // DNT & Sec-GPC Headers
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['DNT'] = '1';
    details.requestHeaders['Sec-GPC'] = '1';
    callback({ requestHeaders: details.requestHeaders });
  });

  session.defaultSession.setPermissionRequestHandler((wc, permission, cb) => cb(true));

  win.loadFile(path.join(__dirname, 'index.html'));
}

const { ipcMain, shell } = require('electron');

app.on('web-contents-created', (event, contents) => {
  if (contents.getType() === 'webview') {
    contents.setWindowOpenHandler(() => ({ action: 'allow' }));
  }
});

ipcMain.handle('get-extensions', () => {
  return session.defaultSession.getAllExtensions();
});

ipcMain.on('open-extension-folder', (event, folderPath) => {
  shell.showItemInFolder(folderPath);
});

ipcMain.handle('toggle-extension', (event, id, enabled) => {
  // Not fully supported dynamically in electron without reload, but we can mock or do nothing
  return true;
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
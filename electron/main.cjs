const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');
const http = require('http');

let mainWindow;
let authServer = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 880,
    minWidth: 1000,
    minHeight: 700,
    title: 'VaultMaster OS - Sovereign Encrypted Cloud Vault',
    backgroundColor: '#0F172A',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true
    },
    autoHideMenuBar: true
  });

  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    mainWindow.loadURL('http://localhost:5174/#app');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'), { hash: 'app' });
  }

  // Open external links in default web browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (authServer) {
      try { authServer.close(); } catch(e) {}
    }
  });
}

// Handle Google OAuth via system default browser (Chrome/Edge)
ipcMain.handle('start-google-auth', async () => {
  if (authServer) {
    try { authServer.close(); } catch(e) {}
  }

  return new Promise((resolve, reject) => {
    authServer = http.createServer((req, res) => {
      if (req.url === '/' || req.url.startsWith('/callback')) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>VaultMaster OS - Authenticated</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0B132B; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
              .box { background: #1C2541; padding: 48px 36px; border-radius: 24px; border: 1px solid #3A506B; max-width: 440px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
              .icon { font-size: 48px; margin-bottom: 16px; }
              h2 { color: #60A5FA; margin: 0 0 10px 0; font-size: 24px; font-weight: 800; }
              p { color: #94A3B8; font-size: 14px; line-height: 1.6; margin: 0; }
            </style>
          </head>
          <body>
            <div class="box">
              <div class="icon">🛡️</div>
              <h2>Login Successful!</h2>
              <p>VaultMaster OS has been authenticated successfully.<br>You can now close this tab and return to the application.</p>
            </div>
            <script>
              if (window.location.hash) {
                const params = new URLSearchParams(window.location.hash.substring(1));
                const accessToken = params.get('access_token');
                const refreshToken = params.get('refresh_token');
                if (accessToken) {
                  fetch('/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ accessToken, refreshToken })
                  });
                }
              }
            </script>
          </body>
          </html>
        `);
      } else if (req.url === '/token' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          res.writeHead(200);
          res.end('OK');
          try {
            const data = JSON.parse(body);
            if (mainWindow) {
              mainWindow.webContents.send('auth-success', data);
              mainWindow.show();
              mainWindow.focus();
            }
          } catch(e) {}
          setTimeout(() => {
            if (authServer) {
              try { authServer.close(); } catch(e) {}
              authServer = null;
            }
          }, 1000);
          resolve();
        });
      }
    });

    authServer.listen(54321, () => {
      const authUrl = 'https://fjzdsxawpgnprjsxvnfg.supabase.co/auth/v1/authorize?provider=google&redirect_to=http://localhost:54321/callback';
      shell.openExternal(authUrl);
    });

    authServer.on('error', (err) => {
      console.error('Auth server error:', err);
      try { authServer.close(); } catch(e) {}
      authServer = null;
      reject(err);
    });
  });
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

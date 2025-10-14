interface WindowApi {
  // 最大化最小化相关
  closeWindow: () => void;
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  onWindowMaximized: (callback: (isMaximized: boolean) => void) => void;
  isWindowMaximized: () => Promise<boolean>;
  // 主题相关
  setThemeMode: (mode: ThemeMode) => Promise<boolean>;
  getThemeMode: () => Promise<ThemeMode>;
  isDarkTheme: () => Promise<boolean>;
  onSystemThemeChange: (callback: (isDark: boolean) => void) => void;
  // 日志/错误处理相关
  logger: {
    error: (message: string, ...meta: any[]) => void;
    info: (message: string, ...meta: any[]) => void;
    debug: (message: string, ...meta: any[]) => void;
    warn: (message: string, ...meta: any[]) => void;
  };
}

declare interface Window {
  api: WindowApi;
}

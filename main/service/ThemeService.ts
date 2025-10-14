import { IPC_EVENTS } from "@common/constants";
import logManager from "./LogService";
import { ThemeMode } from "@common/types";
import { BrowserWindow, ipcMain, nativeTheme } from "electron";

class ThemeService {
  private _isDark: boolean = nativeTheme.shouldUseDarkColors;
  private static _instance: ThemeService;

  private constructor() {
    const themeMode = "dark";
    if (themeMode) {
      nativeTheme.themeSource = themeMode;
      this._isDark = nativeTheme.shouldUseDarkColors;
    }
    this._setupIpcEvent();
    logManager.info("ThemeService initialized successfully.");
  }

  private _setupIpcEvent() {
    // 使用hanlder处理来自renderer的操作请求
    ipcMain.handle(IPC_EVENTS.SET_THEME_MODE, (_e, mode: ThemeMode) => {
      nativeTheme.themeSource = mode;
      return nativeTheme.shouldUseDarkColors;
    });

    ipcMain.handle(IPC_EVENTS.GET_THEME_MODE, (_e) => {
      return this.themeMode;
    });

    ipcMain.handle(IPC_EVENTS.IS_DARK_THEME, (_e) => {
      return this.isDark;
    });

    //监听系统主题编号
    nativeTheme.on("updated", () => {
      logManager.info("ThemeService updated theme mode to" + this.themeMode);
      this._isDark = nativeTheme.shouldUseDarkColors;
      //给所有的窗口发送主题模式更新事件
      BrowserWindow.getAllWindows().forEach((window) => {
        logManager.info("ThemeService updated theme mode to" + this.themeMode + " for window " + window.id);
        window.webContents.send(IPC_EVENTS.THEME_MODE_UPDATED, this.themeMode);
      });
    });
  }
  /**
   * 获取ThemeService实例
   * @returns ThemeService实例
   */
  public static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new ThemeService();
    return this._instance;
  }

  public get isDark() {
    return this._isDark;
  }

  public get themeMode() {
    return nativeTheme.themeSource;
  }
}

export const themeService = ThemeService.getInstance();
export default themeService;

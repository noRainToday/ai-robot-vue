import { IPC_EVENTS } from "@common/constants";
import { promisify } from "util";
import { app, ipcMain } from "electron";
import log from "electron-log";
import * as path from "path";
import * as fs from "fs";

// 转换为Promise形式的fs方法
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const unlinkAsync = promisify(fs.unlink);

class LogService {
  private static _instance: LogService;

  // 日志保留天数，默认7天
  private LOG_RETENTION_DAYS = 7;

  // 清理间隔，默认24小时（毫秒）
  private readonly CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000;

  constructor() {
    console.log("LogService constructor");
    // 创建文件夹保存日志文件
    const logPath = path.join(app.getPath("userData"), "logs");
    // c:users/{username}/AppData/Roaming/{appName}/logs
    // 创建日志目录
    try {
      if (!fs.existsSync(logPath)) {
        fs.mkdirSync(logPath, { recursive: true });
      }
    } catch (err) {
      this.error("Failed to create log directory:", err);
    }

    // 监听main进程的日志
    // 配置electron-log
    log.transports.file.resolvePathFn = () => {
      // 使用当前日期作为日志文件名，格式为 YYYY-MM-DD.log
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      return path.join(logPath, `${formattedDate}.log`);
    };

    // 配置日志格式
    log.transports.file.format =
      "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}";

    // 配置日志文件大小限制，默认10MB
    log.transports.file.maxSize = 10 * 1024 * 1024; // 10MB

    // 配置控制台日志级别，开发环境可以设置为debug，生产环境可以设置为info
    log.transports.console.level =
      process.env.NODE_ENV === "development" ? "debug" : "info";

    // 配置文件日志级别
    log.transports.file.level = "debug";
    // 重写console
    this._rewriteConsole();
    // 定时清理旧日志文件
    this._scheduleLogCleanup();
    // main 进程注册清理旧日志文件的事件
    this._setupIpcEvents();
  }
  /**
   * 注册main进程的日志事件
   */
  private _setupIpcEvents() {
    ipcMain.on(IPC_EVENTS.LOG_DEBUG, (_event, message, ...meta) => {
      this.debug(message, ...meta);
    });
    ipcMain.on(IPC_EVENTS.LOG_INFO, (_event, message, ...meta) => {
      this.info(message, ...meta);
    });
    ipcMain.on(IPC_EVENTS.LOG_WARN, (_event, message, ...meta) => {
      this.warn(message, ...meta);
    });
    ipcMain.on(IPC_EVENTS.LOG_ERROR, (_event, message, ...meta) => {
      this.error(message, ...meta);
    });
  }
  /**
   * 定时清理旧日志文件
   */
  private _scheduleLogCleanup() {
    // 启动清理一次
    this._cleanupOldLogs();
    // 定时清理旧日志文件
    setInterval(() => {
      this._cleanupOldLogs();
    }, this.CLEANUP_INTERVAL_MS);
  }

  /**
   * 清理旧日志文件
   */
  private async _cleanupOldLogs() {
    try {
      const logPath = path.join(app.getPath("userData"), "logs");

      if (!fs.existsSync(logPath)) return;

      const now = new Date();
      const expirationDate = new Date(
        now.getTime() - this.LOG_RETENTION_DAYS * 24 * 60 * 60 * 1000
      );

      const files = await readdirAsync(logPath);

      let deletedCount = 0;

      for (const file of files) {
        if (!file.endsWith(".log")) continue;
        const filePath = path.join(logPath, file);
        try {
          const stats = await statAsync(filePath);
          if (stats.isFile() && stats.birthtime < expirationDate) {
            await unlinkAsync(filePath);
            deletedCount++;
          }
        } catch (error) {
          this.error(`Failed to delete old log file ${filePath}:`, error);
        }
      }
      if (deletedCount > 0) {
        this.info(`Successfully cleaned up ${deletedCount} old log files.`);
      }
    } catch (err) {
      this.error("Failed to cleanup old logs:", err);
    }
  }
  /**
   * 重写console方法，将其输出到日志文件中
   */
  private _rewriteConsole() {
    console.log = log.info;
    console.info = log.info;
    console.warn = log.warn;
    console.error = log.error;
  }
  /**
   * 获取LogService实例
   * @returns {LogService} LogService实例
   */
  public static getInstance(): LogService {
    if (!this._instance) {
      this._instance = new LogService();
    }
    return this._instance;
  }

  /**
   * 记录调试信息
   * @param {string} message - 日志消息
   * @param {any[]} meta - 附加的元数据
   */
  public debug(message: string, ...meta: any[]): void {
    log.debug(message, ...meta);
  }

  /**
   * 记录一般信息
   * @param {string} message - 日志消息
   * @param {any[]} meta - 附加的元数据
   */
  public info(message: string, ...meta: any[]): void {
    log.info(message, ...meta);
  }

  /**
   * 记录警告信息
   * @param {string} message - 日志消息
   * @param {any[]} meta - 附加的元数据
   */
  public warn(message: string, ...meta: any[]): void {
    log.warn(message, ...meta);
  }

  /**
   * 记录错误信息
   * @param {string} message - 日志消息
   * @param {any[]} meta - 附加的元数据，通常是错误对象
   */
  public error(message: string, ...meta: any[]): void {
    log.error(message, ...meta);
  }


  /**
   * 记录用户操作日志
   * @param {string} message - 日志消息
   * @param {any[]} meta - 附加的元数据
   */
  public logUserOperation(message: string, ...meta: any[]): void {
    log.info(message, ...meta);
  }
}

export const logManager = LogService.getInstance();
export default logManager;

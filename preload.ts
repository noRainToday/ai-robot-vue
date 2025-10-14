// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { IPC_EVENTS } from "@common/constants";

const api: WindowApi = {
  closeWindow: () => ipcRenderer.send(IPC_EVENTS.CLOSE_WINDOW),
  minimizeWindow: () => ipcRenderer.send(IPC_EVENTS.MINIMIZE_WINDOW),
  maximizeWindow: () => ipcRenderer.send(IPC_EVENTS.MAXIMIZE_WINDOW),
  onWindowMaximized: (callback: (isMaximized: boolean) => void) =>
    ipcRenderer.on(IPC_EVENTS.MAXIMIZE_WINDOW + "back", (_, isMaximized) =>
      callback(isMaximized)
    ),
  isWindowMaximized: () => ipcRenderer.invoke(IPC_EVENTS.IS_WINDOW_MAXIMIZED),

  logger: {
    error: (message: string, ...meta: any[]) =>
      ipcRenderer.send(IPC_EVENTS.LOG_ERROR, message, ...meta),
    info: (message: string, ...meta: any[]) =>
      ipcRenderer.send(IPC_EVENTS.LOG_INFO, message, ...meta),
    debug: (message: string, ...meta: any[]) =>
      ipcRenderer.send(IPC_EVENTS.LOG_DEBUG, message, ...meta),
    warn: (message: string, ...meta: any[]) =>
      ipcRenderer.send(IPC_EVENTS.LOG_WARN, message, ...meta),
  },
};

contextBridge.exposeInMainWorld("api", api);

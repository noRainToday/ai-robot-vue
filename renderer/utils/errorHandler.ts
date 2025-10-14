/**
 * 使用vue Plugin进行错误处理
 */
import type { Plugin } from "vue";
import logger from "./logger";

export const errorHandlerPlugin: Plugin = (app) => {
  app.config.errorHandler = (err, instance, info) => {
    logger.error("Vue 错误捕获:", err, instance, info);
  };
  window.onerror = (message, source, lineno, colno, error) => {
    logger.error("Window error:", message, source, lineno, colno, error);
  };

  window.onunhandledrejection = (event) => {
    logger.error("Unhandled Promise Rejection:", event);
  };
};

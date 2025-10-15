import { createI18n, I18n, type I18nOptions } from "vue-i18n";
const languages = ["zh", "en"] as const;
type LanguageType = (typeof languages)[number];
// legacy 是 vue-i18n 的旧版 API，不支持响应式 ，我们使用vue3 所以设置为false;
async function createI18nInstance() {
  const options: I18nOptions = {
    locale: "zh",
    fallbackLocale: "zh",
    legacy: false, // false 表示使用 Composition API 模式
    messages: {
      zh: await import("@locales/zh.json").then((m) => m.default),
      en: await import("@locales/en.json").then((m) => m.default),
    },
  };

  const i18n = createI18n(options);
  return i18n;
}

export const i18n = await createI18nInstance();

export const getLanguage = () => {
  /**
   * 兼容 vue2 与 vue3
   * vue2 中使用 i18n.global.locale 来获取当前语言      
   * vue3 中使用 i18n.global.locale.value 来获取当前语言   Composition API 
   */
  if (i18n.mode === "legacy") {
    return i18n.global.locale;
  }
  return (i18n.global.locale as unknown as Ref<LanguageType>).value;
};

export const setLanguage = (lang: LanguageType, _i18n?: I18n) => {
  const __i18n = _i18n ?? i18n;
  if (__i18n.mode === "legacy") {
    __i18n.global.locale = lang;
    return;
  }
  (__i18n.global.locale as unknown as Ref<LanguageType>).value = lang;
};

export default i18n;

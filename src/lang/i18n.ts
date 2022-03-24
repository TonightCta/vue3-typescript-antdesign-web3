import VueI18n from 'vue-i18n';
import zhLocale from './zh-CN';
import enLocale from './en';

const language: string = localStorage.getItem('language') || 'zh-CN';
const messages: {} = {
    'zh-CN': zhLocale,
    en: enLocale
}
const i18n: any = new VueI18n({
    locale: language,
    messages,
});
export default i18n;
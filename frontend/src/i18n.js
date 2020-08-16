import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Password missmatch': 'Password missmatch',
                'Username': 'Username',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Login': 'Login',
                'Logout': 'Logout',
                'Users': 'Users',
                'Next': 'next >',
                'Previous': '< previous',
                'Load Failure': 'Load Failure',
                'User Not Found!': 'User Not Found!'
            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Password missmatch': 'Aynı şifreyi giriniz',
                'Username': 'Kullanıcı Adı',
                'Display Name': 'Tercih Edilen İsim',
                'Password': 'Şifre',
                'Password Repeat': 'Şifre Tekrarla',
                'Login': 'Giriş',
                'Logout': 'Çıkış',
                'Users': 'Kullanıcılar',
                'Next': 'sonraki >',
                'Previous': '< önceki',
                'Load Failure': 'Liste Alınamadı',
                'User Not Found!': 'Kullanıcı Bulunamadı!'
            }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});

export default i18n;
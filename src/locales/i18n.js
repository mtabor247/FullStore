import { createI18n } from "vue-i18n";
import en from './en.json';
import us from './us.json';
import fr from './fr.json';

const i18n = createI18n({
    locale: "Español",
    messages: {
        Español: en,
        Ingles: us,
        Frances: fr,
    },
});

export default i18n;
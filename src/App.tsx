import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Lang } from './lang/Lang';
import { Private } from './Private';
import { Public } from './Public';
import { useAuthStore } from './store/AuthStore';

i18n.use(initReactI18next).init({
	fallbackLng: 'ru',
	interpolation: {
		escapeValue: false,
	},
	resources: {
		ru: { translation: Lang.ru },
		uz: { translation: Lang.uz },
	},
});

function App() {
	const token = useAuthStore((state) => state.token);
	if (token) {
		return <Private />;
	}
	return <Public />;
}

export default App;

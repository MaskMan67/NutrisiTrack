

interface Props {
    currentPage: string;
    onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: Props) {
    return (
        <nav className="tab-bar">
            <button
                className={`tab-bar__item ${currentPage === 'dashboard' ? 'tab-bar__item--active' : ''}`}
                onClick={() => onNavigate('dashboard')}
            >
                <span className="tab-bar__icon">🏠</span>
                <span className="tab-bar__label">Beranda</span>
            </button>
            <button
                className={`tab-bar__item ${currentPage === 'food' ? 'tab-bar__item--active' : ''}`}
                onClick={() => onNavigate('food')}
            >
                <span className="tab-bar__icon">🍽️</span>
                <span className="tab-bar__label">Makanan</span>
            </button>
            <button
                className={`tab-bar__item ${currentPage === 'stats' ? 'tab-bar__item--active' : ''}`}
                onClick={() => onNavigate('stats')}
            >
                <span className="tab-bar__icon">📊</span>
                <span className="tab-bar__label">Statistik</span>
            </button>
            <button
                className={`tab-bar__item ${currentPage === 'profile' ? 'tab-bar__item--active' : ''}`}
                onClick={() => onNavigate('profile')}
            >
                <span className="tab-bar__icon">👤</span>
                <span className="tab-bar__label">Profil</span>
            </button>
        </nav>
    );
}

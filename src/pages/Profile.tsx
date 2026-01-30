import { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { clearAllData, saveProfile } from '../services/storage';
import ThemeToggle from '../components/ThemeToggle';

interface Props {
    profile: UserProfile | null;
    onProfileUpdate: (profile: UserProfile) => void;
}

export default function Profile({ profile, onProfileUpdate }: Props) {
    const [formData, setFormData] = useState<UserProfile>({
        age: 17,
        weight: 60,
        height: 165,
        gender: 'male',
        activity: 1.55
    });

    useEffect(() => {
        if (profile) {
            setFormData(profile);
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: id === 'gender' ? value : Number(value)
        }));
    };

    const handleSave = () => {
        saveProfile(formData);
        onProfileUpdate(formData);
        alert('Profil tersimpan!');
    };

    const handleReset = () => {
        if (confirm('Apakah Anda yakin ingin menghapus semua data?')) {
            clearAllData();
            window.location.reload();
        }
    };

    return (
        <div className="page__content">
            <div className="card">
                <div className="card__header">
                    <span className="card__icon">👤</span>
                    <h2 className="card__title">Profil Pengguna</h2>
                </div>

                <div className="form-group">
                    <label className="form-label">Umur (tahun) & Berat (kg)</label>
                    <div className="form-row">
                        <input
                            type="number" id="age" className="form-input"
                            value={formData.age} onChange={handleChange} min="10" max="100"
                        />
                        <input
                            type="number" id="weight" className="form-input"
                            value={formData.weight} onChange={handleChange} min="20" max="200"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Tinggi (cm) & Gender</label>
                    <div className="form-row">
                        <input
                            type="number" id="height" className="form-input"
                            value={formData.height} onChange={handleChange} min="100" max="250"
                        />
                        <select id="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                            <option value="male">Laki-laki</option>
                            <option value="female">Perempuan</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Tingkat Aktivitas</label>
                    <select id="activity" className="form-select" value={formData.activity} onChange={handleChange}>
                        <option value="1.2">Sedentari (jarang olahraga)</option>
                        <option value="1.375">Ringan (1-3x/minggu)</option>
                        <option value="1.55">Moderat (3-5x/minggu)</option>
                        <option value="1.725">Aktif (6-7x/minggu)</option>
                        <option value="1.9">Sangat Aktif (atlet)</option>
                    </select>
                </div>

                <button className="btn btn--primary btn--block" onClick={handleSave}>
                    🔄 Simpan & Hitung
                </button>
            </div>

            <div className="card">
                <div className="card__header">
                    <span className="card__icon">🎨</span>
                    <h2 className="card__title">Tampilan</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ThemeToggle />
                </div>
            </div>

            <div className="card">
                <div className="card__header">
                    <span className="card__icon">💾</span>
                    <h2 className="card__title">Kelola Data</h2>
                </div>
                <button className="btn btn--danger btn--block" onClick={handleReset}>
                    🗑️ Reset Semua Data
                </button>
            </div>

            <div className="card">
                <div className="card__header">
                    <span className="card__icon">ℹ️</span>
                    <h2 className="card__title">Tentang</h2>
                </div>
                <div className="app-info">
                    <p>⚠️ <strong>Disclaimer:</strong> Aplikasi ini bersifat edukatif.</p>
                    <p className="mt-sm">© 2026 NutriScan React</p>
                </div>
            </div>
        </div>
    );
}

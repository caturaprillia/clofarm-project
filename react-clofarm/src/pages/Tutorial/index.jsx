// Nama file: /pages/tutorial/index.jsx atau /components/TutorialPage.jsx

import React from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import cardImg from '../../assets/images/dumpict.jpg'; // Pastikan path gambar ini benar
import Sidebar from '../../components/layout/Sidebar';

// --- Data Dummy ---
const mockTutorials = [
  { id: 1, title: 'Cara Menanam Padi', description: 'Panduan lengkap dari benih hingga panen.' },
  { id: 2, title: 'Budidaya Hidroponik', description: 'Mulai kebun hidroponik di rumah Anda.' },
  { id: 3, title: 'Manajemen Irigasi', description: 'Teknik irigasi modern untuk efisiensi air.' },
  { id: 4, title: 'Pengendalian Hama', description: 'Metode organik untuk melindungi tanaman.' },
  { id: 5, title: 'Pupuk Kompos Organik', description: 'Ubah sampah organik menjadi pupuk kaya nutrisi.' },
  { id: 6, title: 'Agrowisata dari Nol', description: 'Membangun bisnis agrowisata yang sukses.' },
];

// --- Komponen Kartu Tutorial ---
const TutorialCard = ({ title, description }) => (
    <div style={styles.card}>
      <img src={cardImg} alt={title} style={styles.cardImage} />
      <div style={styles.cardContent}>
        <h3 style={styles.cardTitle}>{title}</h3>
        <p style={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );

// --- Komponen Utama Halaman ---
export default function TutorialPage() {
  const doLogout = () => {
    alert('Tombol Sign Out diklik!');
  };
  const [searchHover, setSearchHover] = React.useState(false);

  return (
    <div style={styles.pageContainer}>
      <header style={styles.pageHeader}>
        <span style={{ fontWeight: 700, fontSize: '22px' }}>Clofarm</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <button onClick={doLogout} style={styles.headerButton}>
            <LogoutOutlined /> Sign Out
          </button>
          <SettingOutlined style={styles.settingsIcon} />
        </div>
      </header>

      <div style={styles.bodyContainer}>
        <Sidebar />
        <main style={styles.mainContent}>
          <header style={styles.contentHeader}>
            <h1>Tutorial</h1>
          </header>

          <div
            style={{
              ...styles.searchInputWrapper,
              borderColor: searchHover ? '#27ae60' : '#d1d5db',
              boxShadow: searchHover ? '0 0 0 2px #bfe4ce' : 'none',
            }}
            onMouseEnter={() => setSearchHover(true)}
            onMouseLeave={() => setSearchHover(false)}
          >
            <SearchOutlined style={{
              fontSize: 22,
              color: searchHover ? '#27ae60' : '#b0b7c3',
              marginRight: 10,
              transition: 'color 0.2s',
            }} />
            <input
              type="text"
              placeholder="Search..."
              style={{ ...styles.searchInput }}
            />
          </div>
          
          <div style={styles.cardGrid}>
            {[...mockTutorials, ...mockTutorials].map((tutorial, index) => (
              <TutorialCard key={`${tutorial.id}-${index}`} {...tutorial} />
            ))}
          </div>
        </main>
      </div>

      <footer style={styles.pageFooter}>
        &copy; {new Date().getFullYear()} Clofarm. All rights reserved.
      </footer>
    </div>
  );
}

// --- Objek Gaya (CSS-in-JS) ---
const styles = {
  // --- Layout Utama ---
  pageContainer: {
    display: 'flex', flexDirection: 'column', height: '100vh',
    fontFamily: '"Poppins", sans-serif', backgroundColor: '#f9fafb',
  },
  bodyContainer: {
    display: 'flex', flex: 1, overflow: 'hidden', width: '100%',
  },
  mainContent: {
    flex: 1,
    padding: '30px 20px', // lebih kecil
    overflowY: 'auto',
    width: '100%',
    maxWidth: 'none',
  },
  // --- Header & Footer ---
  pageHeader: {
    padding: '15px 40px', background: 'white', borderBottom: '1px solid #e5e7eb',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
  },
  pageFooter: {
    padding: '15px 0', textAlign: 'center', color: '#6b7280', fontSize: 14,
    background: 'white', borderTop: '1px solid #e5e7eb', flexShrink: 0,
  },
  headerButton: {
    display: 'flex', alignItems: 'center', gap: 8, background: '#f9fafb',
    border: '1px solid #d1d5db', borderRadius: 8, padding: '8px 16px',
    fontSize: 15, fontWeight: 500, color: '#374151', cursor: 'pointer',
  },
  settingsIcon: { fontSize: 22, color: '#6b7280', cursor: 'pointer' },
  
  // --- Konten Utama ---
  contentHeader: { paddingBottom: '20px', borderBottom: '1px solid #e5e7eb', marginBottom: '30px' },
  searchInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    padding: '0 16px',
    height: '48px',
    marginBottom: '30px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  searchInput: {
    width: '100%',
    height: '100%',
    padding: 0,
    fontSize: '16px',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1,
    boxShadow: 'none',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4 kolom tetap di desktop
    gap: '25px',
    width: '100%',
    margin: 0,
  },
  card: {
    backgroundColor: 'white', border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)', borderRadius: '12px',
    display: 'flex', flexDirection: 'column',
  },
  cardImage: {
    height: '160px', width: '100%', objectFit: 'cover',
    borderTopLeftRadius: '12px', borderTopRightRadius: '12px',
  },
  cardContent: { padding: '15px' },
  cardTitle: { margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#111827' },
  cardDescription: { margin: 0, fontSize: '14px', color: '#6b7280', lineHeight: 1.5 },
};
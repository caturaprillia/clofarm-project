import React from 'react';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';

const styles = {
  pageHeader: {
    padding: '15px 40px', background: 'white', borderBottom: '1px solid #e5e7eb',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
    fontFamily: 'Poppins, sans-serif',
  },
  headerButton: {
    display: 'flex', alignItems: 'center', gap: 8, background: '#f9fafb',
    border: '1px solid #d1d5db', borderRadius: 8, padding: '8px 16px',
    fontSize: 15, fontWeight: 500, color: '#374151', cursor: 'pointer',
  },
  settingsIcon: { fontSize: 22, color: '#6b7280', cursor: 'pointer' },
};

const Header = () => {
  const doLogout = () => {
    alert('Tombol Sign Out diklik!');
  };
  return (
    <header style={styles.pageHeader}>
      <span style={{ fontWeight: 700, fontSize: '22px' }}>Clofarm</span>
      {/* <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <button onClick={doLogout} style={styles.headerButton}>
          <LogoutOutlined /> Sign Out
        </button>
        <SettingOutlined style={styles.settingsIcon} />
      </div> */}
    </header>
  );
};

export default Header;

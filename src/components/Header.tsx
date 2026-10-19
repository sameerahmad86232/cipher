import React, { useEffect, useState } from 'react';

interface HeaderProps {
  currentView: 'dictionary' | 'translator' | 'about' | 'guide' | 'orthography' | 'seerah';
  onSelectView: (view: 'dictionary' | 'translator' | 'about' | 'guide' | 'orthography' | 'seerah') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onSelectView }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <header className="site-header">
      <div
        className="brand"
        onClick={() => onSelectView('dictionary')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') onSelectView('dictionary'); }}
      >
        <span className="brand-mark">ک</span>
        <span>
          <strong>Koshur Lughat</strong>
          <small>کٲشُر لُغَتھ</small>
        </span>
      </div>

      <nav aria-label="Primary navigation">
        {deferredPrompt && (
          <button
            id="install-app"
            className="nav-link install-app"
            type="button"
            onClick={handleInstallClick}
          >
            Install app
          </button>
        )}
        <button
          className={`nav-link ${currentView === 'seerah' ? 'active' : ''}`}
          type="button"
          onClick={() => onSelectView('seerah')}
        >
          Seerah
        </button>
        <button
          className={`nav-link ${currentView === 'dictionary' ? 'active' : ''}`}
          type="button"
          onClick={() => onSelectView('dictionary')}
        >
          Dictionary
        </button>
        <button
          className={`nav-link ${currentView === 'translator' ? 'active' : ''}`}
          type="button"
          onClick={() => onSelectView('translator')}
        >
          Translator
        </button>
        <button
          className={`nav-link ${currentView === 'about' ? 'active' : ''}`}
          type="button"
          onClick={() => onSelectView('about')}
        >
          About
        </button>
        <button
          className={`nav-link ${currentView === 'guide' ? 'active' : ''}`}
          type="button"
          onClick={() => onSelectView('guide')}
        >
          Language guide
        </button>
        <button
          className={`nav-link ${currentView === 'orthography' ? 'active' : ''}`}
          type="button"
          onClick={() => onSelectView('orthography')}
        >
          Orthography
        </button>
      </nav>
    </header>
  );
};

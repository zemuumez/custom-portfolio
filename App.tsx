import React, { useState, useEffect } from 'react';
import LandingSelection from './components/LandingSelection';
import DesignerPortfolio from './components/DesignerPortfolio';
import CyberPortfolio from './components/CyberPortfolio';
import LoadingScreen from './components/LoadingScreen';
import SocialMediaPopup from './components/SocialMediaPopup';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LOADING);
  const [showSocialPopup, setShowSocialPopup] = useState(false);
  
  // Independent states to ensure popup shows once for EACH portfolio view per session
  const [hasShownDesignerPopup, setHasShownDesignerPopup] = useState(false);
  const [hasShownCyberPopup, setHasShownCyberPopup] = useState(false);

  const handleBackToHome = () => {
    setCurrentView(ViewState.LANDING);
    setShowSocialPopup(false); // Ensure popup closes when navigating back
  };

  const handleLoadingComplete = () => {
    setCurrentView(ViewState.LANDING);
  };

  const handleViewSelect = (view: ViewState) => {
    setCurrentView(view);
  };

  // Effect to trigger popup with delay when entering specific views
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (currentView === ViewState.DESIGNER && !hasShownDesignerPopup) {
      timer = setTimeout(() => {
        setShowSocialPopup(true);
        setHasShownDesignerPopup(true);
      }, 2500); // 2.5s delay
    } 
    else if (currentView === ViewState.CYBER && !hasShownCyberPopup) {
      timer = setTimeout(() => {
        setShowSocialPopup(true);
        setHasShownCyberPopup(true);
      }, 2500); // 2.5s delay
    }

    return () => clearTimeout(timer);
  }, [currentView, hasShownDesignerPopup, hasShownCyberPopup]);

  return (
    <div className="w-full min-h-screen">
      {currentView === ViewState.LOADING && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {currentView === ViewState.LANDING && (
        <LandingSelection onSelect={handleViewSelect} />
      )}
      
      {currentView === ViewState.DESIGNER && (
        <DesignerPortfolio onBack={handleBackToHome} />
      )}
      
      {currentView === ViewState.CYBER && (
        <CyberPortfolio onBack={handleBackToHome} />
      )}

      {/* Social Media Popup Overlay */}
      <SocialMediaPopup 
        isOpen={showSocialPopup} 
        onClose={() => setShowSocialPopup(false)} 
        currentView={currentView}
      />
    </div>
  );
}

export default App;
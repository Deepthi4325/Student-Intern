import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ProfileModal } from './components/common/ProfileModal';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingAssessment } from './components/onboarding/OnboardingAssessment';
import { Dashboard } from './components/dashboard/Dashboard';
import { Prephub } from './components/prephub/Prephub';
import { MyPathPlanly } from './components/mypath/MyPathPlanly';
import { Community } from './components/community/Community';
import { MyCourses } from './components/explore/MyCourses';
import { Assignments } from './components/explore/Assignments';
import { Certificates } from './components/explore/Certificates';
import { MyProgress } from './components/explore/MyProgress';
import { OpportunitiesList } from './components/recommendations/OpportunitiesList';
import { MultiFormatTopicViewer } from './components/viewer/MultiFormatTopicViewer';

const AppShell: React.FC = () => {
  const { currentRoute, user } = useApp();

  // Primary Starting Route: Dedicated Login Page
  if (currentRoute === 'login') {
    return <LoginPage />;
  }

  // If user is at landing page, render dedicated full-width landing view
  if (currentRoute === 'landing') {
    return (
      <>
        <LandingPage />
        <AuthModal />
      </>
    );
  }

  // If user is undergoing first-time ability assessment
  if (currentRoute === 'onboarding') {
    return (
      <>
        <OnboardingAssessment />
        <AuthModal />
      </>
    );
  }

  // Main Authenticated Workspace
  return (
    <div className={`min-h-screen flex ${user.theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Collapsible Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Top Header */}
        <Header />

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {currentRoute === 'dashboard' && <Dashboard />}
          {currentRoute === 'prephub' && <Prephub />}
          {currentRoute === 'mypath' && <MyPathPlanly />}
          {currentRoute === 'community' && <Community />}
          {currentRoute === 'courses' && <MyCourses />}
          {currentRoute === 'assignments' && <Assignments />}
          {currentRoute === 'certificates' && <Certificates />}
          {currentRoute === 'progress' && <MyProgress />}
          {currentRoute === 'hackathons' && <OpportunitiesList initialType="hackathon" />}
          {currentRoute === 'internships' && <OpportunitiesList initialType="internship" />}
          {currentRoute === 'jobs' && <OpportunitiesList initialType="job" />}
          {currentRoute === 'topic-viewer' && <MultiFormatTopicViewer />}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <AuthModal />
      <ProfileModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

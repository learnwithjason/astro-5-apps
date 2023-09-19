import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  RedirectToSignIn,
  UserButton,
  UserProfile,
  useUser,
} from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import styles from './dashboard.module.css';

const DashboardHeader = () => {
  return (
    <nav className={styles.header}>
      <a href="/dashboard/account">Account</a>
      <a href="/dashboard/settings">Settings</a>
      <UserButton
        afterSignOutUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: styles.rootBox,
            avatarBox: styles.avatarBox,
          },
        }}
      />
    </nav>
  );
};

const DashboardHome = ({ url }: { url: string }) => {
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <h1>Manage Your Account</h1>
      <p>Welcome back, {user?.firstName}!</p>
    </div>
  );
};

const DashboardAccount = () => {
  return (
    <UserProfile
      appearance={{ elements: { rootBox: { margin: '2rem auto' } } }}
    />
  );
};

const DashboardSettings = () => {
  return (
    <div className={styles.container}>
      <h1>Settings</h1>
      <p>TODO add some settings to set.</p>
    </div>
  );
};

const DashboardRouter = ({ url }: { url: string }) => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <SignedOut>
        <div className={styles.signInBox}>
          <SignIn afterSignInUrl={url} afterSignUpUrl={url} />
        </div>
      </SignedOut>
      <SignedIn>
        <DashboardHeader />
        <Routes>
          <Route path="/dashboard" element={<DashboardHome url={url} />} />
          <Route path="/dashboard/account" element={<DashboardAccount />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
        </Routes>
      </SignedIn>
    </ClerkProvider>
  );
};

export const Dashboard = ({ url }: { url: string }) => {
  return (
    <BrowserRouter>
      <DashboardRouter url={url} />
    </BrowserRouter>
  );
};

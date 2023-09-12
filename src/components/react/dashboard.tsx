import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignOutButton,
  RedirectToSignIn,
  UserButton,
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
            avatarBox: styles.avatarBox,
          },
        }}
      />
    </nav>
  );
};

const DashboardHome = ({ url }: { url: string }) => {
  return (
    <>
      <SignedOut>
        <p>You are logged out!</p>
        <SignIn afterSignInUrl={url} afterSignUpUrl={url} />
      </SignedOut>
      <SignedIn>
        <a href="/dashboard/account">View your account</a>
      </SignedIn>
    </>
  );
};

const DashboardAccount = () => {
  return <h1>Account</h1>;
};

const DashboardSettings = () => {
  return <h1>Settings</h1>;
};

const AppRouter = ({ url }: { url: string }) => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <SignedIn>
        <DashboardHeader />
      </SignedIn>
      <Routes>
        <Route path="/dashboard" element={<DashboardHome url={url} />} />
        <Route
          path="/dashboard/account"
          element={
            <>
              <SignedIn>
                <DashboardAccount />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <>
              <SignedIn>
                <DashboardSettings />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
};

export const Dashboard = ({ url }: { url: string }) => {
  return (
    <BrowserRouter>
      <AppRouter url={url} />
    </BrowserRouter>
  );
};

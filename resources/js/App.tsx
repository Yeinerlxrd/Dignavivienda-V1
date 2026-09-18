import { useState } from 'react';
import { Screen, Property, NOTIFICATIONS, CONVERSATIONS } from './data/mock';

import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';

import Welcome from './screens/Welcome';
import Auth from './screens/Auth';
import Feed from './screens/Feed';
import PropertyDetail from './screens/PropertyDetail';
import Messages from './screens/Messages';
import Favorites from './screens/Favorites';
import Notifications from './screens/Notifications';
import PublishWizard from './screens/PublishWizard';
import VerifyIdentity from './screens/VerifyIdentity';
import PublishSuccess from './screens/PublishSuccess';
import OwnerDashboard from './screens/OwnerDashboard';
import AdminDashboard from './screens/AdminDashboard';
import UserProfile from './screens/UserProfile';
import SecurityCenter from './screens/SecurityCenter';
import Report from './screens/Report';
import Settings from './screens/Settings';

type BackendRole = 'arrendatario' | 'propietario' | 'administrador';

interface BackendUser {
  id: number;
  name: string;
  email: string;
  role: BackendRole;
}

interface BootstrapData {
  screen: Screen;
  user: BackendUser | null;
  errors: string[];
}

declare global {
  interface Window {
    DIGNA_VIVIENDA: BootstrapData;
  }
}

const bootstrap = window.DIGNA_VIVIENDA ?? {
  screen: 'welcome' as Screen,
  user: null,
  errors: [],
};

const roleFromBackend = (role: BackendRole) =>
  role === 'administrador' ? 'admin' : role === 'propietario' ? 'owner' : 'tenant';

const dashboardForRole = (role: BackendRole): Screen =>
  role === 'administrador' ? 'admin-dashboard' : role === 'propietario' ? 'owner-dashboard' : 'feed';

export default function App() {
  const [screen, setScreen] = useState<Screen>(() => {
    if (bootstrap.user) return dashboardForRole(bootstrap.user.role);
    return bootstrap.screen;
  });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = bootstrap.user ? roleFromBackend(bootstrap.user.role) : 'tenant';

  const navigate = (s: Screen, data?: Property) => {
    if (data) setSelectedProperty(data);
    setScreen(s);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const isAuth = ['welcome', 'login', 'register'].includes(screen);
  const unreadNotifs = NOTIFICATIONS.filter(n => !n.read).length;
  const unreadMsgs = CONVERSATIONS.reduce((a, c) => a + c.unread, 0);

  if (isAuth) {
    return (
      <>
        {screen === 'welcome' && <Welcome navigate={navigate} />}
        {screen === 'login' && <Auth navigate={navigate} mode="login" errors={bootstrap.errors} />}
        {screen === 'register' && <Auth navigate={navigate} mode="register" errors={bootstrap.errors} />}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Topbar
        navigate={navigate}
        currentScreen={screen}
        onMenuToggle={() => setSidebarOpen(o => !o)}
        unreadNotifs={unreadNotifs}
        unreadMsgs={unreadMsgs}
      />

      <div className="flex pt-14 min-h-screen">
        <Sidebar
          navigate={navigate}
          currentScreen={screen}
          role={role}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 lg:ml-56 min-w-0">
          <div key={screen}>
            {screen === 'feed' && <Feed navigate={navigate} />}
            {screen === 'property-detail' && <PropertyDetail navigate={navigate} property={selectedProperty} />}
            {screen === 'messages' && <Messages navigate={navigate} />}
            {screen === 'favorites' && <Favorites navigate={navigate} />}
            {screen === 'notifications' && <Notifications navigate={navigate} />}
            {screen === 'publish-wizard' && <PublishWizard navigate={navigate} />}
            {screen === 'verify-identity' && <VerifyIdentity navigate={navigate} />}
            {screen === 'publish-success' && <PublishSuccess navigate={navigate} />}
            {screen === 'owner-dashboard' && <OwnerDashboard navigate={navigate} />}
            {screen === 'admin-dashboard' && <AdminDashboard navigate={navigate} />}
            {screen === 'profile' && <UserProfile navigate={navigate} />}
            {screen === 'edit-profile' && <UserProfile navigate={navigate} />}
            {screen === 'reviews' && <UserProfile navigate={navigate} />}
            {screen === 'security-center' && <SecurityCenter navigate={navigate} />}
            {screen === 'report' && <Report navigate={navigate} />}
            {screen === 'settings' && <Settings navigate={navigate} />}
            {screen === 'requests' && <OwnerDashboard navigate={navigate} />}
          </div>
        </main>
      </div>
    </div>
  );
}

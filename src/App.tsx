import { useState } from 'react';
import { HashRouter, Routes, Route, useParams } from 'react-router-dom';
import { Header, Sidebar, LessonLayout } from './components/layout';
import { Home } from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Theorems from './pages/Theorems';
import InteractiveModules from './pages/InteractiveModules';
import { getSectionById } from './data/curriculum';
import { GamificationProvider } from './contexts/GamificationContext';
import { NostrAuthProvider } from '@shared/contexts/NostrAuthContext';
import { AchievementToastContainer } from './components/gamification/AchievementToast';

// Part I: Groups and Subgroups
import Section00 from './pages/sections/Section00';
import Section01 from './pages/sections/Section01';
import Section02 from './pages/sections/Section02';
import Section03 from './pages/sections/Section03';
import Section04 from './pages/sections/Section04';
import Section05 from './pages/sections/Section05';
import Section06 from './pages/sections/Section06';
import Section07 from './pages/sections/Section07';

// Part II: Structure of Groups
import Section08 from './pages/sections/Section08';
import Section09 from './pages/sections/Section09';
import Section10 from './pages/sections/Section10';
import Section11 from './pages/sections/Section11';

// Part III: Homomorphisms and Factor Groups
import Section12 from './pages/sections/Section12';
import Section13 from './pages/sections/Section13';
import Section14 from './pages/sections/Section14';
import Section15 from './pages/sections/Section15';

// Part IV: Advanced Group Theory
import Section16 from './pages/sections/Section16';
import Section17 from './pages/sections/Section17';
import Section18 from './pages/sections/Section18';
import Section19 from './pages/sections/Section19';
import Section20 from './pages/sections/Section20';
import Section21 from './pages/sections/Section21';

// Part V: Rings and Fields
import Section22 from './pages/sections/Section22';
import Section23 from './pages/sections/Section23';
import Section24 from './pages/sections/Section24';
import Section25 from './pages/sections/Section25';

// Part VI: Constructing Rings and Fields
import Section26 from './pages/sections/Section26';
import Section27 from './pages/sections/Section27';
import Section28 from './pages/sections/Section28';
import Section29 from './pages/sections/Section29';
import Section30 from './pages/sections/Section30';
import Section31 from './pages/sections/Section31';
import Section32 from './pages/sections/Section32';

// Part VII: Commutative Algebra
import Section33 from './pages/sections/Section33';
import Section34 from './pages/sections/Section34';
import Section35 from './pages/sections/Section35';
import Section36 from './pages/sections/Section36';
import Section37 from './pages/sections/Section37';
import Section38 from './pages/sections/Section38';

// Part VIII: Extension Fields
import Section39 from './pages/sections/Section39';
import Section40 from './pages/sections/Section40';
import Section41 from './pages/sections/Section41';
import Section42 from './pages/sections/Section42';

// Part IX: Galois Theory
import Section43 from './pages/sections/Section43';
import Section44 from './pages/sections/Section44';
import Section45 from './pages/sections/Section45';
import Section46 from './pages/sections/Section46';
import Section47 from './pages/sections/Section47';
import Section48 from './pages/sections/Section48';
import Section49 from './pages/sections/Section49';

// Placeholder section component for any future sections
function SectionPage() {
  const { id } = useParams<{ id: string }>();
  const sectionId = parseInt(id || '0', 10);
  const section = getSectionById(sectionId);

  if (!section) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-dark-400">Section not found</p>
      </div>
    );
  }

  return (
    <LessonLayout sectionId={sectionId}>
      <div className="space-y-6">
        <p className="text-lg text-dark-300">
          This section is coming soon. Check back later for interactive content on {section.title}.
        </p>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Topics Covered</h3>
          <p className="text-dark-400">{section.description}</p>
        </div>

        <div className="callout-info">
          <p>
            This is a placeholder page. The full content with interactive visualizations,
            examples, and exercises will be added as the course is developed.
          </p>
        </div>
      </div>
    </LessonLayout>
  );
}

// Placeholder part overview page
function PartPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-gradient">Part Overview</h1>
      <p className="text-dark-400">
        Part overview page for: {slug}
      </p>
    </div>
  );
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-950">
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="pt-16 lg:pl-72">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/theorems" element={<Theorems />} />
          <Route path="/interactive" element={<InteractiveModules />} />

          {/* Part I: Groups and Subgroups */}
          <Route path="/section/0" element={<Section00 />} />
          <Route path="/section/1" element={<Section01 />} />
          <Route path="/section/2" element={<Section02 />} />
          <Route path="/section/3" element={<Section03 />} />
          <Route path="/section/4" element={<Section04 />} />
          <Route path="/section/5" element={<Section05 />} />
          <Route path="/section/6" element={<Section06 />} />
          <Route path="/section/7" element={<Section07 />} />

          {/* Part II: Structure of Groups */}
          <Route path="/section/8" element={<Section08 />} />
          <Route path="/section/9" element={<Section09 />} />
          <Route path="/section/10" element={<Section10 />} />
          <Route path="/section/11" element={<Section11 />} />

          {/* Part III: Homomorphisms and Factor Groups */}
          <Route path="/section/12" element={<Section12 />} />
          <Route path="/section/13" element={<Section13 />} />
          <Route path="/section/14" element={<Section14 />} />
          <Route path="/section/15" element={<Section15 />} />

          {/* Part IV: Advanced Group Theory */}
          <Route path="/section/16" element={<Section16 />} />
          <Route path="/section/17" element={<Section17 />} />
          <Route path="/section/18" element={<Section18 />} />
          <Route path="/section/19" element={<Section19 />} />
          <Route path="/section/20" element={<Section20 />} />
          <Route path="/section/21" element={<Section21 />} />

          {/* Part V: Rings and Fields */}
          <Route path="/section/22" element={<Section22 />} />
          <Route path="/section/23" element={<Section23 />} />
          <Route path="/section/24" element={<Section24 />} />
          <Route path="/section/25" element={<Section25 />} />

          {/* Part VI: Constructing Rings and Fields */}
          <Route path="/section/26" element={<Section26 />} />
          <Route path="/section/27" element={<Section27 />} />
          <Route path="/section/28" element={<Section28 />} />
          <Route path="/section/29" element={<Section29 />} />
          <Route path="/section/30" element={<Section30 />} />
          <Route path="/section/31" element={<Section31 />} />
          <Route path="/section/32" element={<Section32 />} />

          {/* Part VII: Commutative Algebra */}
          <Route path="/section/33" element={<Section33 />} />
          <Route path="/section/34" element={<Section34 />} />
          <Route path="/section/35" element={<Section35 />} />
          <Route path="/section/36" element={<Section36 />} />
          <Route path="/section/37" element={<Section37 />} />
          <Route path="/section/38" element={<Section38 />} />

          {/* Part VIII: Extension Fields */}
          <Route path="/section/39" element={<Section39 />} />
          <Route path="/section/40" element={<Section40 />} />
          <Route path="/section/41" element={<Section41 />} />
          <Route path="/section/42" element={<Section42 />} />

          {/* Part IX: Galois Theory */}
          <Route path="/section/43" element={<Section43 />} />
          <Route path="/section/44" element={<Section44 />} />
          <Route path="/section/45" element={<Section45 />} />
          <Route path="/section/46" element={<Section46 />} />
          <Route path="/section/47" element={<Section47 />} />
          <Route path="/section/48" element={<Section48 />} />
          <Route path="/section/49" element={<Section49 />} />

          {/* Fallback for any missing sections */}
          <Route path="/section/:id" element={<SectionPage />} />
          <Route path="/part/:slug" element={<PartPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <GamificationProvider>
      <NostrAuthProvider>
        <AchievementToastContainer />
        <HashRouter>
          <AppLayout />
        </HashRouter>
      </NostrAuthProvider>
    </GamificationProvider>
  );
}

export default App;

import { useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { Header, Sidebar, LessonLayout } from './components/layout';
import { Home } from './pages/Home';
import { getSectionById } from './data/curriculum';
import Section00 from './pages/sections/Section00';
import Section01 from './pages/sections/Section01';
import Section02 from './pages/sections/Section02';
import Section05 from './pages/sections/Section05';
import Section06 from './pages/sections/Section06';
import Section08 from './pages/sections/Section08';
import Section10 from './pages/sections/Section10';

// Placeholder section component - will be replaced with actual content
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
          <Route path="/section/0" element={<Section00 />} />
          <Route path="/section/1" element={<Section01 />} />
          <Route path="/section/2" element={<Section02 />} />
          <Route path="/section/5" element={<Section05 />} />
          <Route path="/section/6" element={<Section06 />} />
          <Route path="/section/8" element={<Section08 />} />
          <Route path="/section/10" element={<Section10 />} />
          <Route path="/section/:id" element={<SectionPage />} />
          <Route path="/part/:slug" element={<PartPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;

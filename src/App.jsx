import { Layout } from './components/layout/Layout';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Projects } from './components/sections/Projects';
import { Stats } from './components/sections/Stats';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <Layout>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </Layout>
  );
}

export default App;

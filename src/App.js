import './App.css';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import firstImage from '../src/assets/bg1.jpg';
import secondImage from '../src/assets/bg2.jpg';

function App() {
  return (
    <>
      <Header title='This is title' desc='This is Description!' />
      <Layout
        title='This is title'
        desc='This is Description!'
        urlBg={firstImage} />
      <Layout
        title='This is title'
        desc='This is Description!'
        colorBg='#ffae42' />
      <Layout
        title='This is title'
        desc='This is Description!'
        urlBg={secondImage} />
      <Footer />
    </>
  );
}

export default App;

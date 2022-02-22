import Footer from "./sections/Footer";
import Header from "./sections/Header";
import Nav from "./sections/Nav";
import Roadmap from "./sections/Roadmap";
import Team from "./sections/Team";
import FAQ from "./sections/FAQ";
import Pterodactyl from "./assets/images/Pterodactyl.png";
import FlippedPterodactyl from "./assets/images/flipped-pterodactyl.png";
import Imagefollow from "react-image-follow";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Nav />
      <Imagefollow
        className="2xl:w-[350px] 2xl:h-[200px] lg:w-[250px] lg:h-[100px] w-[75px]  h-[100px] md:w-[200px]  md:h-[100px] pt-[75px] pt-[150px] md:absolute inset-y-48 right-10 absolute inset-y-0 right-10"
        src={Pterodactyl}
        alt="Pterodactyl"
      />
      <Imagefollow
        className="2xl:w-[350px] 2xl:h-[200px] g:w-[250px] lg:h-[100px] w-[75px]  h-[100px] md:w-[200px]  md:h-[100px] pt-[75px] pt-[150px] md:absolute inset-y-48 left-10 absolute inset-y-0 right-10"
        src={FlippedPterodactyl}
        alt="Pterodactyl"
      />

      <div className="bg-[url('src/assets/images/cropped-sand-background.jpg')] bg-top bg-no-repeat	bg-cover">
        <Header />
        <Roadmap />
        <FAQ />
        <Team />
        <Footer />
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header> */}
      </div>
    </div>
  );
}

export default App;

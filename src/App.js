import CurrencyConverter from "./components/CurrencyConverter";
import NewsFeed from "./components/NewsFeed";

function App() {
  return (
    <div className="App">
      <h1> Kryptx - Crypto Dashboard</h1>
      <CurrencyConverter />
      <NewsFeed />
    </div>
  );
}

export default App;

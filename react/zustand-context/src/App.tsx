import './App.css'
import { ClickAndIncrement } from './components/ClickAndIncrement'
import { SampleStoreProvider } from './providers/SampleZustandStoreProvider'

function App() {
  console.log("HERE!!");
  return (<SampleStoreProvider initialCount={25}>
    <ClickAndIncrement />
  </SampleStoreProvider>);
}

export default App

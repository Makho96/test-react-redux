import './App.css';
import FormWizard from './components/FormWizard';
function App() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <FormWizard />
    </div>
  );
}

export default App;

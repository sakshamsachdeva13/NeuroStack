import logo from './logo.svg';
import './App.css';
import Login from './pages/Login/login';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      {/* <Login /> */}

       <Layout>
        <Dashboard />
       </Layout>
    </div>
  );
}

export default App;

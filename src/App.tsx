import { AuthenticationContext } from './AuthenticationContext';
import { Routes } from './Routes';

import './styles/global.scss';



function App() {
  return (
    <AuthenticationContext>
      <Routes /> 
    </AuthenticationContext>   
  );
}

export default App;
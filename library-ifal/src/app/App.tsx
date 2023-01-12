import { ToastContainer } from 'react-toastify';

import RouteManager from '../ui/components/RouteManager';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <RouteManager />
      <ToastContainer />
    </div>
  );
}

export default App;

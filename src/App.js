import {
  Routes,
  Route
} from 'react-router-dom';
import {
  useEffect,
  useContext
} from 'react';
import classNames from 'classnames/bind';
import Header from './components/Header'
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import Below from './components/Below'
import RegisterPage from './pages/Register';
import styles from './App.module.scss';
import axios from './util/axios.req';
import {
  AuthContext
} from './components/context/auth.context';
import {
  ToastContainer
} from 'react-toastify';
const cx = classNames.bind(styles)
function App() {
  const {
    setAuth
  } = useContext(AuthContext);
  useEffect(()=> {
    const fetchAccount = async() => {
      const res = await axios.getInfoUser();
      if (res.data && res.data.success) {
        setAuth({
          isAuthenticated: true,
          user: {
            name: res?.data?.user?.name??'',
            username: res?.data?.user?.username??'',
            email: res?.data?.user?.email??'',
            role: res?.data?.user?.role??'',
            image: res?.data?.user?.image??''
          }
        });
      } else{
        localStorage.removeItem('access_token');
      };
    };
    fetchAccount();
  },
    [])
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <div className={cx('bodyRender')}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </div>
      <Below />
    </div>
  );
}

export default App;
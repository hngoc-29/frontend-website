import {
  Routes,
  Route
} from 'react-router-dom';
import {
  useEffect,
  useContext,
  useState,
} from 'react';
import classNames from 'classnames/bind';
import Header from './components/Header'
import HomePage from './pages/Home';
import SettingPage from './pages/Setting';
import LoginPage from './pages/Login';
import Below from './components/Below'
import RegisterPage from './pages/Register';
import styles from './App.module.scss';
import axios from './util/axios.req';
import Spinner from 'react-bootstrap/Spinner';
import {
  AuthContext
} from './components/context/auth.context';
import {
  ToastContainer,
  toast
} from 'react-toastify';
const cx = classNames.bind(styles)
function App() {
  const {
    setAuth
  } = useContext(AuthContext);
  const [loading,
    setLoading] = useState(true);
  const [show,
    setShow] = useState(false);
  useEffect(()=> {
    const fetchAccount = async() => {
      try {
        setLoading(true);
        const res = await axios.getInfoUser();
        if (res.data && res.data.success) {
          setAuth({
            isAuthenticated: true,
            user: {
              id: res?.data?.user?._id??null,
              name: res?.data?.user?.name??'',
              username: res?.data?.user?.username??'',
              email: res?.data?.user?.email??'',
              role: res?.data?.user?.role??'',
              avata: res?.data?.user?.image??''
            }
          });
        }
      } catch(err) {
        localStorage.removeItem('access_token');
        toast.error(err?.response?.data?.message);
      }
      setLoading(false);
    };
    const rfTokenCookie = document.cookie?.split('=')[0];
    if (rfTokenCookie === 'refresh_token') {
      fetchAccount();
    } else {
      localStorage.removeItem('access_token');
      setLoading(false);
    }
  },
    [])

  return (!loading ? (<div className="App" onClick={()=> { if (show)setShow(false)}}>
    <Header show={show} setShow={setShow} />
    <ToastContainer />
    <div className={cx('bodyRender')}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/settings' element={<SettingPage />} />
      </Routes>
    </div>
    <Below />
  </div>
  ): (<div className='loadingStatus'>
      <Spinner animation="grow" variant="warning" />
    </div>
  )
  );
}

export default App;
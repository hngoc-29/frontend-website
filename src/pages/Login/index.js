import classNames from 'classnames/bind';
import {
  useState,
  useRef,
  useEffect,
  useContext
} from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import styles from './Login.module.scss';
import '../../assets/css/spin.scss';
import {
  toast
} from 'react-toastify';
import axios from '../../util/axios.req';
import {
  AuthContext
} from '../../components/context/auth.context';
const cx = classNames.bind(styles);

function Login() {
  const {
    setAuth
  } = useContext(AuthContext);
  const [email,
    setEmail] = useState('');
  const [password,
    setPassword] = useState('');
  const [isLogin,
    setIsLogin] = useState(localStorage.getItem('access_token') || null);
  const [isShowPassword,
    setIsShowPassword] = useState(false);
  const [loading,
    setLoading] = useState(false);
  const btnSubmit = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) navigate('/');
  },
    [isLogin])
  const handleLogin = async(event) => {
    event.preventDefault();
    if (email.length < 6 || password.length < 6) {
      if (email === '' || password === '') {
        toast.error('Vui lòng nhập email và Mật khẩu.');
      } else {
        toast.error('Email hoặc mật khẩu sai.');
      }
    } else {
      try {
        setLoading(true);
        btnSubmit.current.disabled = true;
        const res = await axios.login({
          email,
          password
        })
        if (res.data.success) {
          const access_token = res.data.access_token;
          localStorage.setItem('access_token', access_token);
          setIsLogin(access_token);
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
          })
          navigate('/');
          toast.success('Đăng nhập thành công');
        }
      } catch(err) {
        if(err.response?.data?.message){
        toast.error(err.response?.data?.message)
        } else {
          toast.error('Lỗi không xác định')
        }
      }
      setLoading(false);
      btnSubmit.current.disabled = false;
    }
};

return (
  <div className={cx('login')}>
    <form onSubmit={handleLogin} className={cx('loginForm')}>
      <h2 className={cx('title')}>Đăng nhập</h2>
      <div className={cx('form')}>
        <div className={cx('input')}>
          <input
          placeholder='Nhập email'
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          />
      </div>
      <div className={cx('input')}>
        <input
        type={isShowPassword ? 'text': 'password'}
        value={password}
        placeholder='Nhập mật khẩu'
        onChange={(e) => setPassword(e.target.value.trim())}
        />
      <i
        className={
        isShowPassword
        ? 'fa-solid fa-eye-slash loginIcon': 'fa-solid fa-eye loginIcon'
        }
        onClick={() => setIsShowPassword(!isShowPassword)}
        ></i>
    </div>
    <div className={cx('btn')}>
      <button ref={btnSubmit} className={cx('btnSubmit')}>
        {loading ? <i className="fa-solid fa-spinner"></i>: <span>Đăng nhập</span>}
      </button>
    </div>
    <div className={cx('register')}>
      Bạn chưa có tài khoản?{' '}
      <Link to='/register' className={cx('registerSpan')}>
        Đăng kí
      </Link>
    </div>
  </div>
</form>
</div>
);
}

export default Login;
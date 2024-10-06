import {
  useState,
  useRef
} from 'react';
import styles from '../Login/Login.module.scss';
import classNames from 'classnames/bind';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import {
  toast
} from 'react-toastify';
import '../../assets/css/spin.scss';
import axios from '../../util/axios.req';
const cx = classNames.bind(styles);

function Register() {
  const [username,
    setUsername] = useState('');
  const [email,
    setEmail] = useState('');
  const [password,
    setPassword] = useState('');
  const [loading,
    setLoading] = useState(false);
  const [isShowPassword,
    setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const btnSubmit = useRef();

  const handleRegister = async(e) => {
    e.preventDefault();
    if (username === '' || email === '' || password === '') {
      toast.error('Vui lòng nhập đầy đủ thông tin.');
    } else if (username.length < 6 || password.length < 6) {
      if (username.length < 6 && password.length < 6) {
        toast.error('Username và Password phải >= 6 kí tự');
      } else {
        if (username.length < 6) toast.error('Username phải >= 6 kí tự.');
        if (password.length < 6) toast.error('Password phải >= 6 kí tự.');
      }
    } else {
      setLoading(true);
    btnSubmit.current.disabled = true;
      try {
        const res = await axios.register({
          username,
          email,
          password
        });
        if (res.data?.success) {
          toast.success(res.data?.message)
          navigate('/login');
        }
      } catch(err) {
        if(err?.response?.data?.message){
      toast.error(err?.response?.data?.message)
      } else {
        toast.error('Lỗi không xác định')
      }
      }
      setLoading(false)
      btnSubmit.current.disabled = false;
    };
}
    return (
      <div className={cx('login')}>
        <form onSubmit={handleRegister} className={cx('loginForm')}>
          <h2 className={cx('title')}>Đăng kí</h2>
          <div className={cx('form')}>
            <div className={cx('input')}>
              <input
              placeholder='Nhập username'
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              />
          </div>
          <div className={cx('input')}>
            <input
            placeholder='Nhập email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            />
        </div>
        <div className={cx('input')}>
          <input
          placeholder='Nhập password'
          type={isShowPassword ? 'text': 'password'}
          onChange={(e) => setPassword(e.target.value.trim())}
          value={password}
          />
        <i
          className={isShowPassword ? 'fa-solid fa-eye-slash loginIcon': 'fa-solid fa-eye loginIcon'}
          onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
      </div>
      <div className={cx('btn')}>
        <button className={cx('btnSubmit')} ref={btnSubmit}>
          {loading ? <i className="fa-solid fa-spinner"></i>: <span>Đăng kí</span>}
        </button>
      </div>
      <div className={cx('register')}>
        Bạn đã có tài khoản? <Link className={cx('registerSpan')} to='/login'>Đăng nhập</Link>
      </div>
    </div>
  </form>
</div>
);
}

export default Register;
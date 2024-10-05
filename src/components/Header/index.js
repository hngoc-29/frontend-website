import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import {
  useNavigate
} from 'react-router-dom';
import {
  Button
} from 'react-bootstrap';
import {
  useState,
  useContext,
  useEffect
} from 'react';
import {
  Link
} from 'react-router-dom';
import {
  AuthContext
} from '../context/auth.context';
import {
  toast
} from 'react-toastify';
import axios from '../../util/axios.req';
const cx = classNames.bind(styles);

function Header({show, setShow}) {
  const navigate = useNavigate();
  const {
    auth,
    setAuth
  } = useContext(AuthContext);
  const handleLogout = async() => {
    if (auth.isAuthenticated) {
      const res = await axios.logout(auth?.user?.id);
      if (res.data.success) {
        localStorage.removeItem('access_token');
        setAuth( {
          isAuthenticated: false,
          user: {
            id: null,
            name: '',
            username: '',
            email: '',
            role: '',
            avata: ''
          }
        });
        toast.success(res.data.message)
        return
      }
      toast.error(res.data.message)
    } else {
      toast.error('Bạn chưa đăng nhập');
    }
  };
  return (
    <div className={cx('header')}>
      <header>
        <h2 onClick={() => navigate('/')} className={cx('title')}>HNgoc</h2>
        {!auth.isAuthenticated ? (
          <div className={cx('loginRegister')}>
            <Button onClick={() => navigate('/login')} className={cx('button')} variant="danger">
              Đăng nhập
            </Button>
          </div>
        ): (
          <div className={cx('dropdown')}>
            <img
            onClick={() => setShow(!show)}
            src={auth.user.avata}
            className={cx('avataImage')}
            alt='avata'
            />
          {show && (
            <ul className={cx('listContainer')}>
              <div className={cx('info')}>
                <div className={cx('image')}>
                  <img
                  src={auth.user.avata}
                  width={50}
                  height={50}
                  style={ { borderRadius: '50%' }}
                  />
              </div>
              <div className={cx('infoText')}>
                <h4 className={cx('name')}>{auth.user.name}</h4>
                <p>
                  @{auth.user.username}
                </p>
              </div>
              
            </div>
            <div className={cx('items')}>
              {auth.user.role ? (
                <div className={cx('item')}>
                  <Link to='/admin'>
                    <i className="fa-solid fa-arrow-right"></i> Admin
                  </Link>
                </div>
              ): (<>
                </>
              )}
              <div className={cx('item')}>
                <Link to='/settings'>
                  <i className="fa-solid fa-arrow-right"></i> Cài đặt
                </Link>
              </div>
              <div onClick={handleLogout} className={cx('item')}>
                <Link>
                  <i className="fa-solid fa-arrow-right"></i> Đăng xuất
                </Link>
              </div>
            </div>
          </ul>
        )}
      </div>
    )}
  </header>
</div>
);
}

export default Header;
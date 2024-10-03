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
  useContext
} from 'react';
import {
  Link
} from 'react-router-dom';
import {
  AuthContext
} from '../context/auth.context';

const cx = classNames.bind(styles);

function Header() {
  const [userData,
    setUserData] = useState(null);
  const navigate = useNavigate();
  const {
    auth
  } = useContext(AuthContext);
  console.log(">>> auth", auth)
  const [show,
    setShow] = useState(false);

  const handleLogout = () => {
    // Xử lý đăng xuất mô phỏng
    console.log('Đăng xuất mô phỏng');
    setShow(false);
  };

  return (
    <div className={cx('header')}>
      <header>
        <h2 onClick={() => navigate('/')} className={cx('title')}>HNgoc</h2>
        {!userData ? (
          <div className={cx('loginRegister')}>
            <Button onClick={() => navigate('/login')} className={cx('button')} variant="danger">
              Đăng nhập
            </Button>
          </div>
        ): (
          <div className={cx('dropdown')}>
            <img
            onClick={() => setShow(!show)}
            src={userData.avata}
            className={cx('avataImage')}
            alt='avata'
            />
          {show && (
            <ul className={cx('listContainer')}>
              <div className={cx('info')}>
                <div className={cx('image')}>
                  <img
                  src={userData.avata}
                  width={50}
                  height={50}
                  style={ { borderRadius: '50%' }}
                  />
              </div>
              <div className={cx('infoText')}>
                <h4 className={cx('name')}>{userData.name}</h4>
                <p>
                  @{userData.username}
                </p>
              </div>
            </div>
            <div className={cx('items')}>
              {userData.isAdmin && (
                <div className={cx('item')}>
                  <Link to='/admin'>
                    <i className="fa-solid fa-arrow-right"></i> Admin
                  </Link>
                </div>
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
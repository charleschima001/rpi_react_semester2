import { useState, useRef, FormEvent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Logo } from '../../components/logo/logo';
import { updateUserAction } from '../../store/api-actions';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

function ProfilePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const emailRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      navigate(AppRoute.Login);
    }
  }, [user, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    if (emailRef.current?.value && emailRef.current.value !== user?.email) {
      formData.append('email', emailRef.current.value);
    }
    if (fileRef.current?.files?.[0]) {
      formData.append('avatar', fileRef.current.files[0]);
    }
    
    dispatch(updateUserAction(formData));
    setIsEditing(false);
    setPreviewImage(null);
  };

  const getFullImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `http://localhost:5000${path}`;
  };

  const userInitial = user?.email ? user.email[0].toUpperCase() : 'U';
  const favoriteCount = useAppSelector((state) => 
    state.offers.filter(o => o.isFavorite).length
  );
  if (!user) {
    return null;
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main}>
                <Logo />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/profile" style={{ fontWeight: 'bold', color: '#4481c3' }}>
                    <span>Profile</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Favorites}>
                    <span>Favorites</span>
                    <span className="header__favorite-count" style={{ marginLeft: '5px' }}>
                      {favoriteCount}
                    </span>
                  </Link>
                </li>
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      {user?.avatar ? (
                        <img 
                          src={getFullImageUrl(user.avatar)}
                          alt="User avatar"
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <span style={{
                          display: 'inline-block',
                          width: '20px',
                          height: '20px',
                          backgroundColor: '#4481c3',
                          color: 'white',
                          borderRadius: '50%',
                          textAlign: 'center',
                          lineHeight: '20px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          {userInitial}
                        </span>
                      )}
                    </div>
                    <span className="header__user-name user__name">
                      {user?.email || 'email@example.com'}
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>Profile Settings</h1>
          
          <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', width: '200px' }}>
              <div style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 20px',
                border: '3px solid #4481c3',
                backgroundColor: '#e6e6e6'
              }}>
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : user?.avatar ? (
                  <img 
                    src={getFullImageUrl(user.avatar)} 
                    alt="Profile" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                    color: '#9b9b9b'
                  }}>
                    {userInitial}
                  </div>
                )}
              </div>
              
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#4481c3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Edit Profile
                </button>
              ) : (
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: 'white'
                  }}
                />
              )}
            </div>

            <div style={{ flex: 1, minWidth: '300px' }}>
              {!isEditing ? (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Email</label>
                    <p style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                      {user?.email}
                    </p>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Username</label>
                    <p style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                      {user?.username || 'Not set'}
                    </p>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>User Type</label>
                    <p style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                      {user?.isPro ? 'Pro' : 'Normal'}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Email</label>
                    <input
                      ref={emailRef}
                      type="email"
                      defaultValue={user?.email}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button type="submit" style={{
                      padding: '12px 24px',
                      backgroundColor: '#4481c3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}>
                      Save Changes
                    </button>
                    <button type="button" onClick={() => {
                      setIsEditing(false);
                      setPreviewImage(null);
                    }} style={{
                      padding: '12px 24px',
                      backgroundColor: '#ccc',
                      color: 'black',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { ProfilePage };
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.background = 'blue';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('YOUR_RESET_PASSWORD_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset link');
      }

      alert(`Password reset link sent to ${email}`);
      navigate('/login');
    } catch (error) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="container reset-password">
      <div className="card text-center cardss" style={{ width: "600px" }}>
        <div className="card-header h5 text-dark">
          <p>Please Provide Your Registered Email id to Reset Password</p>
        </div>
        <div className="card-body px-5">
          <form onSubmit={handleSubmit}>
            <div data-mdb-input-init className="form-outline">
              <input
                type="email"
                className="form-control"
                id="resetEmail"
                value={email}
                onChange={handleChange}
                disabled={loading}
              />
              <label className="form-label" htmlFor="typeEmail">Email input</label>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Sending...' : 'Reset Password'}
                </button>
                {error && <p className="text-danger mt-2">{error}</p>}
              </div>
              <div className="col-md-6">
                <a href="/SignUp" className="btn btn-primary w-100">Login/Signup</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

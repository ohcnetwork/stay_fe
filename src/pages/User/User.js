import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

function User(props) {
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (!user) {
      props.history.push('/login');
    }
  }, [user, props.history])

  return (
    <div className="user">
      <h2>Hey {user.username},</h2>
    </div>
  );
}

export default User;
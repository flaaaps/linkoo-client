import React from 'react';

function UserInfo({ user }) {
    return (
        <div>
            {user.identifier && (
                <p>
                    Your name:
                    <br />
                    <strong>{user.name}</strong>
                </p>
            )}
        </div>
    );
}

export default UserInfo;

import React, { useEffect } from "react";
import useUserStore from "../store/userStore";
import UserCard from "./UserCard";
import '../styles/styles.css';


//Component to fetch and display users in a grid layout
function UserList() {
    const { users, loading, error, fetchUsers } = useUserStore();


    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


    if (loading) return <p style={{ textAlign: 'center', color: '#be185d', fontWeight: 'bold' }}>Loading users...</p>;
    if (error) return <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>Error: {error}</p>;


    return (
        <div className="user-grid">
            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
}


export default UserList;
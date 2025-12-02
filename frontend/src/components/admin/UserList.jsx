import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import ConfirmDialog from "../common/ComfirmDialog";
import InfoMessage from "../common/InfoMessage";
import Pagination from "../common/Pagination";
import UserForm from "./UserForm";
import UserRow from "./UserRow";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleStatus,
} from "../../services/userService";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Message state
  const [message, setMessage] = useState(null);

  // Search and pagination states
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(1);

  // Selected items for editing
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  // Dialog states
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);

  const currentUser = { _id: "692eb0578f91661a46457a80" };

  // Filter and paginate users
  const itemsPerPage = 10;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };


  // New user form fields
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "male",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "user",
    status: true,
  });

  useEffect(() => {
    const timer = setTimeout(async () => {
      const data = await getUsers(userSearch);
      setUsers(data);
    }, 400);

    return () => clearTimeout(timer);
  }, [userSearch]);

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.lastName.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const totalUserPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (userPage - 1) * itemsPerPage,
    userPage * itemsPerPage
  );

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleAddUser = () => {
    setShowAddUserForm(!showAddUserForm);
    if (showEditUserForm) setShowEditUserForm(false);
  }

  const handleEditUser = (user) => {
    setSelectedUser({ ...user });
    setShowEditUserForm(true);
  };

  const handleSaveEditedUser = async (updatedUser) => {
    if (updatedUser) {
      const { password, ...safeForm } = updatedUser;  // remove password
      await updateUser(updatedUser._id, safeForm);
      showMessage("User updated successfully");
      setShowEditUserForm(false);
      setSelectedUser(null);
      loadUsers();
    }
  };

  const handleCancelEdit = () => {
    setShowEditUserForm(false);
    setSelectedUser(null);
  };

  const handleCreateUser = async (data) => {
    const newUser = await createUser(data);
    showMessage("User created successfully");
    setShowAddUserForm(false);
    loadUsers();

    // const newUser = {
    //   id: `user-${Date.now()}`,
    //   firstName: newData.firstName,
    //   lastName: newData.lastName,
    //   email: newData.email,
    //   phone: newData.phone,
    //   role: newData.role,
    //   status: newData.status,
    //   createdDate: new Date().toISOString().split('T')[0],
    //   lastLogin: new Date().toISOString().split('T')[0],
    //   ...(newData.role === "doctor" && {
    //     photo: newData.photo,
    //     specialization: newData.specialization,
    //     licenseNumber: newData.licenseNumber,
    //     yearsOfExperience: newData.yearsOfExperience,
    //     education: newData.education,
    //     bio: newData.bio
    //   })
    // };

    // setUsers([newUser, ...users]);
    // showMessage("User created successfully");
    // setShowAddUserForm(false);
    // // Reset form
    // setNewUserData({
    //   firstName: "",
    //   lastName: "",
    //   dateOfBirth: "",
    //   gender: "male",
    //   email: "",
    //   phone: "",
    //   address: "",
    //   password: "",
    //   confirmPassword: "",
    //   role: "user",
    //   status: true,
    //   photo: "",
    //   specialization: "",
    //   licenseNumber: "",
    //   yearsOfExperience: 0,
    //   education: "",
    //   bio: ""
    // });
  };

  const handleCancelAddUser = () => {
    setShowAddUserForm(false);
    // Reset form
    setNewUserData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "male",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      role: "user",
      status: true,
    });
  };

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setResetPasswordDialogOpen(true);
  };

  const handleConfirmResetPassword = () => {
    showMessage("Password reset email sent to " + selectedUser?.email);
    setResetPasswordDialogOpen(false)
    setSelectedUser(null);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setDeleteUserDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete._id);
      // setUsers(users.filter(u => u.id !== userToDelete.id));
      showMessage("User deleted successfully");
      setDeleteUserDialogOpen(false);
      setUserToDelete(null);
      loadUsers();
    }
  };

  const handleToggleUserStatus = async (userId) => {
    // setUsers(users.map(u =>
    //   u.id === userId
    //     ? { ...u, status: !u.status }
    //     : u
    // ));
    await toggleStatus(userId);
    showMessage("User status updated");
    loadUsers();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-2.5">
            <h1 className="text-base font-medium text-[#0A0A0A]">User Management</h1>
            <p className="text-base text-[#717182]">Manage user accounts and permissions</p>
          </div>

          {!showAddUserForm && !showEditUserForm &&
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 px-2.5 py-2 bg-gradient-to-b from-[#1C398E] to-[rgba(110,133,195,0.8)] rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Add New User
            </button>
          }
        </div>

        {message && (
          <InfoMessage
            message={message}
            onClose={() => setMessage(null)}
          />
        )}

        {/* Add User Form */}
        {showAddUserForm && (
          <UserForm
            mode="add"
            onCancel={handleCancelAddUser}
            onSubmit={(data) => {
              console.log("New User:", data);
              setNewUserData(data);
              handleCreateUser(data);
            }}
          />
        )}

        {/* Edit User Form */}
        {showEditUserForm && selectedUser && (
          <UserForm
            mode="edit"
            initialData={selectedUser}
            onCancel={handleCancelEdit}
            onSubmit={(updated) => {
              console.log("Updated User:", updated);
              handleSaveEditedUser(updated);
            }}
          />
        )}

        {/* Search bar - hidden when add user form is open */}
        {!showAddUserForm && !showEditUserForm && (
          <div className="flex items-center gap-2.5 px-4 py-2 bg-[#F3F3F5] rounded-lg">
            <Search className="w-4 h-4 text-[#99A1AF]" />
            <input
              type="text"
              placeholder="Search users..."
              className="flex-1 bg-transparent text-sm text-[#717182] outline-none placeholder:text-[#717182]"
              value={userSearch}
              onChange={(e) => {
                setUserSearch(e.target.value);
                setUserPage(1);
              }}
            />
          </div>
        )}
      </div>

      {/* User list - hidden when add/edit user form is open */}
      {!showAddUserForm && !showEditUserForm && (
        <div className="flex flex-col pt-5">
          {/* Header (desktop only) */}
          <div className="hidden md:flex items-start gap-2.5 px-1.5 py-2 border-b border-black/10 font-medium text-[#0A0A0A]">
            <div className="flex-1 text-sm">Name</div>
            <div className="w-[220px] text-sm">Email</div>
            <div className="w-[75px] text-sm">Role</div>
            <div className="w-[65px] text-sm">Status</div>
            <div className="w-[152px] text-sm">Actions</div>
          </div>

          {/* Body */}
          <div className="flex flex-col">
            {paginatedUsers.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                currentUserId={currentUser?._id}
                onEdit={handleEditUser}
                onResetPassword={handleResetPassword}
                onToggleStatus={handleToggleUserStatus}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={userPage}
            totalPages={totalUserPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredUsers.length}
            onPageChange={setUserPage}
            itemLabel="users"
          />
        </div>
      )}

      {/* Reset Password Dialog */}
      <ConfirmDialog
        show={resetPasswordDialogOpen}
        title="Reset Password"
        message={
          <>Send a password reset email to <strong>{selectedUser?.email}</strong>?</>
        }
        confirmText="Send Reset Email"
        confirmVariant="primary"
        onConfirm={handleConfirmResetPassword}
        onCancel={() => setResetPasswordDialogOpen(false)}
      />

      {/* Delete User Confirmation Dialog */}
      <ConfirmDialog
        show={deleteUserDialogOpen}
        title="Are you sure?"
        message={
          <>
            This will permanently delete the user account for{" "}
            <strong>{userToDelete?.firstName} {userToDelete?.lastName}</strong> (
            {userToDelete?.email}). This action cannot be undone.
          </>
        }
        confirmText="Delete User"
        confirmVariant="danger"
        onConfirm={confirmDeleteUser}
        onCancel={() => setDeleteUserDialogOpen(false)}
      />
    </div>
  );
}

export default UserList;
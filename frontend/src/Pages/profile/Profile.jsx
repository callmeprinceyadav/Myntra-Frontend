import { useState, useContext } from "react";
import { Context } from "../../Contexts/AuthContext";
import "./Profile.css";
import { Modal, message } from "antd";
import Login from "../../Components/Login/Login";
import api from "../../api/axios";

const Profile = () => {
  const { isAuth, user, setUser } = useContext(Context);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
    gender: user?.gender || "",
    shipping: user?.shipping || "",
  });
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  if (!isAuth) {
    return <Login />;
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFormData((prevData) => ({ ...prevData, avatar: fileReader.result }));
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/users/update", formData);
      if (response.status === 200) {
        // Sync with AuthContext
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        message.success("Profile updated successfully!");
        setModal2Open(false);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      message.error("Failed to update profile");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Sidebar Nav */}
        <div className="profile-sidebar">
          <div className="sidebar-header">
            <h4>Account</h4>
            <p style={{ fontSize: "12px", color: "#7e818c" }}>{user?.email || "User"}</p>
          </div>
          <div className="sidebar-nav">
            <span className="nav-item active">Profile Details</span>
            <span className="nav-item">Orders & Returns</span>
            <span className="nav-item">Wishlist</span>
            <span className="nav-item">Addresses</span>
            <span className="nav-item">Coupons</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          <div className="content-header">
            <h3>Profile Details</h3>
            <button
              onClick={() => setModal2Open(true)}
              className="edit-btn"
            >
              Edit
            </button>
          </div>

          <div className="profile-avatar-section">
            <img src={user?.avatar || "https://www.pngkit.com/png/full/281-2812821_user-account-management-logo-user-icon-png.png"} alt="User Profile" />
            <span style={{ fontWeight: "700", color: "#282c3f" }}>{user?.username}</span>
          </div>

          <div className="details-grid">
            <div className="detail-box">
              <p className="detail-label">Full Name</p>
              <p className="detail-value">{user?.username || "--"}</p>
            </div>
            <div className="detail-box">
              <p className="detail-label">Mobile Number</p>
              <p className="detail-value">{user?.phone || "--"}</p>
            </div>
            <div className="detail-box">
              <p className="detail-label">Email ID</p>
              <p className="detail-value">{user?.email || "--"}</p>
            </div>
            <div className="detail-box">
              <p className="detail-label">Gender</p>
              <p className="detail-value" style={{ textTransform: "capitalize" }}>{user?.gender || "--"}</p>
            </div>
            <div className="detail-box" style={{ gridColumn: "span 2" }}>
              <p className="detail-label">Shipping Address</p>
              <p className="detail-value">{user?.shipping || "--"}</p>
            </div>
          </div>
        </div>

        <Modal
          title="Edit Profile"
          open={modal2Open}
          footer={null}
          onCancel={() => setModal2Open(false)}
        >
          <form onSubmit={handleFormSubmit} className="profileForm">
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "12px", color: "#7e818c", display: "block", marginBottom: "5px" }}>Full Name</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "12px", color: "#7e818c", display: "block", marginBottom: "5px" }}>Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                type="tel"
                required
                placeholder="Mobile Number"
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "12px", color: "#7e818c", display: "block", marginBottom: "5px" }}>Shipping Address</label>
              <input
                name="shipping"
                value={formData.shipping}
                onChange={handleFormChange}
                type="text"
                required
                placeholder="Full Address"
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "12px", color: "#7e818c", display: "block", marginBottom: "5px" }}>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleFormChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Others</option>
              </select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", color: "#7e818c", display: "block", marginBottom: "5px" }}>Avatar URL</label>
              <input
                name="avatar"
                value={formData.avatar}
                onChange={handleFormChange}
                type="text"
                placeholder="Paste image URL here"
              />
            </div>

            <div className="modalActions">
              <button
                type="button"
                onClick={() => setModal2Open(false)}
                className="btn-myntra btn-secondary"
                style={{ width: "45%" }}
              >
                Cancel
              </button>
              <button type="submit" className="btn-myntra btn-primary" style={{ width: "45%" }}>
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;

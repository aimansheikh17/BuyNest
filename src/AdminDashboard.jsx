// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import './assets/AdminDashboard.css';
import CustomModal from "./CustomModal";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [response, setResponse] = useState(null);

  const cardData = [
    {
      title: "Add Product",
      description: "Create and manage new product listings with validation",
      team: "Product Management",
      modalType: "addProduct",
    },
    {
      title: "Delete Product",
      description: "Remove products from inventory system",
      team: "Product Management",
      modalType: "deleteProduct",
    },
    {
      title: "Modify User",
      description: "Update user details and manage roles",
      team: "User Management",
      modalType: "modifyUser",
    },
    {
      title: "View User Details",
      description: "Fetch and display details of a specific user",
      team: "User Management",
      modalType: "viewUser",
    },
    {
      title: "Monthly Business",
      description: "View revenue metrics for specific months",
      team: "Analytics",
      modalType: "monthlyBusiness",
    },
    {
      title: "Day Business",
      description: "Track daily revenue and transactions",
      team: "Analytics",
      modalType: "dailyBusiness",
    },
    {
      title: "Yearly Business",
      description: "Analyze annual revenue performance",
      team: "Analytics",
      modalType: "yearlyBusiness",
    },
    {
      title: "Overall Business",
      description: "View total revenue since inception",
      team: "Analytics",
      modalType: "overallBusiness",
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:9090/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        console.log("User successfully logged out");
        navigate("/admin");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleAddProductSubmit = async (productData) => {
    try {
      const response = await fetch("http://localhost:9090/admin/products/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      setResponse({ product: data, imageUrl: productData.imageUrl });
      setModalType("addProduct");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProductSubmit = async ({ productId }) => {
    try {
      const response = await fetch("http://localhost:9090/admin/products/delete", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        setResponse({ message: "Delete Success" });
      } else {
        const errorMessage = await response.text();
        setResponse({ message: `Error: ${errorMessage}` });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleViewUserSubmit = async ({ userId }) => {
    try {
      const response = await fetch("http://localhost:9090/admin/user/getbyid", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        const data = await response.json();
        setResponse({ user: data });
        setModalType("response");
      } else {
        const errorMessage = await response.text();
        setResponse({ message: `Error: ${errorMessage}` });
        setModalType("response");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setResponse({ message: "Error: Something went wrong" });
      setModalType("response");
    }
  };

  const handleModifyUserSubmit = async (data) => {
    if (!data.username) {
      try {
        const response = await fetch("http://localhost:9090/admin/user/getbyid", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: data.userId }),
        });
        if (response.ok) {
          const userDetails = await response.json();
          setResponse({ user: userDetails });
          setModalType("modifyUser");
        } else {
          const error = await response.text();
          setResponse({ message: `Error: ${error}` });
          setModalType("response");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setResponse({ message: "Error: Something went wrong" });
        setModalType("response");
      }
    } else {
      try {
        const response = await fetch("http://localhost:9090/admin/user/modify", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const updatedUser = await response.json();
          setResponse({ user: updatedUser });
          setModalType("response");
        } else {
          const error = await response.text();
          setResponse({ message: `Error: ${error}` });
          setModalType("response");
        }
      } catch (error) {
        console.error("Error updating user details:", error);
        setResponse({ message: "Error: Something went wrong" });
        setModalType("response");
      }
    }
  };

  const handleMonthlyBusiness = async (data) => {
    try {
      const response = await fetch(`http://localhost:9090/admin/business/monthly?month=${data?.month}&year=${data?.year}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setResponse({ monthlyBusiness: data });
        setModalType("monthlyBusiness");
      } else {
        const errorMessage = await response.text();
        setResponse({ message: `Error: ${errorMessage}` });
        setModalType("monthlyBusiness");
      }
    } catch (error) {
      console.error("Error fetching monthly business:", error);
      setResponse({ message: "Error: Something went wrong" });
      setModalType("monthlyBusiness");
    }
  };

  const handleDailyBusiness = async (data) => {
    try {
      const response = await fetch(`http://localhost:9090/admin/business/daily?date=${data?.date}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setResponse({ dailyBusiness: data });
        setModalType("dailyBusiness");
      } else {
        const errorMessage = await response.text();
        setResponse({ message: `Error: ${errorMessage}` });
        setModalType("dailyBusiness");
      }
    } catch (error) {
      console.error("Error fetching daily business:", error);
      setResponse({ message: "Error: Something went wrong" });
      setModalType("dailyBusiness");
    }
  };

  const handleYearlyBusiness = async (data) => {
    try {
      const response = await fetch(`http://localhost:9090/admin/business/yearly?year=${data?.year}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setResponse({ yearlyBusiness: data });
        setModalType("yearlyBusiness");
      } else {
        const errorMessage = await response.text();
        setResponse({ message: `Error: ${errorMessage}` });
        setModalType("yearlyBusiness");
      }
    } catch (error) {
      console.error("Error fetching yearly business:", error);
      setResponse({ message: "Error: Something went wrong" });
      setModalType("yearlyBusiness");
    }
  };

  const handleOverallBusiness = async () => {
    try {
      const response = await fetch(`http://localhost:9090/admin/business/overall`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setResponse({ overallBusiness: data });
        setModalType("overallBusiness");
      } else {
        const errorMessage = await response.text();
        setResponse({ message: `Error: ${errorMessage}` });
        setModalType("overallBusiness");
      }
    } catch (error) {
      console.error("Error fetching overall business:", error);
      setResponse({ message: "Error: Something went wrong" });
      setModalType("overallBusiness");
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="user-info">
          <span className="username">Admin</span>
          <div className="dropdown">
            <button className="dropdown-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        <div className="cards-grid">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="card"
              onClick={() => {
                setModalType(card.modalType);
                setModalData(null);
              }}
            >
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <span className="card-team">Team: {card.team}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal */}
      {modalType && (
        <CustomModal
          modalType={modalType}
          onClose={() => {
            setModalType(null);
            setResponse(null);
          }}
          onSubmit={(data) => {
            switch (modalType) {
              case "addProduct":
                handleAddProductSubmit(data);
                break;
              case "deleteProduct":
                handleDeleteProductSubmit(data);
                break;
              case "viewUser":
                handleViewUserSubmit(data);
                break;
              case "modifyUser":
                handleModifyUserSubmit(data);
                break;
              case "monthlyBusiness":
                handleMonthlyBusiness(data);
                break;
              case "dailyBusiness":
                handleDailyBusiness(data);
                break;
              case "yearlyBusiness":
                handleYearlyBusiness(data);
                break;
              case "overallBusiness":
                handleOverallBusiness();
                break;
              default:
                break;
            }
          }}
          response={response}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

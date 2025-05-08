import React, { useEffect, useState } from "react";
import config from "../../api/config";

const MerchantSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [medicines, setMedicines] = useState({});
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [refillStatus, setRefillStatus] = useState("");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await config.get("/purchase/get/all");
      setSubscribers(res.data || []);
    } catch (err) {
      console.error("Error fetching subscribers:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicines = async (customerId) => {
    if (medicines[customerId]) {
      setSelectedMedicines(medicines[customerId]);
      setOpenDialog(true);
      return;
    }
    try {
      const res = await config.get(`/patientMedicine/patient/${customerId}`);
      setMedicines((prev) => ({ ...prev, [customerId]: res.data }));
      setSelectedMedicines(res.data);
      setOpenDialog(true);
    } catch (err) {
      console.error("Error fetching medicines:", err);
    }
  };

  const handleRefillRequest = async (med) => {
    try {
    //   const body = {
    //     medicineId: med.medicine?._id,
    //     quantity: med.quantity,
    //   };
      const res = await config.post(`/patientMedicine/request/${med.medicine?._id}`);
      setRefillStatus(`Refill request sent for ${med.medicine?.medicine?.name}`);
    } catch (err) {
      setRefillStatus("Error sending refill request.");
      console.error("Refill request failed:", err);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>📋 Subscribed Customers</h2>

      {loading ? (
        <p>Loading...</p>
      ) : subscribers.length === 0 ? (
        <p>No customers have subscribed yet.</p>
      ) : (
        <div style={gridStyle}>
          {subscribers.map((sub, index) => (
            <div key={sub.customerId || index} style={cardStyle}>
              <h3>{sub.patientId?.name}</h3>
              <p><strong>Email:</strong> {sub.patientId?.email}</p>
              <p><strong>Plan:</strong> {sub.planName} ({sub.planId.durationDays} days)</p>
              <p><strong>Price:</strong> ₹{sub.pricePaid}</p>
              <button
                style={viewBtn}
                onClick={() => fetchMedicines(sub.patientId._id)}
              >
                View Medicines
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      {openDialog && (
        <div style={overlayStyle}>
          <div style={dialogStyle}>
            <h3>Medicine Details</h3>
            <button onClick={() => { setOpenDialog(false); setRefillStatus(""); }} style={closeBtnStyle}>✖</button>

            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {selectedMedicines.length === 0 ? (
                <p>No medicines found.</p>
              ) : (
                selectedMedicines.map((med, i) => (
                  <div key={i} style={{ marginBottom: "15px" }}>
                    <p><strong>Name:</strong> {med.medicine?.medicine?.name}</p>
                    <p><strong>Description:</strong> {med.medicine?.medicine?.description}</p>
                    <p><strong>Unit Price:</strong> ₹{med.medicine?.medicine?.price}</p>
                    <p><strong>Ordered Quantity:</strong> {med.quantity}</p>
                    <p><strong>Total Price:</strong> ₹{med.price}</p>
                   

                    <button style={refillBtnStyle} onClick={() => handleRefillRequest(med)}>
                      Send Refill Request
                    </button>

                    <hr />
                  </div>
                ))
              )}
              {refillStatus && <p style={{ color: "green", marginTop: "10px" }}>{refillStatus}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: "200px",
  margin: "40px auto",
  padding: "20px",
  
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "26px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#fff",
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  fontSize:"14px"
};

const viewBtn = {
  marginTop: "10px",
  padding: "8px 12px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const refillBtnStyle = {
  marginTop: "10px",
  padding: "6px 10px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const dialogStyle = {
  backgroundColor: "#fff",
  padding: "25px",
  width: "90%",
  maxWidth: "600px",
  borderRadius: "10px",
  position: "relative",
  fontSize:"12px"
};

const closeBtnStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "none",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
};

export default MerchantSubscribers;

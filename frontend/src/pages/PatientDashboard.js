import { useState } from 'react';
import { appointments } from '../api/mockData';
import './PatientDashboard.css'; // We'll create this for styling
import DoctorDashboardChat from '../components/DoctorDashboardChat';

export default function PatientDashboard() {
  const [myAppointments] = useState(appointments);
  const [activeMenu, setActiveMenu] = useState('Appointments');

  // Sidebar menu items
  const menuItems = [
    // { label: 'Dashboard' }, // Not implemented, so not selectable
    { label: 'Appointments' },
    { label: 'Medical History' },
    { label: 'Prescriptions' },
    { label: 'Billing' },
    { label: 'Profile' },
    { label: 'Chat' },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Patient Menu</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.label}
              className={activeMenu === item.label ? 'active' : ''}
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveMenu(item.label)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Navbar */}
        <header className="navbar">
          <h1>Patient Dashboard</h1>
          <div className="user-info">
            <span>Welcome, John Doe</span>
          </div>
        </header>

        {/* Main Section */}
        {activeMenu === 'Appointments' && (
          <section className="appointments-section">
            <h2>Your Appointments</h2>
            <div className="appointments-grid">
              {myAppointments.map((app) => (
                <div key={app.id} className="appointment-card">
                  <p><strong>Doctor:</strong> {app.doctor}</p>
                  <p><strong>Date:</strong> {app.date}</p>
                  <p><strong>Status:</strong> {app.status}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {activeMenu === 'Medical History' && (
          <div className="section-container">
            <section className="medical-history-section">
              <h2>Medical History</h2>
              <div className="medical-history-cards">
                {[
                  {
                    date: '2023-09-10',
                    description: 'Annual Physical Exam - All results normal.',
                  },
                  {
                    date: '2022-12-05',
                    description: 'Diagnosed with Mild Hypertension.',
                  },
                  {
                    date: '2022-07-18',
                    description: 'Treated for Seasonal Allergies.',
                  },
                  {
                    date: '2021-03-22',
                    description: 'Blood Test - Slightly elevated cholesterol.',
                  },
                  {
                    date: '2020-10-11',
                    description: 'Flu Vaccination.',
                  },
                ].map((item, idx) => (
                  <div key={item.date} className="medical-history-card">
                    <span className="history-date-badge">{item.date}</span>
                    <span className="history-description">{item.description}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
        {activeMenu === 'Prescriptions' && (
          <div className="section-container">
            <section className="prescriptions-section">
              <h2>Prescriptions</h2>
              <div className="prescriptions-cards">
                <div className="prescription-card">
                  <div className="prescription-header">
                    <span className="medication-name">Lisinopril</span>
                    <span className="status-badge active">Active</span>
                  </div>
                  <div className="prescription-details">
                    <p><strong>Dosage:</strong> 10mg, 1 tablet daily</p>
                    <p><strong>Prescribed By:</strong> Dr. Smith</p>
                    <p><strong>Date:</strong> 2022-12-10</p>
                  </div>
                </div>
                <div className="prescription-card">
                  <div className="prescription-header">
                    <span className="medication-name">Loratadine</span>
                    <span className="status-badge active">Active</span>
                  </div>
                  <div className="prescription-details">
                    <p><strong>Dosage:</strong> 10mg, as needed</p>
                    <p><strong>Prescribed By:</strong> Dr. Lee</p>
                    <p><strong>Date:</strong> 2022-07-20</p>
                  </div>
                </div>
                <div className="prescription-card">
                  <div className="prescription-header">
                    <span className="medication-name">Atorvastatin</span>
                    <span className="status-badge inactive">Inactive</span>
                  </div>
                  <div className="prescription-details">
                    <p><strong>Dosage:</strong> 20mg, 1 tablet daily</p>
                    <p><strong>Prescribed By:</strong> Dr. Smith</p>
                    <p><strong>Date:</strong> 2021-04-01</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
        {activeMenu === 'Billing' && (
          <section className="billing-section">
            <h2>Billing</h2>
            <table className="billing-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>INV-1001</td>
                  <td>2023-09-12</td>
                  <td>Annual Physical Exam</td>
                  <td>$120.00</td>
                  <td>Paid</td>
                </tr>
                <tr>
                  <td>INV-0987</td>
                  <td>2022-12-06</td>
                  <td>Hypertension Consultation</td>
                  <td>$90.00</td>
                  <td>Paid</td>
                </tr>
                <tr>
                  <td>INV-0944</td>
                  <td>2021-03-23</td>
                  <td>Blood Test</td>
                  <td>$60.00</td>
                  <td>Unpaid</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}
        {activeMenu === 'Profile' && (
          <section className="profile-section">
            <h2>Profile</h2>
            <div className="profile-details">
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Date of Birth:</strong> 1985-06-15</p>
              <p><strong>Email:</strong> johndoe@email.com</p>
              <p><strong>Phone:</strong> (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Main St, Springfield, USA</p>
              <p><strong>Insurance:</strong> HealthPlus Gold Plan (ID: HP1234567)</p>
              <p><strong>Emergency Contact:</strong> Jane Doe, (555) 987-6543</p>
            </div>
          </section>
        )}
        {activeMenu === 'Chat' && (
          <section className="chat-section">
            <h2>Chat with Dr. Smith</h2>
            {/* Real-time Socket.io-enabled chat */}
            <DoctorDashboardChat sender="Patient" recipient="Dr. Smith" />
          </section>
        )}
      </main>
    </div>
  );
}
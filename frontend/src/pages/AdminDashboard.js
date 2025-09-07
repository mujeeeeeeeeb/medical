import React, { useState } from 'react';
import { appointments, patients } from '../api/mockData';
import './AdminDashboard.css';

// Example doctors data
const doctors = [
  { id: 1, name: 'Dr. Alice Smith', specialization: 'Cardiology', available: true },
  { id: 2, name: 'Dr. Bob Johnson', specialization: 'Dermatology', available: false },
  { id: 3, name: 'Dr. Carol Lee', specialization: 'Pediatrics', available: true },
];

// Example billing data
const invoices = [
  { id: 101, patient: 'John Doe', amount: '$300', date: '2024-06-01', status: 'Paid' },
  { id: 102, patient: 'Jane Smith', amount: '$175', date: '2024-06-03', status: 'Pending' },
  { id: 103, patient: 'Sam Brown', amount: '$250', date: '2024-06-05', status: 'Overdue' },
];

const menuItems = [
  'Dashboard',
  'Patients',
  'Doctors',
  'Appointments',
  'Billing',
  'Reports',
];

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  // Example summary data for dashboard cards
  const totalPatients = patients.length;
  const totalAppointments = appointments.length;
  const totalDoctors = doctors.length;
  const totalRevenue = '$725'; // Example static revenue

  // Simulated patient medical history summary for demo
  function getMedicalHistorySummary(p) {
    return p.history ? p.history : 'No major issues';
  }

  // Appointments approve/cancel UI handlers (UI only)
  const [appointmentStatus, setAppointmentStatus] = useState(
    appointments.reduce((acc, app) => ({ ...acc, [app.id]: app.status }), {})
  );
  function handleStatusChange(id, status) {
    setAppointmentStatus((prev) => ({ ...prev, [id]: status }));
  }

  // Render functions for each section
  function renderDashboard() {
    return (
      <section className="section">
        <h2>Overview</h2>
        <div className="cards-grid">
          <div className="card summary-card">
            <h3>Total Patients</h3>
            <p>{totalPatients}</p>
          </div>
          <div className="card summary-card">
            <h3>Appointments</h3>
            <p>{totalAppointments}</p>
          </div>
          <div className="card summary-card">
            <h3>Doctors</h3>
            <p>{totalDoctors}</p>
          </div>
          <div className="card summary-card">
            <h3>Revenue</h3>
            <p>{totalRevenue}</p>
          </div>
        </div>
      </section>
    );
  }

  function renderPatients() {
    return (
      <section className="section">
        <h2>Patients</h2>
        <div className="cards-grid">
          {patients.map((p) => (
            <div key={p.id} className="card patient-card">
              <p><strong>Name:</strong> {p.name}</p>
              <p><strong>Age:</strong> {p.age}</p>
              <p><strong>Contact:</strong> {p.phone || 'N/A'}</p>
              <p><strong>Last Visit:</strong> {p.lastVisit}</p>
              <p><strong>History:</strong> {getMedicalHistorySummary(p)}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function renderDoctors() {
    return (
      <section className="section">
        <h2>Doctors</h2>
        <div className="cards-grid">
          {doctors.map((doc) => (
            <div key={doc.id} className="card doctor-card">
              <p><strong>Name:</strong> {doc.name}</p>
              <p><strong>Specialization:</strong> {doc.specialization}</p>
              <p>
                <strong>Availability:</strong>{' '}
                <span className={doc.available ? 'status available' : 'status unavailable'}>
                  {doc.available ? 'Available' : 'Unavailable'}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function renderAppointments() {
    return (
      <section className="section">
        <h2>Appointments</h2>
        <div className="cards-grid">
          {appointments.map((app) => (
            <div key={app.id} className="card appointment-card">
              <p><strong>Patient:</strong> {app.patient}</p>
              <p><strong>Doctor:</strong> {app.doctor}</p>
              <p><strong>Date:</strong> {app.date}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`status ${appointmentStatus[app.id]}`}>{appointmentStatus[app.id]}</span>
              </p>
              <div className="appointment-actions">
                {appointmentStatus[app.id] !== 'Approved' && (
                  <button onClick={() => handleStatusChange(app.id, 'Approved')}>Approve</button>
                )}
                {appointmentStatus[app.id] !== 'Cancelled' && (
                  <button onClick={() => handleStatusChange(app.id, 'Cancelled')}>Cancel</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function renderBilling() {
    return (
      <section className="section">
        <h2>Billing</h2>
        <div className="cards-grid">
          {invoices.map((inv) => (
            <div key={inv.id} className="card invoice-card">
              <p><strong>Invoice #:</strong> {inv.id}</p>
              <p><strong>Patient:</strong> {inv.patient}</p>
              <p><strong>Amount:</strong> {inv.amount}</p>
              <p><strong>Date:</strong> {inv.date}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`status ${inv.status.toLowerCase()}`}>{inv.status}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function renderReports() {
    return (
      <section className="section">
        <h2>Reports &amp; Analytics</h2>
        <div className="cards-grid">
          <div className="card report-card">
            <h3>Patients per Month</h3>
            <div className="chart-placeholder">[Bar Chart Placeholder]</div>
          </div>
          <div className="card report-card">
            <h3>Revenue Trend</h3>
            <div className="chart-placeholder">[Line Chart Placeholder]</div>
          </div>
          <div className="card report-card">
            <h3>Appointments by Status</h3>
            <div className="chart-placeholder">[Pie Chart Placeholder]</div>
          </div>
        </div>
      </section>
    );
  }

  function renderContent() {
    switch (activeMenu) {
      case 'Dashboard':
        return renderDashboard();
      case 'Patients':
        return renderPatients();
      case 'Doctors':
        return renderDoctors();
      case 'Appointments':
        return renderAppointments();
      case 'Billing':
        return renderBilling();
      case 'Reports':
        return renderReports();
      default:
        return null;
    }
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Menu</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item}
              className={activeMenu === item ? 'active' : ''}
              onClick={() => setActiveMenu(item)}
              style={{ cursor: 'pointer' }}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Navbar */}
        <header className="navbar">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>Welcome, Admin</span>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}
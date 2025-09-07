import { useState } from 'react';
import { appointments } from '../api/mockData';
import DoctorDashboardChat from '../components/DoctorDashboardChat';
import './DoctorDashboard.css';

// Mock prescriptions data
const prescriptions = [
  { id: 1, patient: "John Doe", medicine: "Paracetamol", dosage: "500mg", date: "2025-09-01" },
  { id: 2, patient: "Jane Roe", medicine: "Ibuprofen", dosage: "200mg", date: "2025-09-02" },
];

export default function DoctorDashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        const totalAppointments = appointments.length;
        const upcomingAppointments = appointments.filter(a => a.status === "booked").length;
        const completedAppointments = appointments.filter(a => a.status === "completed").length;

        return (
          <section className="section">
            <h2>Dashboard Overview</h2>
            <div className="overview-cards">
              <div className="overview-card">
                <h3>Total Appointments</h3>
                <p>{totalAppointments}</p>
              </div>
              <div className="overview-card">
                <h3>Upcoming Appointments</h3>
                <p>{upcomingAppointments}</p>
              </div>
              <div className="overview-card">
                <h3>Completed Appointments</h3>
                <p>{completedAppointments}</p>
              </div>
              <div className="overview-card">
                <h3>Prescriptions Issued</h3>
                <p>{prescriptions.length}</p>
              </div>
            </div>
            <p className="overview-text">
              Welcome, Dr. Smith! Here’s a quick summary of your schedule and prescriptions. You can navigate
              using the menu to manage patients, appointments, prescriptions, and reports.
            </p>
          </section>
        );

      case 'My Patients':
        return (
          <section className="section">
            <h2>My Patients</h2>
            <ul className="patient-list">
              {appointments.map((app) => (
                <li key={app.id}>{app.patient} - <span className={`status ${app.status}`}>{app.status}</span></li>
              ))}
            </ul>
          </section>
        );

      case 'Appointments':
        return (
          <section className="section">
            <h2>Your Appointments</h2>
            <div className="cards-grid">
              {appointments.map((app) => (
                <div key={app.id} className="card appointment-card">
                  <p><strong>Patient:</strong> {app.patient}</p>
                  <p><strong>Date:</strong> {app.date}</p>
                  <p><strong>Status:</strong> <span className={`status ${app.status}`}>{app.status}</span></p>
                </div>
              ))}
            </div>
          </section>
        );

      case 'Prescriptions':
        return (
          <section className="section">
            <h2>Prescriptions</h2>
            <div className="cards-grid">
              {prescriptions.map((p) => (
                <div key={p.id} className="card prescription-card">
                  <p><strong>Patient:</strong> {p.patient}</p>
                  <p><strong>Medicine:</strong> {p.medicine}</p>
                  <p><strong>Dosage:</strong> {p.dosage}</p>
                  <p><strong>Date:</strong> {p.date}</p>
                </div>
              ))}
            </div>
          </section>
        );

      case 'Reports':
        // Sample reports data
        const reports = [
          {
            id: 1,
            patient: "John Doe",
            type: "Blood Test",
            date: "2025-09-05",
            summary: "Normal CBC values.",
          },
          {
            id: 2,
            patient: "Jane Roe",
            type: "X-Ray",
            date: "2025-09-07",
            summary: "No fractures detected.",
          },
          {
            id: 3,
            patient: "Alice Johnson",
            type: "MRI",
            date: "2025-09-10",
            summary: "Mild disc bulge at L4-L5.",
          },
        ];
        return (
          <section className="section">
            <h2>Reports</h2>
            <div className="cards-grid">
              {reports.map((report) => (
                <div key={report.id} className="card report-card">
                  <p><strong>Patient:</strong> {report.patient}</p>
                  <p><strong>Report Type:</strong> {report.type}</p>
                  <p><strong>Date:</strong> {report.date}</p>
                  <p><strong>Summary:</strong> {report.summary}</p>
                  <button className="view-report-btn">View Report</button>
                </div>
              ))}
            </div>
          </section>
        );

      case 'Chat':
        // Use real-time Socket.io-enabled DoctorDashboardChat component.
        // Pass sender and recipient as props.
        return <DoctorDashboardChat sender="Dr. Smith" recipient="Patient" />;

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Doctor Menu</h2>
        <ul>
          {['Dashboard', 'My Patients', 'Appointments', 'Prescriptions', 'Reports', 'Chat'].map((menu) => (
            <li
              key={menu}
              className={activeMenu === menu ? 'active' : ''}
              onClick={() => setActiveMenu(menu)}
            >
              {menu}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="navbar">
          <h1>Doctor Dashboard</h1>
          <div className="user-info">
            <span>Welcome, Dr. Smith</span>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}
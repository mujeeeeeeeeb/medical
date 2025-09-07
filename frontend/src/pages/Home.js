import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const carouselItems = [
  {
    title: 'State-of-the-Art Facilities',
    description: 'Our clinic is equipped with the latest medical technology to provide the best care.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // modern clinic interior
  },
  {
    title: 'Experienced Staff',
    description: 'Our team of professionals is dedicated to your health and well-being.',
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=800&q=80', // medical staff
  },
  {
    title: 'Comprehensive Care',
    description: 'We offer a wide range of services to meet all your medical needs.',
    image: 'https://images.unsplash.com/photo-1519494080410-f9aa8cfb3e9b?auto=format&fit=crop&w=800&q=80', // healthcare concept
  },
];

const doctors = [
  {
    name: 'Dr. Jane Smith',
    specialization: 'Cardiologist',
    photo: 'https://images.unsplash.com/photo-1517363898873-fafc2070293c?auto=format&fit=crop&w=300&q=80', // female doctor
    education: 'MD, Harvard Medical School',
    experience: '12 years',
    qualifications: 'Board Certified in Cardiology',
  },
  {
    name: 'Dr. John Doe',
    specialization: 'Pediatrician',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80', // male doctor
    education: 'MD, Johns Hopkins University',
    experience: '8 years',
    qualifications: 'Board Certified in Pediatrics',
  },
  {
    name: 'Dr. Emily Johnson',
    specialization: 'Dermatologist',
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=300&q=80', // female doctor
    education: 'MD, Stanford University',
    experience: '10 years',
    qualifications: 'Board Certified in Dermatology',
  },
  {
    name: 'Dr. Michael Lee',
    specialization: 'Orthopedic Surgeon',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80', // male doctor
    education: 'MD, University of California, San Francisco',
    experience: '15 years',
    qualifications: 'Board Certified in Orthopedic Surgery',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
  };

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demonstration, just alert the form data
    alert(`Message sent!\nName: ${contactForm.name}\nEmail: ${contactForm.email}\nMessage: ${contactForm.message}`);
    setContactForm({ name: '', email: '', message: '' });
  };

  // Common style for buttons and clickable elements with hover effects
  const interactiveStyle = {
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const buttonStyle = {
    marginRight: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#0056b3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    ...interactiveStyle,
  };

  const buttonHoverStyle = {
    backgroundColor: '#004494',
    transform: 'scale(1.05)',
    textDecoration: 'underline',
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '2rem',
    color: '#007bff',
    background: 'transparent',
    border: 'none',
    ...interactiveStyle,
  };

  const [loginHover, setLoginHover] = useState(false);
  const [signupHover, setSignupHover] = useState(false);
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);

  // Track which doctor card is hovered
  const [hoveredDoctorIndex, setHoveredDoctorIndex] = useState(null);

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#ffffff',
        color: '#333',
        minHeight: '100vh',
      }}
    >
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#007bff', padding: '1rem 2rem', borderRadius: '8px' }}>
        <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>Medical Dashboard</div>
        <div>
          <button
            onClick={() => navigate('/login')}
            style={{ ...buttonStyle, ...(loginHover ? buttonHoverStyle : {}) }}
            onMouseEnter={() => setLoginHover(true)}
            onMouseLeave={() => setLoginHover(false)}
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            style={{ ...buttonStyle, marginRight: 0, ...(signupHover ? buttonHoverStyle : {}) }}
            onMouseEnter={() => setSignupHover(true)}
            onMouseLeave={() => setSignupHover(false)}
          >
            Signup
          </button>
        </div>
      </nav>

      <header style={{ marginBottom: '2rem', backgroundColor: 'rgba(255,255,255,0.8)', padding: '1rem', borderRadius: '8px' }}>
        <h1>Welcome to Medical Dashboard</h1>
        <p>Your all-in-one solution for managing appointments, patients, prescriptions, and billing.</p>
      </header>

      {/* Clinic Features Carousel with hover effect */}
      <section
        aria-label="Clinic Features Carousel"
        style={{
          position: 'relative',
          marginBottom: '3rem',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '8px',
          padding: '1rem',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          transition: 'transform 0.3s, box-shadow 0.3s',
          boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.025)';
          e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.08)';
        }}
      >
        <h2>Our Clinic Features</h2>
        <div>
          <img
            src={carouselItems[currentIndex].image}
            alt={carouselItems[currentIndex].title}
            style={{ width: '100%', borderRadius: '8px', maxHeight: '300px', objectFit: 'cover', transition: 'transform 0.3s' }}
          />
          <h3>{carouselItems[currentIndex].title}</h3>
          <p>{carouselItems[currentIndex].description}</p>
        </div>
        <button
          onClick={prevSlide}
          aria-label="Previous Feature"
          style={{ ...arrowStyle, left: '1rem', ...(prevHover ? { color: '#004494', transform: 'translateY(-50%) scale(1.1)', textDecoration: 'underline' } : {}) }}
          onMouseEnter={() => setPrevHover(true)}
          onMouseLeave={() => setPrevHover(false)}
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Feature"
          style={{ ...arrowStyle, right: '1rem', ...(nextHover ? { color: '#004494', transform: 'translateY(-50%) scale(1.1)', textDecoration: 'underline' } : {}) }}
          onMouseEnter={() => setNextHover(true)}
          onMouseLeave={() => setNextHover(false)}
        >
          ›
        </button>
      </section>

      <section
        aria-label="Doctors List"
        style={{
          marginBottom: '3rem',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '8px',
          padding: '1rem',
        }}
      >
        <h2>Meet Our Doctors</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {doctors.map((doctor, index) => {
            const isHovered = hoveredDoctorIndex === index;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredDoctorIndex(index)}
                onMouseLeave={() => setHoveredDoctorIndex(null)}
                style={{
                  flex: '1 0 200px',
                  maxWidth: '200px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  padding: '1rem',
                  textAlign: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  position: 'relative',
                  cursor: 'pointer',
                  zIndex: isHovered ? 10 : 1,
                }}
              >
                <img
                  src={doctor.photo}
                  alt={`Portrait of ${doctor.name}`}
                  style={{ width: '100%', borderRadius: '50%', marginBottom: '1rem' }}
                />
                <h3 style={{ margin: '0.5rem 0' }}>{doctor.name}</h3>
                <p style={{ margin: 0, fontStyle: 'italic', color: '#555' }}>{doctor.specialization}</p>
                {isHovered && (
                  <div
                    style={{
                      marginTop: '0.75rem',
                      fontSize: '0.9rem',
                      color: '#333',
                      backgroundColor: '#e6f0ff',
                      borderRadius: '6px',
                      padding: '0.5rem',
                      textAlign: 'left',
                    }}
                  >
                    <p><strong>Education:</strong> {doctor.education}</p>
                    <p><strong>Experience:</strong> {doctor.experience}</p>
                    <p><strong>Qualifications:</strong> {doctor.qualifications}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Appointments, Patient Management, Prescriptions, Billing - with hover effects */}
      <section style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px', padding: '1rem' }}>
        {[
          { title: 'Appointments', desc: 'Schedule and manage your appointments efficiently.' },
          { title: 'Patient Management', desc: 'Keep track of patient information and history.' },
          { title: 'Prescriptions', desc: 'Manage and track prescriptions seamlessly.' },
          { title: 'Billing', desc: 'Handle billing and payments with ease.' }
        ].map((item, idx) => (
          <div
            key={item.title}
            style={{
              flex: 1,
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 2px 5px rgba(0,0,0,0.07)',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.13)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.07)';
            }}
          >
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* New Sections Start */}

      {/* Achievements section with hover effect */}
      <section
        aria-label="Achievements"
        style={{
          marginTop: '3rem',
          marginBottom: '3rem',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '8px',
          padding: '1rem',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          transition: 'transform 0.3s, box-shadow 0.3s',
          boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.015)';
          e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.13)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.08)';
        }}
      >
        <h2>Our Achievements</h2>
        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>🏆 Awarded "Best Healthcare Provider 2023"</li>
          <li style={{ marginBottom: '0.5rem' }}>🎖️ Recognized for outstanding patient care</li>
          <li style={{ marginBottom: '0.5rem' }}>📅 Over 10,000 successful treatments</li>
          <li style={{ marginBottom: '0.5rem' }}>🌟 Accredited by National Health Association</li>
        </ul>
      </section>

      {/* Certifications section with card hover effects */}
      <section
        aria-label="Certifications"
        style={{
          marginBottom: '3rem',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '8px',
          padding: '1rem',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
        }}
      >
        <h2>Certifications</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          {[
            { title: 'ISO 9001', desc: 'Quality Management System' },
            { title: 'HIPAA Compliance', desc: 'Patient Data Protection' },
            { title: 'Board Certified Doctors', desc: 'Specialized Medical Expertise' },
            { title: 'JCI Accredited', desc: 'International Healthcare Standards' }
          ].map((cert, idx) => (
            <div
              key={cert.title}
              style={{
                flex: '1 0 200px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                padding: '1rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.07)';
                e.currentTarget.style.boxShadow = '0 6px 22px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
              }}
            >
              <h3>{cert.title}</h3>
              <p>{cert.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact section with card hover effect */}
      <section
        aria-label="Contact Information and Form"
        style={{
          marginBottom: '3rem',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '8px',
          padding: '1rem',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
          transition: 'transform 0.3s, box-shadow 0.3s',
          boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.012)';
          e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.08)';
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Contact Us</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          <div
            style={{
              flex: '1 1 300px',
              minWidth: '280px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 5px rgba(0,0,0,0.09)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.13)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.09)';
            }}
          >
            <h3>Our Address</h3>
            <p>123 Health St.<br />Wellness City, HC 45678</p>
            <h3>Phone</h3>
            <p>(123) 456-7890</p>
            <h3>Email</h3>
            <p>contact@medicaldashboard.com</p>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{
              flex: '1 1 400px',
              minWidth: '280px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 5px rgba(0,0,0,0.09)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.13)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.09)';
            }}
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={contactForm.name}
              onChange={handleInputChange}
              required
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactForm.email}
              onChange={handleInputChange}
              required
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={contactForm.message}
              onChange={handleInputChange}
              required
              rows="4"
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
            />

            <button
              type="submit"
              style={{
                marginTop: '0.5rem',
                padding: '0.75rem',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0056b3';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#007bff';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* New Sections End */}
    </div>
  );
};

export default Home;

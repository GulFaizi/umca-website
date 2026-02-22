import React from 'react';
import Button from '../components/Button';
import './About.scss';
import {
    FaUsers, FaEye, FaBullseye, FaBookReader, FaBalanceScale,
    FaHandHoldingHeart, FaHandshake, FaStar, FaBookOpen, FaShieldAlt,
    FaGlobe, FaSitemap, FaBuilding, FaUserTie, FaBriefcase, FaUserCircle,
    FaMapMarkerAlt
} from 'react-icons/fa';
import aboutUsLogo from '../assets/aboutUsLogo.png';

const About = () => {
    return (
        <div className="about-page">
            {/* 0.Logo Section */}
            <div className="about-hero">
                <img src={aboutUsLogo} alt="UMCA About Us" className="about-hero-img" />
            </div>

            <div className="container about-container">
                {/* 1. Who We Are */}
                <div className="about-section">
                    <div className="section-title-wrapper">
                        <FaUsers className="section-icon" />
                        <h2 className="section-title">Who We Are</h2>
                    </div>
                    <p className="about-text mb-20">
                        The United Muslim Community of America (UMCA) is a faith-based, nonprofit organization organized exclusively for religious, educational, charitable, and social purposes within the meaning of Section 501(c)(3) of the Internal Revenue Code. Established in 2025, UMCA seeks the pleasure of Allah (SWT) by serving humanity with compassion, dignity, justice, and excellence.
                    </p>
                    <p className="about-text mb-40">
                        Guided by the Qur'an and Sunnah, UMCA is committed to collective decision-making, transparency, accountability, and service to the broader society. We serve all people regardless of faith, ethnicity, or background, with a special focus on our neighborhood across America.
                    </p>
                    <Button to="/programs" variant="primary">Explore Our Services</Button>
                </div>

                {/* 2. Our Vision */}
                <div className="about-section mt-large">
                    <FaEye className="section-icon no-margin" />
                    <h2 className="section-title mb-20">Our Vision</h2>
                    <p className="about-text">
                        To seek the pleasure of Allah (SWT) by building compassionate, just, and resilient communities—rooted in Islamic values and committed to the well-being of humanity.
                    </p>
                </div>

                {/* 3. Our Mission */}
                <div className="about-section mt-large">
                    <FaBullseye className="section-icon no-margin" />
                    <h2 className="section-title mb-10">Our Mission</h2>

                    <div className="mission-list">
                        <div className="mission-item">
                            <div className="mission-icon-circle">
                                <FaBookReader />
                            </div>
                            <span className="mission-text-span">Promote Islamic education, moral development, and spiritual growth</span>
                        </div>
                        <div className="mission-item">
                            <div className="mission-icon-circle">
                                <FaUsers />
                            </div>
                            <span className="mission-text-span">Strengthen families and communities through support, empowerment, and service</span>
                        </div>
                        <div className="mission-item">
                            <div className="mission-icon-circle">
                                <FaBalanceScale />
                            </div>
                            <span className="mission-text-span">Advance social justice, civil liberties, and human dignity</span>
                        </div>
                        <div className="mission-item">
                            <div className="mission-icon-circle">
                                <FaHandHoldingHeart />
                            </div>
                            <span className="mission-text-span">Provide humanitarian relief and charitable services locally and globally</span>
                        </div>
                        <div className="mission-item">
                            <div className="mission-icon-circle">
                                <FaHandshake />
                            </div>
                            <span className="mission-text-span">Foster unity within the Ummah and cooperation with broader society</span>
                        </div>
                    </div>
                </div>

                {/* 4. Our Core Values */}
                <div className="about-section mt-large">
                    <FaStar className="section-icon no-margin" />
                    <h2 className="section-title mb-10">Our Core Values</h2>
                    <p className="about-text mb-40">The principles that guide our work and community</p>

                    <div className="core-values-grid">
                        {[
                            { title: 'Faith & Guidance', desc: "The Qur'an and Sunnah as our foundation", icon: FaBookOpen },
                            { title: 'Collective Leadership', desc: 'Consultation (Shura) and shared responsibility', icon: FaUsers },
                            { title: 'Integrity', desc: 'Transparency, accountability, and ethical conduct', icon: FaShieldAlt },
                            { title: 'Justice & Compassion', desc: 'Standing with the vulnerable and oppressed', icon: FaBalanceScale },
                            { title: 'Service Excellence', desc: 'Professional, culturally responsive, and impact-driven work', icon: FaStar },
                            { title: 'Community Outreach', desc: 'Building bridges through interfaith dialogue and engagement', icon: FaGlobe },
                        ].map((val, idx) => (
                            <div key={idx} className="value-card">
                                <div className="value-icon">
                                    <val.icon />
                                </div>
                                <h3 className="value-title">{val.title}</h3>
                                <p className="value-desc">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. Our Governance Structure */}
                <div className="about-section mt-large">
                    <FaSitemap className="section-icon no-margin" />
                    <h2 className="section-title mb-10">Our Governance Structure</h2>
                    <p className="about-text max-w-600 mb-40">UMCA is governed by a structured leadership system ensuring accountability and transparency</p>

                    <div className="governance-grid">
                        {[
                            { title: 'Board of Trustees', desc: 'The highest governing authority with full fiduciary, strategic, and oversight powers.', icon: FaBuilding },
                            { title: 'Council of Directors', desc: 'Serves as the local Board of Directors for U.S. nonprofit law and regulatory compliance.', icon: FaUserTie },
                            { title: 'Central Executive Council', desc: 'The policy-making body that advises the President and formulates working procedures.', icon: FaBriefcase },
                            { title: 'Officers', desc: 'President (Board Chair), Vice Presidents, General Secretary, and Treasurer.', icon: FaUserCircle },
                            { title: 'General Assembly', desc: 'The highest representative and consultative body of UMCA.', icon: FaUsers },
                            { title: 'Regional Organizations', desc: 'UMCA operates in Northeast, South, Mid-West, and West regions.', icon: FaMapMarkerAlt },
                        ].map((gov, idx) => (
                            <div key={idx} className="gov-card">
                                <div className="gov-icon">
                                    <gov.icon />
                                </div>
                                <h3 className="gov-title">{gov.title}</h3>
                                <p className="gov-desc">{gov.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <hr className="divider" />

                {/* 6. Our Commitment to Inclusion */}
                <div className="about-section">
                    <div className="section-title-wrapper">
                        <FaHandHoldingHeart className="section-icon" />
                        <h2 className="section-title">Our Commitment to Inclusion</h2>
                    </div>
                    <p className="about-text max-w-800">
                        UMCA shall not discriminate on the basis of race, color, ethnicity, national origin, gender, age, disability, or any other characteristic protected by law in its programs, services, or activities. Our religious principles are implemented in a manner consistent with the laws of the United States, and we do not restrict access to our charitable services based on faith, ethnicity, or belief.
                    </p>
                </div>

                {/* 7. UMCA at a Glance */}
                <div className="about-section">
                    <h2 className="section-title mb-10">UMCA at a Glance</h2>

                    <div className="glance-grid">
                        <div className="glance-card">
                            <h3 className="glance-stat">2025</h3>
                            <p className="glance-desc">Established</p>
                        </div>
                        <div className="glance-card">
                            <FaUsers className="glance-stat svg-icon" />
                            <p className="glance-desc">Community Members</p>
                        </div>
                        <div className="glance-card">
                            <FaHandHoldingHeart className="glance-stat svg-icon" />
                            <p className="glance-desc">Annual Services</p>
                        </div>
                        <div className="glance-card">
                            <FaBuilding className="glance-stat svg-icon" />
                            <p className="glance-desc">Facility Partners</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* 8. Join Our Community (Edge to edge background) */}
            <div className="join-community">
                <FaHandHoldingHeart className="join-icon" />
                <h2 className="section-title mb-10">Join Our Community</h2>
                <p className="about-text max-w-600 mb-30">
                    Whether you're looking for spiritual guidance, educational programs, or community support, UMCA welcomes you with open arms.
                </p>
                <Button to="/contact" variant="primary">Get In Touch</Button>
            </div>
        </div>
    );
};

export default About;

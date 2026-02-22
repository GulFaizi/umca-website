import React from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import './Home.scss';
import emergencyReliefImg from '../assets/emergency-relief.jpg';
import orphanSponsorshipImg from '../assets/orphan-sponsorship.jpg';
import cleanWaterImg from '../assets/clean-water.png';
import educationImg from '../assets/education.jpg';
import healthcareImg from '../assets/healthcare.png';
import foodSecurityImg from '../assets/food-security.jpg';

// Mock Data
const serviceAreas = [
    {
        id: 1,
        title: 'Community Support & Care Management',
        description: 'Comprehensive support and resources for individuals and families in need, including case assistance, guidance referrals, and ongoing support programs.',
        image: orphanSponsorshipImg,
        link: '/programs'
    },
    {
        id: 2,
        title: 'Education, Training & Youth Development',
        description: 'Empowering youth and adults through Islamic and secular education programs, vocational training, leadership development, and mentorship opportunities.',
        image: educationImg,
        link: '/programs'
    },
    {
        id: 3,
        title: 'Humanitarian Relief & Emergency Assistance',
        description: 'Responding to crises and providing aid to those facing hardships through food assistance, emergency funds, disaster relief, and community support.',
        image: emergencyReliefImg,
        link: '/emergency'
    },
    {
        id: 4,
        title: 'Health, Wellness & Social Services',
        description: 'Promoting wellbeing through healthcare initiatives, mental health support, wellness programs, and social support services for all community members.',
        image: healthcareImg,
        link: '/programs'
    },
    {
        id: 5,
        title: 'Interfaith Dialogue & Civic Engagement',
        description: 'Fostering understanding and cooperation between different faith communities through dialogue programs, community events, and civic participation initiatives.',
        image: cleanWaterImg,
        link: '/programs'
    },
    {
        id: 6,
        title: 'Advocacy for Fairness & Civil Rights',
        description: 'Standing up for justice, fairness, and the rights of all people through advocacy, education, and community empowerment initiatives.',
        image: foodSecurityImg,
        link: '/programs'
    }
];

const Home = () => {
    return (
        <>
            <Hero />

            <section className="section">
                <div className="container">
                    <div className="mission-wrapper">
                        <h2>Our Mission</h2>
                        <p className="mission-text">
                            To seek the pleasure of Allah (SWT) by serving humanity with compassion, dignity, justice, and excellence, guided by the Qur'an and Sunnah, collective decision-making, transparency, accountability, and service to the broader society.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section bg-light">
                <div className="container">
                    <h2 className="text-center mb-lg">Our Impact</h2>
                    <div className="impact-grid">
                        <div className="impact-item">
                            <h3>10K+</h3>
                            <p>Families Assisted</p>
                        </div>
                        <div className="impact-item">
                            <h3>50+</h3>
                            <p>Water Wells Built</p>
                        </div>
                        <div className="impact-item">
                            <h3>500+</h3>
                            <p>Orphans Sponsored</p>
                        </div>
                        <div className="impact-item">
                            <h3>15</h3>
                            <p>Countries Served</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="text-center mb-lg">
                        <h2 className="mb-sm">Our Service Areas</h2>
                        <p className="text-light-color">UMCA advances its mission through specialized initiatives in six key areas:</p>
                    </div>
                    <div className="grid">
                        {serviceAreas.map(program => (
                            <Card
                                key={program.id}
                                title={program.title}
                                description={program.description}
                                image={program.image}
                                link={program.link}
                                buttonText={false}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;

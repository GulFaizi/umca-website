import React from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import './Home.scss';
import serviceAreas from '../data/programs';

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

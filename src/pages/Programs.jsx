import React from 'react';
import Card from '../components/Card';
import './Programs.scss';
import {
    FaHandHoldingHeart,
    FaFemale,
    FaUsers,
    FaGraduationCap,
    FaUserMd,
    FaCalendarAlt,
    FaBullhorn,
    FaBookReader
} from 'react-icons/fa';
import emergencyReliefImg from '../assets/emergency-relief.jpg';
import orphanSponsorshipImg from '../assets/orphan-sponsorship.jpg';
import cleanWaterImg from '../assets/clean-water.png';
import educationImg from '../assets/education.jpg';
import healthcareImg from '../assets/healthcare.png';
import foodSecurityImg from '../assets/food-security.jpg';

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

const umcaEntities = [
    {
        id: 1,
        title: 'UMCA Relief',
        description: 'Humanitarian relief and emergency assistance programs locally and globally.',
        icon: FaHandHoldingHeart
    },
    {
        id: 2,
        title: 'UMCA Sisters',
        description: 'Programs and initiatives specifically for women in our community.',
        icon: FaFemale
    },
    {
        id: 3,
        title: 'UMCA Youth',
        description: 'Youth development, leadership, and engagement programs.',
        icon: FaUsers
    },
    {
        id: 4,
        title: 'UMCA ASRA',
        description: 'Applied Social Research Association for evidence-based programs.',
        icon: FaGraduationCap
    },
    {
        id: 5,
        title: 'UMCA Physicians',
        description: 'United Muslim Physicians of America - health and wellness initiatives.',
        icon: FaUserMd
    },
    {
        id: 6,
        title: 'UMCA Conventions',
        description: 'Community conventions and large-scale gatherings.',
        icon: FaCalendarAlt
    },
    {
        id: 7,
        title: 'UMCA Advocacy',
        description: 'Advocacy initiatives for fairness and civil rights.',
        icon: FaBullhorn
    },
    {
        id: 8,
        title: 'UMCA Scholars',
        description: 'Scholarship programs and Islamic knowledge initiatives.',
        icon: FaBookReader
    }
];

const Programs = () => {
    return (
        <div className="container programs-page">
            {/* Service Areas Section */}
            <div className="text-center mb-lg">
                <h1 className="mb-sm">Our Service Areas</h1>
                <p className="text-light-color">UMCA advances its mission through specialized initiatives aligned with our objectives:</p>
            </div>
            <div className="programs-grid">
                {serviceAreas.map(program => (
                    <Card
                        key={program.id}
                        title={program.title}
                        description={program.description}
                        image={program.image}
                        link={program.link}
                        buttonText={null}
                    />
                ))}
            </div>

            {/* UMCA Entities Section */}
            <div className="text-center mb-lg">
                <h2 className="mb-sm">UMCA Entities</h2>
                <p className="text-light-color">UMCA establishes the following entities to carry out its mission</p>
            </div>

            <div className="entities-grid">
                {umcaEntities.map(entity => (
                    <div key={entity.id} className="entity-card">
                        <div className="entity-icon-wrapper">
                            <entity.icon className="entity-icon" />
                        </div>
                        <div>
                            <h3 className="entity-title">{entity.title}</h3>
                            <p className="entity-desc">{entity.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Programs;

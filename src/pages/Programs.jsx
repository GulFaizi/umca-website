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
import serviceAreas from '../data/programs';

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

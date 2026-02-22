import React from 'react';
import './OurTeam.scss';

import habibullah_ziar from '../assets/team/habbibullah_ziar.jpg';
import img2 from '../assets/team/member2.jpg';
import img3 from '../assets/team/member3.jpg';
import img4 from '../assets/team/member4.jpg';
import img5 from '../assets/team/member5.jpg';
import img6 from '../assets/team/member6.jpg';
import img7 from '../assets/team/member7.jpg';

const OurTeam = () => {
    // Dummy data for team members
    const teamData = {
        top: [
            { id: 1, name: 'Habibullah Ziar', position: 'President', photo: habibullah_ziar, desc: 'Leading the UMCA vision and ensuring community engagement.' }
        ],
        row1: [
            { id: 2, name: 'Sahil', position: 'Vice President', photo: img2, desc: 'Overseeing daily operations and guiding our projects.' },
            { id: 3, name: 'Tariq Mansoor', position: 'Secretary', photo: img3, desc: 'Managing communications and administrative workflows.' }
        ],
        row2: [
            { id: 4, name: 'Jalal', position: 'Treasurer', photo: img4, desc: 'Managing finances and ensuring sustainable growth.' },
            { id: 5, name: 'Bilal Ahmed', position: 'Operations Director', photo: img5, desc: 'Coordinating events and operational logistics.' }
        ],
        row3: [
            { id: 6, name: 'Hassan Ali', position: 'Community Lead', photo: img6, desc: 'Building relationships and engaging our core members.' },
            { id: 7, name: 'Hatif', position: 'Marketing Head', photo: img7, desc: 'Promoting our message and expanding our reach.' }
        ]
    };

    const renderCard = (member) => (
        <div key={member.id} className="team-card">
            <div className="team-card-inner">
                {/* Front of Card */}
                <div className="team-card-front">
                    <div className="team-image-wrapper">
                        <img src={member.photo} alt={member.name} />
                    </div>
                    <h3>{member.name}</h3>
                    <p>{member.position}</p>
                </div>
                {/* Back of Card */}
                <div className="team-card-back">
                    <h3>{member.name}</h3>
                    <p className="team-back-position">{member.position}</p>
                    <div className="team-divider"></div>
                    <p className="team-desc">{member.desc}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="team-page">
            <div className={`container team-header`}>
                <h1>Meet Our Team</h1>
                <p>The dedicated individuals working tirelessly to serve and uplift the UMCA community.</p>
            </div>

            <div className="team-grid">
                {/* Tier 1: Single Member (Top) */}
                <div className="team-tier-one">
                    {teamData.top.map(renderCard)}
                </div>

                {/* Tier 2: Two Members */}
                <div className="team-tier-two">
                    {teamData.row1.map(renderCard)}
                </div>

                {/* Tier 3: Two Members */}
                <div className="team-tier-two">
                    {teamData.row2.map(renderCard)}
                </div>

                {/* Tier 4: Two Members */}
                <div className="team-tier-two">
                    {teamData.row3.map(renderCard)}
                </div>
            </div>
        </div>
    );
};

export default OurTeam;

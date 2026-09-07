import React from 'react';
import './OurTeam.scss';

import habibullah_ziar from '../assets/team/habbibullah_ziar.jpg';
import Naimatyar from '../assets/team/Naimatyar.png';
import Shafiq from '../assets/team/Shafiq.png';
import Mumtaz from '../assets/team/Mumtaz.jpeg';
import sahil from '../assets/team/sahil.png';
import Najib from '../assets/team/Najib.png';
import anas from '../assets/team/anas.png';
import zakir from '../assets/team/zakir.png';

const OurTeam = () => {
    // Dummy data for team members
    const teamData = {
        top: [
            { id: 1, name: 'Habibullah Ziar', position: 'President', photo: habibullah_ziar, desc: 'Leading the UMCA vision and ensuring community engagement.' }
        ],
        row1: [
            { id: 2, name: 'Niamat Rasool Niamatyar', position: 'Vice President for Tarbiyya', photo: Naimatyar, desc: 'Overseeing daily operations and guiding our projects.' },
            { id: 3, name: 'Mohammad Shafiq Qureshi', position: 'General Secretary', photo: Shafiq, desc: 'Managing communications and administrative workflows.' }
        ],
        row2: [
            { id: 4, name: 'Fazal Wahab Mumtaz', position: 'Director of Outreach', photo: Mumtaz, desc: 'Managing finances and ensuring sustainable growth.' },
            { id: 5, name: 'Rohullah Sahil', position: 'Board Member', photo: sahil, desc: 'Coordinating events and operational logistics.' }
        ],
        row3: [
            { id: 6, name: 'Najibullah Shukoor', position: 'Director of North East Region', photo: Najib, desc: 'Building relationships and engaging our core members.' },
            { id: 7, name: 'Anas Safi', position: 'COO, UMCA Relief', photo: anas, desc: 'Building relationships and engaging our core members.' }
        ],
        row4: [
            { id: 8, name: 'Zakirullah  Safi', position: 'CEO, UMCA Relief', photo: zakir, desc: 'Promoting our message and expanding our reach.' }
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

                {/* Tier 5: Single Member (Bottom) */}
                <div className="team-tier-one">
                    {teamData.row4.map(renderCard)}
                </div>
            </div>
        </div>
    );
};

export default OurTeam;

import React from 'react';
import './OurTeam.scss';

import habibullah_ziar from '../assets/team/habbibullah_ziar.jpg';
import Naimatyar from '../assets/team/Naimatyar.png';
import Shafiq from '../assets/team/Shafiq.png';
import Mumtaz from '../assets/team/Mumtaz.jpeg';
import sahil from '../assets/team/sahil.png';
import Najib from '../assets/team/Najib.png';
import zakir from '../assets/team/zakir.png';
import anas from '../assets/team/anas.png';

const OurTeam = () => {
    const teamData = {
        top: [
            {
                id: 1,
                name: 'Habibullah Ziar',
                position: 'President',
                photo: habibullah_ziar,
                desc: 'Provides strategic leadership, oversees organizational affairs, and guides UMCA in advancing its mission and vision.'
            }
        ],
        row1: [
            {
                id: 2,
                name: 'Niamat Rasool Niamatyar',
                position: 'Vice President',
                photo: Naimatyar,
                desc: 'Supports the President, coordinates organizational priorities, and helps advance UMCA’s mission and programs.'
            },
            {
                id: 3,
                name: 'Mohammad Shafiq Quraishi',
                position: 'General Secretary',
                photo: Shafiq,
                desc: 'Oversees administration, maintains organizational records, and coordinates official communications and meetings.'
            }
        ],
        row2: [
            {
                id: 4,
                name: 'Fazal Wahab Mumtaz',
                position: 'Director of Outreach',
                photo: Mumtaz,
                desc: 'Builds community connections, leads outreach initiatives, and strengthens UMCA’s engagement with stakeholders and partners.'
            },
            {
                id: 5,
                name: 'Rohullah Sahil',
                position: 'Director of Tarbiyya & Capacity Building',
                photo: sahil,
                desc: 'Leads Tarbiyya and capacity development programs, fosters personal and spiritual development, and strengthens members’ knowledge and character.'
            }
        ],
        row3: [
            {
                id: 6,
                name: 'Najibullah Shukoor',
                position: 'Director of Northeast Region',
                photo: Najib,
                desc: 'Leads regional activities, strengthens community engagement, and supports the growth of UMCA across the Northeast Region.'
            }
        ],
        row4: [
            {
                id: 7,
                name: 'Zakirullah Safi',
                position: 'CEO, UMCA Relief',
                photo: zakir,
                desc: 'Leads UMCA Relief’s mission and strategy, oversees humanitarian initiatives, builds strategic partnerships, mobilizes resources, and guides organizational growth and impact.'
            },
            {
                id: 8,
                name: 'Anas Safi',
                position: 'COO, UMCA Relief',
                photo: anas,
                desc: 'Oversees UMCA Relief’s day-to-day operations, ensuring effective program delivery, coordination, and organizational efficiency.'
            }
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
            <div className="container team-header">
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

                {/* Tier 4: Single Member */}
                <div className="team-tier-one">
                    {teamData.row3.map(renderCard)}
                </div>

                {/* Tier 5: Two Members (Bottom) */}
                <div className="team-tier-two">
                    {teamData.row4.map(renderCard)}
                </div>
            </div>
        </div>
    );
};

export default OurTeam;

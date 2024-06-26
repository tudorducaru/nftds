import React from 'react';
import './projectListItem.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import website_link_img from '../../assets/website_link.png';
import discord_link_img from '../../assets/discord_link.png';
import twitter_link_img from '../../assets/twitter_link.png';
import verified_img from '../../assets/verified.png';
import notification from '../../assets/notification.png';
import { format, parseISO } from 'date-fns';

const ProjectListItem = props => {

    const project = props.project;

    return (
        <Row className='project-list-item align-items-center'>

            {/* Logo */}
            <Col className='col-auto project-logo'>
                <div className='logo-container' onClick={() => window.open(project.invite_url)}>
                    {
                        project.logo_url ?
                            <img src={project.logo_url}></img> :
                            <div></div>
                    }
                </div>
            </Col>

            {/* Name */}
            <Col className='project-name d-flex align-items-center' onClick={() => window.open(project.invite_url)}>
                <p>{project.name}</p>
            </Col>

            {/* Member Count */}
            <Col className='col-auto member-count'>
                <p>{project.discord_members ? project.discord_members.toLocaleString().replace(',', '.') : '-'}</p>
            </Col>

            {/* Online Member Count */}
            <Col className='col-auto online-member-count'>
                <p>{project.discord_online_members ? project.discord_online_members.toLocaleString().replace(',', '.') : '-'}</p>
            </Col>

            {/* Twitter Followers Count */}
            <Col className='col-auto twitter-followers-count'>
                <p>{project.twitter_followers ? project.twitter_followers.toLocaleString().replace(',', '.') : '-'}</p>
            </Col>

            {/* Links */}
            <Col className='col-auto links'>
                <Row className='flex-nowrap'>
                    <Col className='col-auto gx-3'>
                        <img
                            className='link-img'
                            src={website_link_img}
                            onClick={() => window.open(project.website_link)}
                        ></img>
                    </Col>
                    <Col className='col-auto gx-3'>
                        <img
                            className='link-img'
                            src={discord_link_img}
                            onClick={() => window.open(project.invite_url)}
                        ></img>
                    </Col>
                    <Col className='col-auto gx-3'>
                        <img
                            className='link-img'
                            src={twitter_link_img}
                            onClick={() => window.open(project.twitter_link)}
                        ></img>
                    </Col>
                </Row>
            </Col>

            {/* Verified */}
            <Col className='col-auto verified-container d-flex justify-content-center'>
                {
                    project.fakemeter ?
                        <Row className='flex-nowrap'>
                            <Col className='pe-0 col-auto'>
                                <img className='verified-img' src={verified_img}></img>
                            </Col>
                            <Col className='ps-1'>
                                <p>Verified</p>
                            </Col>
                        </Row> : <p>Not verified</p>
                }
            </Col>

            {/* Mint date */}
            <Col className='col-auto mint-date'>
                <p>{project.mint_date ? format(parseISO(project.mint_date), 'dd MMM yyyy') : 'TBA'}</p>
            </Col>

            {/* Mint price */}
            <Col className='col-auto mint-price'>
                <p>{project.mint_amount && project.mint_currency ? `${project.mint_amount} ${project.mint_currency}` : 'TBA'}</p>
            </Col>

            {/* Mint reminder */}
            <Col className='col-auto mint-reminder d-flex justify-content-center'>
                <img src={notification} onClick={props.handleReminderModalOpen}></img>
            </Col>

        </Row>
    )
}

export default ProjectListItem
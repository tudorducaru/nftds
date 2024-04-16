import React from 'react';
import './projectListItemMobile.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import verified_img from '../../assets/verified.png';
import { format, parseISO } from 'date-fns';
import website_link_img from '../../assets/website_link.png';
import discord_link_img from '../../assets/discord_link.png';
import twitter_link_img from '../../assets/twitter_link.png';
import users_icon from '../../assets/users.png';
import users_online_icon from '../../assets/users_online.png';
import twitter_coloured from '../../assets/twitter_coloured.png';

const ProjectListItemMobile = props => {

    const project = props.project;

    return (
        <Row className='project-list-item-mobile align-items-center justify-content-center py-4'>
            <Col className='col-auto'>
                <Row className='align-items-center'>

                    {/* Logo */}
                    <Col className='col-auto'>
                        <div className='logo-container-mobile' onClick={() => window.open(project.invite_url)}>
                            {
                                project.logo_url ?
                                    <img src={project.logo_url}></img> :
                                    <div></div>
                            }
                        </div>
                    </Col>

                    <Col className='ps-0'>
                        <Row className='mb-2'>

                            {/* Project Name */}
                            <Col className='col-auto project-name-mobile' onClick={() => window.open(project.invite_url)}>
                                <p>{project.name}</p>
                            </Col>

                            {/* Fakemeter */}
                            <Col className='col-auto gx-0'>
                                {
                                    project.fakemeter ? <img className='verified-img' src={verified_img}></img> : null
                                }
                            </Col>
                        </Row>
                        <Row className='mb-2'>

                            {/* Member count */}
                            <Col className='col-auto pe-0 d-flex align-items-center'>
                                <img className='stats-icon' src={users_icon}></img>
                                <p>{project.discord_members ? project.discord_members.toLocaleString().replace(',', '.') : '-'}</p>
                            </Col>

                            {/* Online member count */}
                            <Col className='col-auto pe-0 d-flex align-items-center online-member-count-mobile'>
                                <img className='stats-icon' src={users_online_icon}></img>
                                <p>{project.discord_online_members ? project.discord_online_members.toLocaleString().replace(',', '.') : '-'}</p>
                            </Col>

                            {/* Twitter followers count */}
                            <Col className='col-auto d-flex align-items-center twitter-followers-count-mobile'>
                                <img className='stats-icon' src={twitter_coloured}></img>
                                <p>{project.twitter_followers ? project.twitter_followers.toLocaleString().replace(',', '.') : '-'}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='col-auto'>
                                {/* Mint date */}
                                <p>{project.mint_date ? format(parseISO(project.mint_date), 'dd MMM yyyy') : 'TBA'}</p>
                            </Col>

                            {/* Divider */}
                            <Col className='col-auto divider g-0'>
                                <div></div>
                            </Col>

                            {/* Mint price */}
                            <Col className='col-auto'>
                                <p>{project.mint_amount && project.mint_currency ? `${project.mint_amount} ${project.mint_currency}` : 'TBA'}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='align-items-center justify-content-center'>
                    {/* Links */}
                    <Col className='col-auto gy-3'>
                        <img
                            className='link-img-mobile'
                            src={website_link_img}
                            onClick={() => window.open(project.website_link)}
                        ></img>
                    </Col>
                    <Col className='col-auto gy-3'>
                        <img
                            className='link-img-mobile'
                            src={twitter_link_img}
                            onClick={() => window.open(project.twitter_link)}
                        ></img>
                    </Col>
                    <Col className='col-auto gy-3'>
                        <img
                            className='link-img-mobile'
                            src={discord_link_img}
                            onClick={() => window.open(project.invite_url)}
                        ></img>
                    </Col>

                    {/* Mint reminder */}
                    <Col className='mint-reminder-mobile col-auto gy-3 ms-2'>
                        <p onClick={props.handleReminderModalOpen}>Set mint date reminder</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

export default ProjectListItemMobile;
import React from 'react';
import './projectListItemMobile.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import verified_img from '../../verified.png';
import { format, parseISO } from 'date-fns';
import website_link_img from '../../website_link.png';
import discord_link_img from '../../discord_link.png';
import twitter_link_img from '../../twitter_link.png';
import notification from '../../notification.png';

const ProjectListItemMobile = props => {

    const project = props.project;

    return (
        <Row className='project-list-item-mobile align-items-center justify-content-center py-4'>
            <Col className='col-auto'>
                <Row className='align-items-center'>

                    {/* Logo */}
                    <Col className='col-auto'>
                        <a href={project.invite_url}>
                            <div className='logo-container-mobile'>
                                {
                                    project.logo_url ?
                                        <img src={project.logo_url}></img> :
                                        <div></div>
                                }
                            </div>
                        </a>
                    </Col>

                    <Col>
                        <Row className='mb-2'>

                            {/* Project Name */}
                            <Col className='col-auto project-name-mobile'>
                                <a href={project.invite_url}>
                                    <p>{project.name}</p>
                                </a>
                            </Col>

                            {/* Fakemeter */}
                            <Col className='col-auto gx-0'>
                                {
                                    project.fakemeter && <img className='verified-img' src={verified_img}></img>
                                }
                            </Col>
                        </Row>
                        <Row className='mb-2'>

                            {/* Member count */}
                            <Col className='col-auto'>
                                <p>{project.member_count.toLocaleString().replace(',', '.')}</p>
                            </Col>

                            {/* Online member count */}
                            <Col className='col-auto online-member-count-mobile'>
                                <p>{project.online_count.toLocaleString().replace(',', '.')}</p>
                            </Col>

                            {/* Twitter followers count */}
                            <Col className='col-auto twitter-followers-count-mobile'>
                                <p>{project.twitter_followers_count.toLocaleString().replace(',', '.')}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='col-auto'>
                                {/* Mint date */}
                                <p>{format(parseISO(project.mint_date), 'dd MMM yyyy')}</p>
                            </Col>

                            {/* Divider */}
                            <Col className='col-auto divider g-0'>
                                <div></div>
                            </Col>

                            {/* Mint price */}
                            <Col className='col-auto'>
                                <p>{project.mint_amount} ETH</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='align-items-center justify-content-center'>
                    {/* Links */}
                    <Col className='col-auto gy-3'>
                        <a href={project.website_link}>
                            <img className='link-img-mobile' src={website_link_img}></img>
                        </a>
                    </Col>
                    <Col className='col-auto gy-3'>
                        <a href={project.twitter_link}>
                            <img className='link-img-mobile' src={twitter_link_img}></img>
                        </a>
                    </Col>
                    <Col className='col-auto gy-3'>
                        <a href={project.invite_url}>
                            <img className='link-img-mobile' src={discord_link_img}></img>
                        </a>
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
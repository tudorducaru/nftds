import React from 'react';
import './projectListItem.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import website_link_img from '../../website_link.png';
import discord_link_img from '../../discord_link.png';
import twitter_link_img from '../../twitter_link.png';
import verified_img from '../../verified.png';
import notification from '../../notification.png';
import { format, parseISO } from 'date-fns';

const ProjectListItem = props => {

    const project = props.project;

    return (
        <Row className='project-list-item align-items-center'>

            {/* Logo */}
            <Col className='col-auto project-logo'>
                <a href={project.invite_url}>
                    <div className='logo-container'>
                        {
                            project.logo_url ?
                                <img src={project.logo_url}></img> :
                                <div></div>
                        }
                    </div>
                </a>
            </Col>

            {/* Name */}
            <Col className='project-name'>
                <a href={project.invite_url}>
                    <p>{project.name}</p>
                </a>
            </Col>

            {/* Member Count */}
            {/* https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript */}
            <Col className='col-auto member-count'>
                <p>{project.member_count.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</p>
            </Col>

            {/* Online Member Count */}
            <Col className='col-auto online-member-count'>
                <p>{project.online_count.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</p>
            </Col>

            {/* Twitter Followers Count */}
            <Col className='col-auto twitter-followers-count'>
                <p>{project.twitter_followers_count.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</p>
            </Col>

            {/* Links */}
            <Col className='col-auto links'>
                <Row className='flex-nowrap'>
                    <Col className='col-auto gx-3'>
                        <a href={project.website_link}>
                            <img className='link-img' src={website_link_img}></img>
                        </a>
                    </Col>
                    <Col className='col-auto gx-3'>
                        <a href={project.invite_url}>
                            <img className='link-img' src={discord_link_img}></img>
                        </a>
                    </Col>
                    <Col className='col-auto gx-3'>
                        <a href={project.twitter_link}>
                            <img className='link-img' src={twitter_link_img}></img>
                        </a>
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
                <p>{format(parseISO(project.mint_date), 'dd MMM yyyy')}</p>
            </Col>

            {/* Mint price */}
            <Col className='col-auto mint-price'>
                <p>{project.mint_amount} ETH</p>
            </Col>

            {/* Mint reminder */}
            <Col className='col-auto mint-reminder d-flex justify-content-center'>
                <img src={notification} onClick={props.handleReminderModalOpen}></img>
            </Col>

        </Row>
    )
}

export default ProjectListItem
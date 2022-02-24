import React, { useState, useEffect } from 'react';
import './homepage.css';
import DataService from '../../services/dataService';
import ProjectListItem from '../../components/projectListItem/projectListItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { RiArrowDropUpLine } from 'react-icons/ri';
import { sortProjects, getLabel } from '../../helpers/sorting';

const Homepage = props => {

    // Kepp the list of projects (with member counts) in local state
    const [projects, setProjects] = useState([]);

    // Sorting options
    const [sortingField, setSortingField] = useState('created_at');
    const [sortingDirection, setSortingDirection] = useState('ASC');

    useEffect(() => {

        // Get member counts for all projects in the database
        DataService.getMemberCounts()
            .then(data => {

                // Sort the projects by creation time
                sortProjects(data, 'created_at', 'ASC');

                // Update state
                setProjects(data);

            })
            .catch(errorMessage => console.log(errorMessage));
    }, []);

    // Sort the projects every time the sorting field or sorting direction changes
    useEffect(() => {

        // Sort
        sortProjects(projects, sortingField, sortingDirection);

        // Update state
        setProjects(projects.slice());



    }, [sortingField, sortingDirection])

    return (
        <div>
            <Container id='projects-table'>

                <Row id='projects-table-header' className='mb-0'>
                    <Col>
                        <Row className='align-items-center'>
                            <Col className='col-auto p-0'>
                                <p id='sort-label'>Sort by:</p>
                            </Col>
                            <Col className='col-auto ps-2 pe-0'>
                                <DropdownButton id='sort-dropdown-button' title={getLabel(sortingField)}>
                                    <Dropdown.Item onClick={() => setSortingField('name')}>Name</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortingField('created_at')}>Date added</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortingField('member_count')}>Total users</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortingField('online_count')}>Online users</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortingField('fakemeter')}>Fakemeter</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortingField('mint_date')}>Mint date</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortingField('mint_amount')}>Mint price</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                            <Col className='col-auto p-0'>
                                {
                                    sortingDirection === 'ASC' ?
                                        <RiArrowDropUpLine onClick={() => setSortingDirection('DESC')} size={32} /> :
                                        <RiArrowDropDownLine onClick={() => setSortingDirection('ASC')} size={32} />
                                }
                            </Col>
                        </Row>
                    </Col>

                    <Col className='col-auto member-count'>
                        <p>Total users</p>
                    </Col>

                    <Col className='col-auto online-member-count'>
                        <p>Online users</p>
                    </Col>

                    <Col className='col-auto links'>
                        <p>Links</p>
                    </Col>

                    <Col className='col-auto verified-container'>
                        <p>Fakemeter</p>
                    </Col>

                    <Col className='col-auto mint-date'>
                        <p>Mint Date</p>
                    </Col>

                    <Col className='col-auto mint-price'>
                        <p>Mint Price</p>
                    </Col>

                    <Col className='col-auto invite-code'>
                        <p>Invite Code</p>
                    </Col>
                </Row>

                {
                    projects.map(project => {
                        return <ProjectListItem key={project.id} project={project} />
                    })
                }

            </Container>
        </div>
    );
};

export default Homepage;
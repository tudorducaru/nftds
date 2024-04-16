import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './currencyDropdown.css';

const CurrencyDropdown = props => {

    return (
        <Dropdown>
            <Dropdown.Toggle className='form-control currency-dropdown-toggle' as='div'>
                {
                    props.value ? <p>{props.value}</p> : <p className='dropdown-placeholder'>Select mint currency...</p>
                }
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => props.setFieldValue('mint_currency', '')}>None</Dropdown.Item>
                <Dropdown.Item onClick={() => props.setFieldValue('mint_currency', 'ETH')}>ETH</Dropdown.Item>
                <Dropdown.Item onClick={() => props.setFieldValue('mint_currency', 'SOL')}>SOL</Dropdown.Item>
                <Dropdown.Item onClick={() => props.setFieldValue('mint_currency', 'MAT')}>MAT</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CurrencyDropdown;
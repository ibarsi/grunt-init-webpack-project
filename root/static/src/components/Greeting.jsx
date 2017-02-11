/* ==================================================
    GREETING
================================================== */

import React from 'react';

import './greeting.css';

const Greeting = ({ title }) =>
    <p className={ 'test-class' }>
        { title }
    </p>;

Greeting.propTypes = {
  title: React.PropTypes.string
};

export default Greeting;

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeaderContainer, ChatContainer, GameContainer } from 'containers';
import 'normalize.css/normalize.css';
import 'css/main.scss';

class App extends Component {

    render() {
        return (
            <div className="components-wrapper">
                <HeaderContainer />
                <GameContainer />
                <ChatContainer />
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

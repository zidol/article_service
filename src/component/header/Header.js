import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'

class Header extends Component {

    goToSignInPage = e => {
        this.props.history.push('/sign-in')
    }

    onSignOut = e => {

    }

    render() {
        return (
            <Menu>
                <Menu.Item header>
                    내 서비스
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item onClick={this.goToSignInPage}>
                        로그인
                    </Menu.Item>
                    <Menu.Item onClick={this.onSignOut}>
                        로그아웃
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default withRouter(Header);
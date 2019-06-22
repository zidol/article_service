import React, { Component, Fragment } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

/**
 *  Button처럼 다른 라이브러리 또는 직접 만든 컴포넌트의 경우
 *  &를 사용해서 margin을 먹일 depth를 정함
 */
const StyledButton = styled(Button)`
    &&&{
        margin: 8px 0;
    }
`

class SignIn extends Component {

    goToEmailLoginPage = e => {
        this.props.history.push('/sign-in/email')
    }

    onFacebookLogin = e => {

    }

    onGoogleLogin = e => {

    }

    render() {
        return (
            <Fragment>
                <StyledButton
                    color="blue"
                    fluid
                    onClick={this.goToEmailLoginPage}>
                    <Icon name="mail" /> 이메일로 시작하기
                </StyledButton>
                <StyledButton
                    color="facebook"
                    fluid
                    onClick={this.onFacebookLogin}>
                    <Icon name="facebook" /> 페이스북으로 시작하기
                </StyledButton>
                <StyledButton
                    color="google plus"
                    fluid
                    onClick={this.onGoogleLogin}>
                    <Icon name="google plus" /> 구글로 시작하기
                </StyledButton>
            </Fragment>
        )
    }
}

export default withRouter(SignIn);
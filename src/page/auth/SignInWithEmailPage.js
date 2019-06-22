import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react'
import SignInWithEmail from '../../component/auth/SignInWithEmail'

class SignInWithEmailPage extends Component {
    render() {
        return (
            <Container>
                <Grid centered>
                    <Grid.Column computer={6} tablet={8} mobile={15}>
                        <SignInWithEmail />
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default SignInWithEmailPage;
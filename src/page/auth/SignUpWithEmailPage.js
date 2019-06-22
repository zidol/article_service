import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react'
import SignUpWithEmail from '../../component/auth/SignUpWithEmail'

class SignUpWithEmailPage extends Component {
    render() {
        return (
            <Container>
                <Grid centered>
                    <Grid.Column computer={6} tablet={8} mobile={15}>
                        <SignUpWithEmail />
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default SignUpWithEmailPage;
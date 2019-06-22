import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react'
import SignIn from '../../component/auth/SignIn'

class SignInPage extends Component {
    render() {
        return (
            <Container>
                <Grid centered>
                    <Grid.Column computer={6} tablet={8} mobile={15}>
                        <SignIn />
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default SignInPage;
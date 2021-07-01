import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaigns from '../../../Ethereum/campaign';
import web3 from '../../../Ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';
import  styles  from '../requests/new.request.module.css';

export default class RequestNew extends Component {

    state = {
        value: '',
        description: '',
        recipient: '',
        errorMessage: '',
        loading: false
    };

    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    reset = () => {
        this.setState({
            value: '',
            description: '',
            recipient: '',
            errorMessage: '',
            loading: false
        });
    }

    onSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });

        const campaign = Campaigns(this.props.address);
        const { description, value, recipient } = this.state;

        try {
            const accounts = await web3.eth.getAccounts();

            if (recipient == '') {
                throw new Error('address cannot be empty');
            }
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient
            ).send({
                from: accounts[0]
            });

            Router.pushRoute(`/campaigns/${this.props.address}/requests/`)
        } catch (error) {
            this.setState({
                errorMessage: error.message
            });
        } finally {
            this.setState({
                loading: false
            });
        }
    };

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>

                <h2 className={styles.textcenter}>Create a new request</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label className={styles.label}>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={event =>
                                this.setState({ description: event.target.value })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label className={styles.label}>Value in Ether</label>
                        <Input
                            value={this.state.value}
                            onChange={event =>
                                this.setState({ value: event.target.value })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label className={styles.label} >Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={event =>
                                this.setState({ recipient: event.target.value })
                            }
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button type='button' onClick={this.reset}>Cancel</Button>
                    <Button type='submit' primary loading={this.state.loading}>Create</Button>
                </Form>
            </Layout>
        );
    }
}

import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../Ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react'
import web3 from '../../Ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';
import styles from '../campaigns/show.module.css';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
  integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
  crossorigin="anonymous"
/>

export default class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            campaignBalance: summary[1],
            noOfReq: summary[2],
            noOfContributor: summary[3],
            manager: summary[4]

        };
    }

    renderCard() {

        // de structuring
        const {
            minimumContribution,
            campaignBalance,
            noOfReq,
            noOfContributor,
            manager,
        } = this.props;

        const items = [
            // {
            //     className: styles.card4,
            //     header: manager,
            //     description: 'The Manager created this Campaign and can create requests to withdraw money.',
            //     meta: 'Address of Manager',
            //     style: { overflowWrap: 'break-word' }
            // },
            {
                className: styles.card4,
                header: minimumContribution,
                description: 'You must contribute atleast this much wei to become a approver.',
                meta: 'Minimum Contribution (wei)',
            },
            {
                className: styles.card4,
                header: noOfReq,
                description: (
                <Link route={`/campaigns/${this.props.address}/requests`}>  
                <p>
                A request tries to withdraw money from the contract. A request must be approved by approvers. <Button primary style={{width:"100%", marginTop:"10px"}}>View Requests</Button>
                </p>
            </Link>),
                // description: 'A request tries to withdraw money from the contract. A request must be approved by approvers.',
                meta: 'Number of Requests',
            },
            {
                className: styles.card4,
                header: noOfContributor,
                description: 'No of people who have already donated to the campaign.',
                meta: 'No of Approvers',
            },
            {
                className: styles.card4,
                header: web3.utils.fromWei(campaignBalance, 'ether'),
                description: 'The amount of money campaign has left to spend.',
                meta: 'Campaign Balance (ether)',
            }
        ];

        return <Card.Group items={items}/>;
    }

    render() {
        return (
            <Layout>
                <h3 style={{color: 'white'}}>Campaign Detail</h3>
                            {/* <Link route={`/campaigns/${this.props.address}/requests`}>  
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link> */}
                            {/* <Link route={`/campaigns/${this.props.address}/requests`}>  
                                <a>
                                    <Button primary>Contribute to our campaign</Button>
                                </a>
                            </Link> */}
                            <ContributeForm address={this.props.address} />
                <Grid>
                    <Grid.Row>
                    <Card className={styles.card4add} description="The Manager created this Campaign and can create requests to withdraw money."
                        header={this.props.address} style={{ overflowWrap: 'break-word' }}
                        meta="Address of Manager"
                        >
                        </Card>
                    {/* <Grid.Column width={3}>
                    <ContributeForm address={this.props.address} />
                    </Grid.Column>
                    <Grid.Column width={3}>
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                    </Grid.Column> */}
                        
                    </Grid.Row>
                    <Grid.Row>
                    {this.renderCard()}
                    
                    </Grid.Row>

                </Grid>
            </Layout>
        );
    }
}
import React, { Component } from 'react';
import factory from '../Ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {

    static async getInitialProps() {
        // next js execute on the server side
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>
                            <Button
                                content="View"
                                icon="eye"
                                primary
                                floated="center"     
                                style={{ backgroundColor: '#FCD535', color:"black"}}   
                                className= "ui fluid button"                       
                            />
                        </a>
                    </Link>
                ),
                style: { color:"white", overflowWrap: 'break-word',  boxShadow: "0px 7px 9px -2px rgba(31,31,31,1)",
                backgroundColor: "white"} 
            };
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <div>
                <Layout>
                    <div>
                    <h3 style={{ color: 'gold', display:'inline-block' }}>Views Campaigns</h3>
                        <Link route="/campaigns/new">
                            <a >
                                <Button
                                    content="Create Campaign"
                                    icon="add circle"
                                    primary
                                    float="center"
                                    style={{ backgroundColor: '#FCD535', color:"black", marginLeft:"10px" }}
                                />
                            </a>
                        </Link>
                    </div>
                    <div style ={{marginTop:"20px"}} >                                       
                        {this.renderCampaigns()}
                    </div>
                </Layout>

            </div>
        );
    }
}

export default CampaignIndex;
import React, { Component } from 'react'
import { Table, Button, Message, Icon, Popup } from 'semantic-ui-react';
import web3 from '../Ethereum/web3';
import Campaign from '../Ethereum/campaign';
import style from './RequestRow.module.css'

export default class RequestRow extends Component {

    state = {
        errorMessageApprove: '',
        loadingApprove: false,
        errorMessageFinalize: '',
        loadingFinalize: false,
    };

    onApprove = async () => {

        this.setState({
            loadingApprove: true,
            errorMessageApprove: ''
        });

        try {
            const campaign = Campaign(this.props.address);

            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            });
        }
        catch (error) {
            this.setState({
                errorMessageApprove: error.message
            });
        } finally {
            this.setState({
                loadingApprove: false,
            });
        }
    };

    onFinalize = async () => {
        this.setState({
            loadingFinalize: true,
            errorMessageFinalize: ''
        });
        try {
            const campaign = Campaign(this.props.address);

            const accounts = await web3.eth.getAccounts();

            await campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            });
        } catch (error) {
            this.setState({
                errorMessageFinalize: error.message
            });
        } finally {
            this.setState({
                loadingFinalize: false,
            });
        }
    };

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount, key } = this.props;
        const readyToFinalize = request.approvalCount > approversCount / 2;
        return (
            <Row className={id / 2 === 0 ? style.row1 : style.row0} disabled={request.complete}  >
                <Cell className={style.cell}>{id}</Cell>
                <Cell className={style.cell}>{request.description}</Cell>
                <Cell className={style.cell}>{web3.utils.fromWei(request.value, 'ether')} (ether)</Cell>
                <Cell className={style.cell}>{request.recipient}</Cell>
                <Cell  className={style.cell}><b style= {{color : "peachpuff"}}>{request.approvalCount}</b>/{approversCount}</Cell>
                <Cell error={!!this.state.errorMessageApprove} className={style.cellend}>
                    <Popup
                        header="Error"
                        content={this.state.errorMessageApprove}
                        trigger={<Icon name='attention'
                            style={{ display: this.state.errorMessageApprove ? 'inline-block' : 'none' }} />}
                        hoverable />
                    {request.complete ? null : (<Button color='green' loading={this.state.loadingApprove} basic onClick={this.onApprove}>Approve</Button>)}
                </Cell>
                <Cell className={style.cellend} error={!!this.state.errorMessageFinalize}>
                    <Popup
                        header="Error"
                        content={this.state.errorMessageFinalize}
                        trigger={<Icon name='attention'
                            style={{ display: this.state.errorMessageFinalize ? 'inline-block' : 'none' }} />}
                        hoverable />
                    {request.complete ? null : (<Button color='teal' loading={this.state.loadingFinalize} basic onClick={this.onFinalize}>Finalize</Button>)}
                </Cell>
            </Row>
        );
    }
}

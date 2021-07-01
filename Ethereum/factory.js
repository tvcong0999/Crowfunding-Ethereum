import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xCa0a1eD4A03B86Ec861668d1B891E1b21aB36757'
);

export default instance;
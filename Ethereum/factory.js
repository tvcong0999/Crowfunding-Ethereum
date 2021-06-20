import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xe26F3cb579c2204101a878a3851ff9DC8d292C01'
);

export default instance;
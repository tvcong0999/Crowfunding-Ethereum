import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x0baC2d480943e5ad9A2275D4b91188f72AF812c7'
);

export default instance;
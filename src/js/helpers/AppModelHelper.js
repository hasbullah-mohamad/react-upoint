import CONSTANT from '../config/constant';
import ConstantHelper from './ConstantHelper';

const AppModelHelper = {
  getServices: (services) => {
    if (!services) return [];
    return services.map(service => ({
      ...service,
      plan: ConstantHelper.getItemByField(CONSTANT.PRICINGS, 'value', service.plan_key),
      sim: ConstantHelper.getItemByField(CONSTANT.SIMS, 'value', service.sim_type)
    }));
  }
};

export default AppModelHelper;

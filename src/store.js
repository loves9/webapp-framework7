import HRStore from '@/common/store/index';

// 引入模块
import homeStore from '@/pages/store'


// 注册 module
HRStore.registerModule('home', homeStore);

export default HRStore;
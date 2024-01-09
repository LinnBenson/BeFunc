// 导入依赖
import ToolClass from './lib/Tool.class.js';
import ApiProessClass from './lib/ApiProcess.class.js';
import ServerProessClass from './lib/ServerProess.class.js';

const Tool = new ToolClass;
// 导出实例
export const ApiProess = ApiProessClass;
export const ServerProess = ServerProessClass;
export default Tool;
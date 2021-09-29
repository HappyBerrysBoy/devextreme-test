import { createStore } from "vuex";
import commonModules from "./commonModules";
import gateModules from "./gateModules";
import GlobalConstant2 from "./GlobalConstant2";

console.log("commonModules", commonModules);
console.log("gateModules", gateModules);
console.log("ttttttttt", { ...commonModules, ...gateModules });

export default createStore({
  modules: { ...commonModules, ...gateModules, GlobalConstant2 },
});

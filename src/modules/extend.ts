import {
  createDefine,
  createInstance,
  DefineType,
  ModuleRoot,
  OptionsPick,
} from "moduse";
import { createHook } from "vue-moduse";

type IData = DefineType<string>;
type IHelper = DefineType<(...args: any) => any>;
type IActions = DefineType<(...args: any) => any>;

export class MyModuleRoot extends ModuleRoot {
  static hook<T extends typeof ModuleRoot, S extends Capitalize<string>>(
    this: T,
    name: S
  ) {
    return createHook(this, name);
  }
  static create = createInstance<"data" | "helper" | "actions">();
  static defineHelper = createDefine<IHelper>();
  static defineAction = createDefine<IActions>();

  constructor(
    options: OptionsPick<MyModuleRoot, "data" | "helper" | "actions">
  ) {
    super(options);
  }

  data?: IData;
  helper?: IHelper;
  actions?: IActions;

  useData = this.createUse("data");
  useHelper = this.createUse("helper");
  useActions = this.createUse("actions", ([key, value]) => {
    return (...args: any) => {
      console.log("action:", key, ...args);
      value.call(this, ...args);
    };
  });
}

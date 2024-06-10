import {
  ModuleRoot,
  ModuleOptions,
  OptionsKeys,
  defineFuncFields,
  useFuncFields,
} from "moduse";

// 自定义的注入选项
type MyOptionsKeys = OptionsKeys | "utils";

export class MyModuleRoot<
  T extends ModuleOptions<MyOptionsKeys>
> extends ModuleRoot<T> {
  // 添加自定义的静态方法
  static defineUtils = defineFuncFields;

  // 添加自定义的属性声明
  utils: T["utils"];

  constructor(options: T) {
    super(options);
    // 绑定自定义的属性
    this.utils = useFuncFields.call(this, options.utils);
  }
}

import { MyModuleRoot } from "../extend";

export class ExampleModule extends MyModuleRoot {
  data = this.useData({
    name: "moduse",
    desc: "hello world",
  });
  actions = this.useActions([action1, action2]);
  helper = this.useHelper(helper1);
}

const action1 = ExampleModule.defineAction({
  updateName(name: string) {
    this.data.name = name;
  },
});
const action2 = ExampleModule.defineAction({
  updateDesc(desc: string) {
    this.data.desc = desc;
  },
});

const helper1 = ExampleModule.defineHelper({
  getData() {
    const data = `${this.data.name},${this.data.desc}`;
    console.log(data);
    return data;
  },
});

export const { useExample, initExample, setExampleOptions } =
  ExampleModule.hook("Example");

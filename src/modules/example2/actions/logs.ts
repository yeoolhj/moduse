import { ExampleModule } from "..";

// 通过模块的define方法定义模块相关业务逻辑，this指该向该模块实例
export const logsAction = ExampleModule.define({
  addLog(date: Date) {
    this.state.logs.push(date.toDateString());
  },
  removeLog(index: number) {
    this.state.logs.splice(index, 1);
  },
  updateLog(index: number, date: Date) {
    this.state.logs[index] = date.toDateString();
  },
});

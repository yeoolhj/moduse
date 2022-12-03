import { ExampleModule } from "..";

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

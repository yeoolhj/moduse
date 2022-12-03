import { ExampleModule } from ".";

export const config = ExampleModule.defineConfig({
  requestConfig: {
    baseURL: "http://localhost:3000/api",
  },
  defaultInfo: {
    name: "example",
    description: "this is single example",
  },
});

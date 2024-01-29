export * from "colors";
import { gostClient } from "./infra/ExtendedClient";

(async () => {
  await gostClient.start();
  gostClient.loadCommands();
  await gostClient.registerCommands();
  await gostClient.interactionsObserver();
  await gostClient.eternalResponses();
})();

gostClient.on("ready", () => {
  console.log(`Logged in as ${gostClient.user?.tag}!`.green);
});

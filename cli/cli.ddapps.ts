
import { Command } from "https://deno.land/x/cliffy@v0.19.5/command/mod.ts";
import { ddappsctl } from "ddapps/cli/cli.ts";
import { EOpType } from "ddapps/operation.ts";
import { LClient } from "../src/client.ddapps.ts";

const chat = new Command()
  .description("Send a chat message")
  .version("0.2.0")
  .option("-m, --message <message:string>", "Message to send")
  .action(async ({ address, port, message, trace }: {
    address: string;
    port: number;
    message: string;
    trace: boolean;
  }) => {

    let trc = "";

    await new LClient(address, port, trace).co
      .then((ops) => {

        if (trace) {
          ops.listen(EOpType.Trace, (t) => {
            trc += t.payload.payload + " -> "
            console.clear();
            console.log("[Trace]", trc)
          })
        }

        return ops.sendChatMessage(message);
      }).then(response => {

        if (trace) {
          console.clear();
          console.log("[Trace]", trc + "Client")
        }

        console.dir(response);
        Deno.exit(0);
      }).catch((err) => {
        console.error(err);
        Deno.exit(1);
      });
  });

await ddappsctl
  .command("chat", chat)
  .parse(Deno.args);

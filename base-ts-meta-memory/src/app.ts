import { createBot, createProvider } from "@builderbot/bot";
import { MemoryDB as Database } from "@builderbot/bot";
import Queue from "queue-promise";
import { provider } from "./provider";
import { config } from "./config";
import  templates  from "./templates";
import { ChatwootClass } from "./services/chatwoot/chatwoot.class";

const PORT = config.PORT;

const queue = new Queue({
    concurrent: 1,
    interval: 500,
})

const chatwoot = new ChatwootClass({
    account: "1",
    token: 'ekizhEPG946U5wmoE9ANBoqH',
    endpoint: 'http://149.50.145.249:3000'
})

const main = async () => {
    const bot = await createBot({
        flow: templates,
        provider: provider,
        database: new Database(),
    });

    console.log('Bot creado...', bot.generalArgs.host)

    bot.httpServer(+PORT)
    
    provider.on('message', (payload) => {
        queue.enqueue(async () => {
            await handlerMessage({
                phone:payload.from, 
                name:payload.name, 
                message: payload.body, 
                mode: 'incoming',
                attachment:[]
            }, chatwoot)
            console.log(`Esto es un mensaje que envia un cliente al bot... ${payload.body}`)
        })
    })

    bot.on(`send_message`, (payload) => {
        console.log(payload)

        queue.enqueue(async () => {
            console.log('este es el mensaje que enviamos nosotros... ', payload.answer)
        })
    })

};

main();


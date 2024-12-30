import { MetaProvider as Provider } from "@builderbot/provider-meta";
import { createProvider } from "@builderbot/bot";
import { config } from "../config";

console.log("Configuración cargada:", config);

export const provider = createProvider(Provider, {
    jwtToken: config.jwtToken?.trim(),
    numberId: config.numberId?.trim(),
    verifyToken: config.verifyToken?.trim(),
    version: config.version
});
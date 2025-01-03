import { createFlow } from "@builderbot/bot";
import { mainFlow, flowAdministrativos, flowCarga,flowCali,flowBogota,flowSaldos } from "./mainFlow"; // Importamos todos los flujos

export default createFlow([
    mainFlow,
    flowAdministrativos,
    flowCarga,
    flowCali,
    flowBogota,
    flowSaldos
]);
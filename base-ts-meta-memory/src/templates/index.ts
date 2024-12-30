import { createFlow } from "@builderbot/bot";
import { mainFlow, flowAdministrativos, flowCarga,flowCali,flowBogota } from "./mainFlow"; // Importamos todos los flujos

export default createFlow([
    mainFlow,
    flowAdministrativos,
    flowCarga,
    flowCali,
    flowBogota
]);
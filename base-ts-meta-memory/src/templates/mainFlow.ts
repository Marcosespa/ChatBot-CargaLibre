import { addKeyword, EVENTS } from "@builderbot/bot";
import sheetsService from "~/services/sheetsService";

import { addKeyword, createFlow, EVENTS } from "@builderbot/bot";
import { createBot, createProvider, utils } from "@builderbot/bot";
import { MetaProvider as Provider } from "@builderbot/provider-meta";
import { addKeyword, addAction } from "@builderbot/bot";

interface BotState {
  userName?: string;
  selectedCity?: string;
  available?: boolean;
  name?: string;
  latitude?: string;
  longitude?: string;
  carType?: string;
  disponibilidad?: string;
  peso?: string;
  cubicaje?: string;
  placa?: string;
  hojaVida?: string;
}

const userDecisions = {
  name: "",
  latitude: "",
  longitude: "",
  carType: "",
  peso: "",
  cubicaje: "",
  placa: "",
  hojaVida: "",
  disponibilidad: "",
  remesa: "",
};

const userDecisionsAdmin = {
  name: "",
  decisionAdministrativa: "",
};

//Flujo Bogota
const flowBogota = addKeyword(EVENTS.ACTION)
  .addAnswer(
    "Te ayudaré compartiéndote los contactos importantes de Bogota 📱📞"
  )
  .addAnswer("", null, async (ctx, { provider }) => {
    await provider.sendContacts(ctx.from, [
      {
        name: {
          formatted_name: "Saldos Bogota",
          first_name: "Saldos Bogota",
        },
        phones: [
          {
            phone: "+573147516693",
            type: "CELL",
          },
        ],
      },
    ]);
  })
  .addAnswer("", null, async (ctx, { provider }) => {
    await provider.sendContacts(ctx.from, [
      {
        name: {
          formatted_name: "Despachos Bogota",
          first_name: "Despachos Bogota",
        },
        phones: [
          {
            phone: "+573147516693",
            type: "CELL",
          },
        ],
      },
    ]);
  })
  .addAnswer("", null, async (ctx, { flowDynamic }) => {
    // Añadir un retraso de 2 segundos (2000 ms)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Después del delay, se envían las respuestas
    await flowDynamic([
      "Si no te permite enviarles un mensaje 📩, puedes agregarlos a contactos y escribirles ✍️",
      "Si no deseas escribirles, puedes llamarlos 📞",
    ]);
  });

//Flujo cali
const flowCali = addKeyword(EVENTS.ACTION)
  .addAnswer("Te ayudaré compartiéndote los contactos importantes de Cali 📱📞")
  .addAnswer("", null, async (ctx, { provider }) => {
    await provider.sendContacts(ctx.from, [
      {
        name: {
          formatted_name: "Saldos Cali",
          first_name: "Saldos Cali",
        },
        phones: [
          {
            phone: "+573147516693",
            type: "WORK",
          },
        ],
      },
    ]);
  })
  .addAnswer("", null, async (ctx, { provider }) => {
    await provider.sendContacts(ctx.from, [
      {
        name: {
          formatted_name: "Despachos Cali",
          first_name: "Despachos Cali",
        },
        phones: [
          {
            phone: "+573147516693",
            type: "WORK",
          },
        ],
      },
    ]);
  })
  .addAnswer("", null, async (ctx, { flowDynamic }) => {
    // Añadir un retraso de 2 segundos (2000 ms)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Después del delay, se envían las respuestas
    await flowDynamic([
      "Si no te permite enviarles un mensaje 📩, puedes agregarlos a contactos y escribirles ✍️",
      "Si no deseas escribirles, puedes llamarlos 📞",
    ]);
  });

//Flow carga
const flowCarga = addKeyword(EVENTS.ACTION)
  .addAnswer("Gracias por escogernos para buscar Carga 🚛")

  // Ubicación del vehiculo
  .addAnswer(
    [
      "Por favor, comparte tu ubicación actual 📍",
      "Para esto, usa el clip 📎 o el ícono + y selecciona 'Ubicación'",
    ],
    {
      capture: true,
    },
    async (ctx, { state }) => {
      // Actualizar las coordenadas en userDecisions
      if (ctx.type === "location") {
        userDecisions.latitude = ctx.latitude?.toString();
        userDecisions.longitude = ctx.longitude?.toString();
        console.log("Ubicación capturada:", {
          latitude: ctx.latitude,
          longitude: ctx.longitude,
        });
      }
    }
  )

  // Tipo de vehiculo

  .addAnswer(
    [
      "Por favor, selecciona el tipo de vehículo escribiendo el número correspondiente:",
      "",
      "1️⃣ Turbo",
      "2️⃣ Sencillo",
      "3️⃣ Doble Troque",
      "4️⃣ Mini Mula",
      "5️⃣ Mula",
      "6️⃣ Ninguna de las anteriores",
    ],
    { capture: true },
    async (ctx, { flowDynamic, state }): Promise<void> => {
      // Mapear números a tipos de vehículo
      const vehicleTypes = {
        "1": "Turbo",
        "2": "Sencillo",
        "3": "Doble Troque",
        "4": "Mini Mula",
        "5": "Mula",
        "6": "Otro",
      };

      // Obtener el tipo de vehículo basado en la selección del usuario
      const selectedType = vehicleTypes[ctx.body] || ctx.body;
      userDecisions.carType = selectedType;
      await state.update({ carType: selectedType });
      await flowDynamic(
        `El tipo de carro que seleccionaste es: ${selectedType}`
      );
      console.log("CARRO TIPO:", userDecisions.carType);
    }
  )
  .addAnswer(
    [
      "¿Tu vehículo tiene disponibilidad inmediata para cargar? 🚛",
      "",
      "1️⃣ Sí, disponible ahora",
      "2️⃣ No, disponible en otro momento",
    ],
    { capture: true },
    async (ctx, { flowDynamic, fallBack, state }): Promise<void> => {
      const opcion = ctx.body;

      if (!["1", "2"].includes(opcion)) {
        await flowDynamic("❌ Por favor, selecciona 1 o 2");
        return fallBack();
      }

      const disponibilidad = opcion === "1" ? "Inmediata" : "Posterior";
      userDecisions.disponibilidad = disponibilidad;
      await state.update({ disponibilidad });

      await flowDynamic(`✅ Entendido! Disponibilidad: ${disponibilidad}`);
    }
  )

  // Peso del vehiculo
  .addAction(async (_, { flowDynamic }): Promise<void> => {
    await flowDynamic([
      "¿Cuál es el peso máximo de carga que puede transportar tu vehículo? 🏋️‍♂️",
      "Por favor, ingresa el peso en kilogramos (KG)",
    ]);
  })

  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, state }): Promise<void> => {
      userDecisions.peso = ctx.body;
      await state.update({ peso: ctx.body });
      await flowDynamic(
        `✅ Perfecto! El peso máximo de carga es: ${ctx.body} KG`
      );
    }
  )

  // Cubicaje del vehiculo
  .addAction(async (_, { flowDynamic }): Promise<void> => {
    await flowDynamic([
      "¿Cuál es el volumen de carga de tu vehículo? 📦",
      "Por favor, ingresa el volumen en metros cúbicos (M³)",
    ]);
  })

  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, state }): Promise<void> => {
      userDecisions.cubicaje = ctx.body;
      await state.update({ cubicaje: ctx.body });
      await flowDynamic(`✅ Excelente! El volumen de carga es: ${ctx.body} M³`);
    }
  )

  // Placa del vehiculo
  .addAction(async (_, { flowDynamic }): Promise<void> => {
    await flowDynamic([
      "¿Cuál es la placa de tu vehículo? 🚛",
      "Por favor, ingresa la placa sin espacios",
    ]);
  })

  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, state }): Promise<void> => {
      userDecisions.placa = ctx.body;
      await state.update({ placa: ctx.body });
      await flowDynamic(`✅ Gracias! La placa registrada es: ${ctx.body}`);
    }
  )

  //Hoja de vida
  .addAnswer([
    "Cuentas con hoja de vida con nosotros?",
    "Si no cuentas con una no te preocupes, te ayudaremos a hacerla ",
  ])
  .addAction(async (ctx, { provider }) => {
    await provider.sendButtons(
      ctx.from,
      [{ body: "Si" }, { body: "No" }],
      `Porfavor selecciona si cuentas con hoja de vida o no.`
    );
  })
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, state }): Promise<void> => {
      userDecisions.hojaVida = ctx.body;
      await state.update({ hojaVida: ctx.body });

      try {
        // Asegúrate de que ctx.from existe y es una cadena válida
        if (!ctx.from) {
          throw new Error("Número de teléfono no disponible");
        }

        await sheetsService.createUser(ctx.from, userDecisions);
        await flowDynamic(
          `Muchas gracias, tu información ha sido guardada exitosamente y en breves te contactaremos.`
        );
      } catch (error) {
        console.error("Error completo al crear usuario:", error);
        await flowDynamic(
          `Lo siento, hubo un problema al guardar tu información. Por favor, intenta nuevamente más tarde.`
        );
      }

      console.log("HOJA DE VIDA:", userDecisions.hojaVida);
      console.log("Datos completos:", userDecisions);
    }
  );

const flowSaldos = addKeyword(EVENTS.ACTION)
  .addAnswer("Ahora te ayudaré a buscar remesas 📦")

  // Solicitar al usuario el número de remesa
  .addAction(async (_, { flowDynamic }): Promise<void> => {
    await flowDynamic([
      "¿Cuál es el número de remesa a buscar?",
      "Por favor, ingresa la remesa sin espacios.",
    ]);
  })

  // Capturar el número de remesa ingresado por el usuario
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, state }): Promise<void> => {
      try {
        // Guardar la remesa en el estado y en userDecisions
        userDecisions.remesa = ctx.body;
        await state.update({ remesa: ctx.body });

        // Confirmar al usuario
        await flowDynamic(
          `✅ ¡Gracias! La remesa ${ctx.body} está siendo buscada...`
        );

        // Llamar a un servicio para buscar la remesa
        const remesaData = await sheetsService.getRemesa(ctx.body);

        // Verificar si se encontró la remesa
        if (remesaData) {
          await flowDynamic([
            "✅ ¡Remesa encontrada!",
            `Aquí están los detalles:`,
            `Número: ${remesaData[0]}`,
            `Destinatario: ${remesaData[1]}`,
            `Estado: ${remesaData[2]}`,
            `Fecha: ${remesaData[3]}`,
          ]);
        } else {
          await flowDynamic(
            `❌ Lo siento, no se encontró la remesa con el número: ${ctx.body}.`
          );
        }
      } catch (error) {
        console.error("Error al buscar la remesa:", error);
        await flowDynamic(
          `⚠️ Lo siento, ocurrió un problema al buscar la remesa. Intenta nuevamente más tarde.`
        );
      }
    }
  );


// Flujos administrativos
const flowAdministrativos = addKeyword(EVENTS.ACTION)
  .addAnswer("Bienvenido a la parte administrativa") // Elimina el punto innecesario aquí

  .addAnswer(
    "¿Te interesan comunicarte con Cali o Bogota?",
    {
      buttons: [
        { body: "Cali" },
        { body: "Bogota" }, // Elimina el espacio adicional
        { body: "Menu Principal" }, // Elimina el espacio adicional
      ],
      capture: true,
    },
    async (ctx, { state, gotoFlow }) => {
      const answer = ctx.body.toLowerCase();
      if (answer === "cali") {
        await state.update({ available: true });
        return gotoFlow(flowCali);
      } else if (answer === "bogota") {
        // Compara directamente con la cadena 'bogota'
        return gotoFlow(flowBogota);
      } else if (answer === "menu principal") {
        // Maneja el caso del menú principal
        return gotoFlow(mainFlow);
      }
    }
  );

const mainFlow = addKeyword(EVENTS.WELCOME)
  .addAnswer(
    "🚚 ¡Hola! Bienvenido a Rutix, queremos integrar la logística en Colombia"
  )
  .addAction(async (_, { flowDynamic }): Promise<void> => {
    await flowDynamic("Cuál es tu nombre?");
  })
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, state }): Promise<void> => {
      userDecisions.name = ctx.body; // Guardamos la decisión del usuario en name
      await state.update({ name: ctx.body });
      await flowDynamic(
        `Hola ${ctx.body} es un gusto tenerte con nosotros de nuevo 😊`
      );
    }
  )
  .addAnswer(
    "¿Te interesan buscar carga o procesos administrativos con Rutix?",
    {
      buttons: [
        { body: "Buscar Carga 🚚" },
        { body: "Administrativos 🖥️" },
        { body: "Averiguar Saldo" },
      ],
      capture: true,
    },
    async (ctx, { state, gotoFlow }) => {
      const answer = ctx.body.toLowerCase();
      if (answer.includes("buscar carga")) {
        state.available = true;
        return gotoFlow(flowCarga);
      } else if (answer.includes("administrativos")) {
        return gotoFlow(flowAdministrativos);
      } else if (answer.includes("saldo")) {
        return gotoFlow(flowSaldos);
      } else {
        return gotoFlow(mainFlow);
      }
    }
  );

// Exportaciones

export { mainFlow, flowCarga, flowAdministrativos, flowCali, flowBogota ,flowSaldos};

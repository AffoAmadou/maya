import { createMachine, assign } from "xstate";

export const machine = createMachine({
  id: "Maya",
  initial: "Prelaunch",
  context: {},
  states: {
    Prelaunch: {
      on: {
        Assembling: {
          target: "Introduction",
        },
      },
      entry: assign((context, event) => ({
        ...context,
        TriptychLeftState: "prelaunch",
        TriptychRightState: "prelaunch",
        ObjectsAvailable: [],
      })),
    },
    Introduction: {
      on: {
        FlowersAdded: {
          target: "DansingMoon",
        },
      },
      entry: assign((context, event) => ({
        ...context,
        TriptychLeftState: "introduction",
        TriptychRightState: "introduction",
        ObjectsAvailable: ["flowers"],
      })),
    },
    DansingMoon: {
      on: {
        StarsAdded: {
          target: "SunJalousy",
        },
      },
      entry: assign((context, event) => ({
        ...context,
        TriptychLeftState: "dansingMoon",
        TriptychRightState: "dansingMoon",
        ObjectsAvailable: ["flowers", "stars"],
      })),
    },
    SunJalousy: {
      on: {
        Burning: {
          target: "MoonFleeing",
        },
      },
      entry: assign((context, event) => ({
        ...context,
        TriptychLeftState: "sunJalousy",
        TriptychRightState: "sunJalousy",
        ObjectsAvailable: ["flowers", "stars", "sun"],
      })),
    },
    MoonFleeing: {
      on: {
        Flying: {
          target: "Montain",
        },
      },
      entry: assign((context, event) => ({
        ...context,
        TriptychLeftState: "moonFleeing",
        TriptychRightState: "moonFleeing",
        ObjectsAvailable: ["flowers", "stars", "sun", "moon"],
      })),
    },
    Montain: {
      on: {
        Climbing: {
          target: "Reunite",
        },
      },
      entry: assign((context, event) => ({
        ...context,
        TriptychLeftState: "montain",
        TriptychRightState: "montain",
        ObjectsAvailable: ["flowers", "stars", "sun", "moon", "montain"],
      })),
    },
    Reunite: {
      on: {
        Burning: {
          target: "Night",
        },
      },
      entry: assign((context, event) => ({
        ...context,
        TriptychLeftState: "reunite",
        TriptychRightState: "reunite",
        ObjectsAvailable: ["flowers", "stars", "sun", "moon", "montain", "reunite"],
      })),
    },
    Night: {
      on: {
        StarsSurrounding: {
          target: "Compromise",
        },
      },
      entry: assign((context, event) => ({
        ...context,
        TriptychLeftState: "night",
        TriptychRightState: "night",
        ObjectsAvailable: ["flowers", "stars", "sun", "moon", "montain", "reunite", "night"],
      })),
    },
    Compromise: {
      on: {
        Hugging: {
          target: "End",
        },
      },
      entry: assign((context, event) => ({
        ...context,
        TriptychLeftState: "compromise",
        TriptychRightState: "compromise",
        ObjectsAvailable: ["flowers", "stars", "sun", "moon", "montain", "reunite", "night", "compromise"],
      })),
    },
    End: {
      type: "final",
      entry: assign((context, event) => ({
        ...context,
        TriptychLeftState: "end",
        TriptychRightState: "end",
        ObjectsAvailable: ["flowers", "stars", "sun", "moon", "montain", "reunite", "night", "compromise", "end"],
      })),
    },
  },
});

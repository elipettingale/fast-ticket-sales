import { createMachine, assign } from "xstate";
import { clone } from "./helpers";

const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgGIAVASQFkBRAeQFUiBtABgF1FQAHAe1mwBdtOuNiAAeiACwAmADQgAnokkBWABwA6SQHYV4gGyNdkxoyWaAjAF8LstFjxg1-ZGE4BXXgQDiVAPpFfADJUniQAckysSCBcPPyCwmIIkgCckmoqKkriZoyZOZriybIKSSpmasYAzAbJupWVmalWNhg4+GoANpxQeARBIeEswjF8AkJRiUq6uunJqpJmukqS4pqpxYoG6YzJ5mZltcbLzSC2bQ5dPbgEFAAaAAokAEoUACI+lGQAQhRPEcPcUbxCaIKYzFRzFQLJYrNYyeSIBrlVJQlYrMxKJSMMziE5neydbq9GihV6-HwAQU8FA+FG+v3+URGcXGoEm01m80Wy1W6wRCEK6mSjE0DXM2SUlXEpjxrQJl16nx+Tx8LwpAGEABJvHwBcgkBhDJmAlkJUEciFcmG8+ElcTiRhqbLaEy6ZIYqSVXSyuztWBgDpgdC8HxgABuYFwvFgBApr3e-h8XwpAGUANIUQ2RDgmsZmhBlcROyQqL1Y+rYgobBBmTQzJS7XSacyWvRmSQ+85qf2B4OhiNRmMvMhUABqNIAYk8qGQk6mM1mAbE8yCC8lkhUsowpJpt9v9tWympKpIUmYpck8uJKpZrKc5X6A0GQ+HI9GCOqqKFSKEaBRGTmy7AmyiDtqeGhaBkGSXg6mi2oodZqLu9qqM2DT6FonYEm+YAAE4+BAYC8Kg2AdDGn7fmEf4AdEubAaIoG6DoajJIUp6GJK266OI1bKJULFrDojZHGU3onLgnCEfAUT4vgS5AqyDEIAAtLo1aqVh7ROC47jyaaq77Gkl7VExnGMFKjDwaU5S1jkSi1g6phuppFxEopzIriBAqmE6Xr7JeUK7PZvFHrZJgOSYdbJC5ahgCI7DYLhkA+M4yAAEZ4XpnlKax5QrCo27rjUCyVNWDRpDshgGFKUJNioYktL6DiuLghH4agMApWA6WZcaQGKYkuUaOIBWFMKboldWY0VJokoTSNyiSJUMWpRl+FJa0yUdNgyB8Fl9GDdkw2jUVE3nlNDpqKopgqM2l6SPoIoxT2z79m+0mAQp+ZDflhXjak538lo4JwfauQFaY2iaDFOH4YRxGkR9tH9fmGJekhD2mEY2Q7CYvGIbdKwOhkkUqDF7CoHIzhRvtA2gbVTrYtuqyzYYl74yDRPg6TVhWEAA */
    id: "machine",
    preserveActionOrder: true,
    predictableActionArguments: true,
    initial: "login",
    context: {
      member: null,
      auth_token: null,
      entry: null,
      intent: null,
      timer_ends: null,
      events: [],
      basket: [],
    } as ContextType,
    on: {
      TIMEOUT: {
        actions: ["clearTimer"],
        target: "timeout",
      },
      LOGOUT: {
        actions: ["clearAll"],
        target: "login",
      },
    },
    states: {
      timeout: {
        on: {
          GO_TO_LOGIN: {
            target: "login",
          },
        },
      },
      login: {
        on: {
          LOGIN: {
            actions: ["setMember", "setAuthToken", "setEntry", "startTimer"],
            target: "select_events",
          },
          EXPIRED_MEMBER: {
            target: "expired_member",
          },
          UNDER_AGE_MEMBER: {
            target: "under_age_member",
          },
          MEMBER_REACHED_LIMIT: {
            target: "member_reached_limit",
          },
        },
      },
      expired_member: {},
      under_age_member: {},
      member_reached_limit: {},
      select_events: {
        on: {
          SET_EVENTS: {
            actions: ["setEvents"],
          },

          ADD_TO_BASKET: {
            actions: ["addToBasket"],
            cond: "hasNotReachedMaximumTickets",
          },

          REMOVE_FROM_BASKET: {
            actions: ["removeFromBasket"],
          },

          SET_EVENT_STATUS: {
            actions: ["setEventStatus"],
          },

          CONTINUE: {
            target: "enter_details",
            cond: "hasValidEventsInBasket",
          },
        },
      },
      enter_details: {
        on: {
          UPDATE_DETAILS: {
            actions: ["patchMember"],
          },

          CONTINUE: {
            actions: ["setIntent"],
            target: "payment",
          },

          BACK: {
            target: "select_events",
          },
        },
      },
      payment: {
        on: {
          BACK: {
            target: "enter_details",
          },
        },
      },
    },
  },
  {
    actions: {
      clearTimer: assign({
        timer_ends: (_context: ContextType) => {
          return null;
        },
      }),

      setMember: assign({
        member: (_context: ContextType, { member }: any) => {
          return member;
        },
      }),

      patchMember: assign({
        member: (_context: ContextType, { member }: any) => {
          return { ..._context.member, ...member };
        },
      }),

      setEvents: assign({
        events: (_context: ContextType, { events }: any) => {
          return events;
        },
      }),

      setEventStatus: assign({
        events: (_context: ContextType, { event, status }: any) => {
          let clonedEvents = clone(_context.events) as EventType[];

          let index = clonedEvents.findIndex(
            (i: EventType) => i._id === event._id
          );

          if (index === -1) {
            return _context.events;
          }

          clonedEvents[index].status = status;

          return clonedEvents;
        },
      }),

      setAuthToken: assign({
        auth_token: (_context: ContextType, { auth_token }: any) => {
          window.sessionStorage.setItem("auth_token", auth_token); // remove if can, and use auth_token from context in axios
          return auth_token;
        },
      }),

      clearAll: assign({
        member: null,
        auth_token: null,
        entry: null,
        intent: null,
        timer_ends: null,
        events: [],
        basket: [],
      }),

      setEntry: assign({
        entry: (_context: ContextType, { entry }: any) => {
          return entry;
        },
      }),

      startTimer: assign({
        timer_ends: (_context: ContextType) => {
          return Date.now() + 1000 * 60 * 15;
        },
      }),

      addToBasket: assign({
        basket: (context: ContextType, { event }: any) => {
          let basket = clone(context.basket);

          if (basket.findIndex((i: EventType) => i._id === event._id) !== -1) {
            return basket;
          }

          basket.push(event);
          return basket;
        },
      }),

      removeFromBasket: assign({
        basket: (context: ContextType, { event }: any) => {
          let basket = clone(context.basket);
          let index = basket.findIndex((i: EventType) => i._id === event._id);
          basket.splice(index, 1);

          return basket;
        },
      }),

      setIntent: assign({
        intent: (_context: ContextType, { intent }: any) => {
          return intent;
        },
      }),
    },
    guards: {
      hasValidEventsInBasket: (context: ContextType) => {
        return context.basket.length > 0;
      },

      hasNotReachedMaximumTickets: (context: ContextType) => {
        return (
          context.basket.length < import.meta.env.VITE_MAX_PURCHASABLE_TICKETS
        );
      },
    },
  }
);

export default machine;

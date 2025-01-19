import { createContext, useReducer, FunctionComponent, ReactElement } from "react";
import { MapTag, doorsRandoLocations } from "./mapLocation";

type LocationModel = {
  id: string;
  tags: MapTag[];
  doors: Record<string, string | undefined>;
  hidden: boolean;
  matching: boolean;
};

type LocationModelState = Record<string, LocationModel>;
type LocationsModelAction =
  | {
      id: "SET_DOOR";
      on: string;
      door: string;
      value: string | undefined;
    }
  | { id: "SET_ALL"; locations: Record<string, LocationModel> }
  | { id: "APPLY_SEARCH_TERM"; term: string | undefined }
  | { id: "RESET" };

const locationsModelInit = (): LocationModelState => {
  const result: LocationModelState = {};

  doorsRandoLocations.forEach((x) => {
    const doors: Record<string, string | undefined> = {};
    if (x.doors.length > 1) {
      // Omit doors with exactly one exit, we tend to re-use these for e.g. shops
      x.doors.forEach((y) => (doors[y] = undefined));
    }
    result[x.id] = { id: x.id, tags: x.tags, doors: doors, hidden: false, matching: false };
  });

  return result;
};

const applySearchTerm = (s: LocationModelState, term: string | undefined): LocationModelState => {
  const newState: LocationModelState = {};
  Object.entries(s).forEach(([k, v]) => (newState[k] = { ...v, hidden: false, matching: false }));
  if (!term) {
    return newState;
  }

  const termUpper = term.toUpperCase();
  const strMatch = (a: string) => a.toUpperCase().includes(termUpper);

  const processHiddenInTree = (id: string, visited: string[]): boolean => {
    if (visited.includes(id)) {
      return true;
    }

    const model = newState[id];
    model.matching = strMatch(id);
    model.hidden = !model.matching;
    if (model.hidden) {
      const newVisited = [...visited, id];
      Object.values(model.doors).forEach((c) => (model.hidden &&= !c || processHiddenInTree(c, newVisited)));
    }

    return model.hidden;
  };

  processHiddenInTree("Overworld", ["Underworld", "Moon"]);
  processHiddenInTree("Underworld", ["Overworld", "Moon"]);
  processHiddenInTree("Moon", ["Underworld", "Overworld"]);

  return newState;
};

const locationsModelReducer = (state: LocationModelState, action: LocationsModelAction): LocationModelState => {
  switch (action.id) {
    case "SET_DOOR": {
      const src = state[action.on];
      if (action.value == undefined) {
        return { ...state, [src.id]: { ...src, doors: { ...src.doors, [action.door]: undefined } } };
      }

      const dst = doorsRandoLocations.find((x) => x.id == action.value);
      if (dst) {
        return {
          ...state,
          [src.id]: { ...src, doors: { ...src.doors, [action.door]: dst.id } },
          [dst.id]: { ...state[dst.id], hidden: false },
        };
      }

      console.error("Unknown door target: ", action.value);
      return { ...state };
    }
    case "SET_ALL": {
      return { ...action.locations };
    }
    case "APPLY_SEARCH_TERM": {
      return applySearchTerm(state, action.term);
    }
    case "RESET": {
      return locationsModelInit();
    }
  }
};

const LocationsModelContext = createContext<LocationModelState | undefined>(undefined);
const LocationsDispatchContext = createContext<React.Dispatch<LocationsModelAction> | undefined>(undefined);

const LocationsProvider: FunctionComponent<{ children: ReactElement }> = ({ children }) => {
  const [model, dispatch] = useReducer(locationsModelReducer, null, locationsModelInit);
  return (
    <LocationsModelContext.Provider value={model}>
      <LocationsDispatchContext.Provider value={dispatch}>
        {!!dispatch && !!model ? children : null}
      </LocationsDispatchContext.Provider>
    </LocationsModelContext.Provider>
  );
};

export type { LocationModel, LocationModelState, LocationsModelAction };
export { LocationsProvider, LocationsModelContext, LocationsDispatchContext };

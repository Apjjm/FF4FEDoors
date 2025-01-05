import { createContext, useReducer, FunctionComponent, ReactElement } from "react";
import {
  MapTag,
  doorRandoRealLocations,
  doorRandoVirtualLocations,
  doorsRandoLocations,
  toVirtualId,
} from "./mapLocation";

type LocationModel = {
  id: string;
  coarseId: string; // Id before any toVirtualId stuff
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

  doorRandoRealLocations.forEach((x) => {
    const doors: Record<string, string | undefined> = {};
    x.doors.forEach((y) => (doors[y] = undefined));

    result[x.id] = { id: x.id, coarseId: x.id, tags: x.tags, doors: doors, hidden: false, matching: false };

    // virtual locations are unique per door (e.g. it's a logically different shop)
    x.doors.forEach((d) => {
      doorRandoVirtualLocations.forEach((y) => {
        const leaf: LocationModel = {
          id: toVirtualId(x.id, d, y.id),
          coarseId: y.id,
          tags: y.tags,
          doors: { [y.doors[0]]: x.id },
          hidden: false,
          matching: false
        };
        result[leaf.id] = leaf;
      });
    });
  });

  return result;
};

const applySearchTerm = (s: LocationModelState, term: string | undefined): LocationModelState => {
  const newState : LocationModelState = {};
  Object.entries(s).forEach(([k, v]) => newState[k] = { ...v, hidden: false });
  if (!term) {
    return newState;
  }

  const termUpper = term.toUpperCase();
  const strMatch = (a: string) => a.toUpperCase().includes(termUpper);

  const processHiddenInTree = (id: string, visited: string[]): boolean => {
    if (visited.includes(id)) {
      return true;
    }

    const model = newState[id]
    model.matching = strMatch(id)
    model.hidden = !model.matching;
    if (model.hidden && model.coarseId == id) {
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
      if (dst && dst.virtual) {
        const dstId = toVirtualId(src.id, action.door, dst.id);
        return {
          ...state,
          [src.id]: { ...src, doors: { ...src.doors, [action.door]: dstId } },
          [dstId]: { ...state[dstId], hidden: false },
        };
      } else if (dst) {
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

  return { ...state };
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

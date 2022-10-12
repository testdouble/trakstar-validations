import {
  all,
  indexBy,
  isNil,
  lensPath,
  map,
  pipe,
  prop,
  reduce,
  set,
  when,
} from "ramda";

/********* GLOBALS ********/
const requiredFields = [
  { label: "EDI", isValid: (value) => value !== "(blank)" },
];

let fieldConfigs = indexBy(prop("label"), requiredFields);

let timer;
/**************************/

const getLabel = (element) => element.innerText.split("\n")[0];

const fieldChanged = (label) => (mutations) => {
  // TODO: Why isn't this event fired for changes to EDI?
  console.log(label);
  console.log(mutations);
};

const maybeAssignTextGroup = (fieldConfigs, textGroup) => {
  const label = getLabel(textGroup);
  const fieldConfig = fieldConfigs[label];
  return fieldConfig && !fieldConfig.textGroup
    ? set(lensPath([label, "textGroup"]), textGroup, fieldConfigs)
    : fieldConfigs;
};

const startObservers = map((fieldConfig) =>
  new MutationObserver(fieldChanged(fieldConfig.label)).observe(
    fieldConfig.textGroup,
    {
      childList: true,
      subtree: true,
    }
  )
);

const initialize = () => {
  const textGroupElements = document.getElementsByClassName("rb-text-group");
  fieldConfigs = reduce(maybeAssignTextGroup, fieldConfigs, textGroupElements);
  console.log(fieldConfigs);
  const allLoaded = all((c) => !isNil(c.textGroup));

  when(
    allLoaded,
    pipe(startObservers, () => clearInterval(timer)),
    fieldConfigs
  );
};

timer = setInterval(initialize, 300);

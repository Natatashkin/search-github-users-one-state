import { lazy } from "react";

const lazyLoading = (directoryName, componentName) => {
  lazy(() => import(`../${directoryName}/${componentName}/${componentName}`));
};

export default lazyLoading;

export const createDowngradContainer = (containerId: string) => {
  let downgradContainer = findDowngradContainer(containerId);
  if (downgradContainer) {
    return downgradContainer;
  }
  let containerEle;
  if (containerId && (containerEle = document.getElementById(containerId))) {
    downgradContainer = document.createElement('div');
    downgradContainer.setAttribute('data-dl-downgrad-container', containerEle.id);
    const parentNode = containerEle.parentNode || document.body;
    return parentNode.insertBefore(downgradContainer, containerEle);
  }
};

export const findDowngradContainer = (containerId: string) => {
  return document.querySelector<HTMLDivElement>(`div[data-dl-downgrad-container='${containerId}']`);
};

export const containerIsExists = (containerId?: string) => {
  if (containerId && document.getElementById(containerId)) {
    return true;
  }
  return false;
};

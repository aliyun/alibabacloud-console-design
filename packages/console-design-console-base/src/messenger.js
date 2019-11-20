const MessageType = {
  REGIONBAR_DID_MOUNT: 'REGIONBAR_DID_MOUNT',
  CONSOLE_REGION_CHANGE: 'CONSOLE_REGION_CHANGE',
  TOGGLE_RESOURCE_GROUP: 'TOGGLE_RESOURCE_GROUP',
  TOGGLE_REGIONBAR_STATUS: 'TOGGLE_REGIONBAR_STATUS',
}

const receiversMap = {}

if (window.addEventListener) {
  window.addEventListener('message', (e) => {
    const {
      data: {
        type,
        payload,
      },
    } = e
    const receivers = receiversMap[type] || [];
    receivers.forEach(v => v(payload));
  });
}

export function subscribe(type, fn) {
  const arr = receiversMap[type] || [];
  if (arr.indexOf(fn) < 0) {
    arr.push(fn);
  }
  receiversMap[type] = arr;
  return () => unsubscribe(type, fn);
}

function unsubscribe(type, fn) {
  const arr = receiversMap[type] || [];
  const index = arr.indexOf(fn);
  if (index >= 0) {
    arr.splice(index, 1);
  }
}

export const subscribeRegionbarDidMount = fn => (
  subscribe(MessageType.REGIONBAR_DID_MOUNT, fn)
)
export const subscribeConsoleRegionChange = fn => (
  subscribe(MessageType.CONSOLE_REGION_CHANGE, fn)
)
export const subscribeToggleResourceGroup = fn => (
  subscribe(MessageType.TOGGLE_RESOURCE_GROUP, fn)
)

export const sendRegionList = (list) => {
  // convert regionList
  const regionList = list.map(region => ({
    regionId: region.id,
  }))
  // post reionList to regionbar
  window.postMessage({
    type: MessageType.TOGGLE_REGIONBAR_STATUS,
    payload: {
      regionList,
    },
  }, window.location.href);
}

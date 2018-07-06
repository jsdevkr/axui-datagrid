function getNode(getNodeFn?: Function) {
  return getNodeFn && getNodeFn();
}

export default getNode;

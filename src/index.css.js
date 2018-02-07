module.exports = (scope) => `
<style>
inspector-component {
  font-family: Menlo, monospace;
  line-height: 1.4;
  cursor: default;
  display: block;
}
object-inspector {
  display: inline-block;
}
object-root-label {
  font-style: italic;
}
object-name {
  color: rgb(136, 19, 145);
}
.objectValueString {
  color: rgb(196, 26, 22);
}
.child-nodes > ol {
  padding: 0;
  margin: 0;
  padding-left: 12px;
}
tree-node .child-nodes{
  display: none;
}
tree-node[expanded="true"] > li > .child-nodes{
  display: block;
}
.counter {
  display: none;
}
.counter.shown {
  display: inline-block;
  margin-right: 5px;
  margin-top: 3px;
  margin-bottom: 3px;
  border-radius: 9px;
  background: #cdcecf;
  padding: 4px;
  min-width: 12px;
  text-align: center;
  height: 12px;
  font-size: 10px;
  color: #555;
}
</style>`;

let previousVDOM = "";
export function render(vdom, container) {
 if (vdom !== previousVDOM) {
 container.innerHTML = vdom;
 previousVDOM = vdom;
 console.log("UI Updated");
 } else {
 console.log("No Change");
 }
}

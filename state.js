export let state = {
 employees: [
 { id: 1, name: "John", score: 70, present: true },
 { id: 2, name: "Sara", score: 85, present: false }
 ]
};
let listeners = [];
export function subscribe(listener) {
 listeners.push(listener);
}
export function setState(newState) {
 state = { ...state, ...newState }; // immutability
 listeners.forEach(l => l());
}

require('document-register-element');

const obj = {
  _id: "56dcf573b09c217d39fd7621",
  name: "Howard Christensen",
  email: "howardchristensen@isotronic.com",
  phone: "+1 (830) 529-3176",
  address: "511 Royce Street, Hilltop, Tennessee, 9712"
};
const friend = Object.assign({}, obj);

obj.friends = [friend];

window.obj = obj;

window.data = JSON.stringify(obj);

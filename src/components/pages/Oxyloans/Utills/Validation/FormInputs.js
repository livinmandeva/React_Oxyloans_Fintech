export function isEmail(value) {
  return value.includes("@");
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function hasMinLength(value, minlengthvalue) {
  return value.length >= minlengthvalue;
}

export function isequalToOthervalues(value, anothervalue) {
  return value === anothervalue;
}

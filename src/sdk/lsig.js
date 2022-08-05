export default function LsigTeal(name) {
    return `#pragma version 6
    byte "${name}"
    byte ""
    b!=
    return`
}
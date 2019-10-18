const hasClass = (elements, cName) => {
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"))
}
const addClass = (elements, cName) => {
    if (!hasClass(elements, cName)) {
        elements.className += " " + cName
    }
}
const removeClass = (elements, cName) => {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ")
    }
}

export {
    hasClass,
    addClass,
    removeClass
}
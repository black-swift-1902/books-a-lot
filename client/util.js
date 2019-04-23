export const priceSum = function(total, book) {
    total += book.price * book.order_log.quantity
    return total
}

export const truncate = function(str,width) {
    if(str.length < width) return str;

    return str.slice(0,width) + "...";
}
export default {
    rgb (r, g, b) {
        const get = n =>
            Number(n)
                .toString(16)
                .padStart(2, '0')
        return parseInt(`0x${get(r)}${get(g)}${get(b)}`)
    },
    random (n = 10) {
        return Math.floor(Math.random() * 10)
    }
}

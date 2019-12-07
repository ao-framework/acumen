

export function delay(count: number) {
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, count)
    })
}

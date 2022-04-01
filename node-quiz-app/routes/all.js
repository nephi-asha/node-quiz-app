function viewPage(req, res, filename, NAME){
    const resultg = require(filename)
    const zero = resultg[0]
    const one = resultg[1]
    const two = resultg[2]
    const three = resultg[3]
    const four = resultg[4]

    res.render(NAME, {
        resultg,
        data0: {
            id: zero.id,
            question: zero.question,
            a: zero.a,
            b: zero.b,
            c: zero.c,
            d: zero.d,
            correct: zero.correct
        },
        data1: {
            id: one.id,
            question: one.question,
            a: one.a,
            b: one.b,
            c: one.c,
            d: one.d,
            correct: one.correct
        },
        data2: {
            id: two.id,
            question: two.question,
            a: two.a,
            b: two.b,
            c: two.c,
            d: two.d,
            correct: two.correct
        },
        data3: {
            id: three.id,
            question: three.question,
            a: three.a,
            b: three.b,
            c: three.c,
            d: three.d,
            correct: three.correct
        },
        data4: {
            id: four.id,
            question: four.question,
            a: four.a,
            b: four.b,
            c: four.c,
            d: four.d,
            correct: four.correct
        },
    })
}

module.exports = {viewPage}


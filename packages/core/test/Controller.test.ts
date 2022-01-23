import { Controller } from "use-book/src/Controller";

describe('Controller', () => {
  const fn = jest.fn()

  it.each`
    isbn         | noIsbn      | size    | isssl   | search | result
    ${4041013380}|${4041013380}|${"xs"}  |${true}  | ${0}   | ${"http://images-na.ssl-images-amazon.com/images/P/4041013380.09.THUMBZZZ"}
    ${4041002877}|${4041002872}|${"sm"}  |${true}  | ${5}   | ${"http://images-na.ssl-images-amazon.com/images/P/4041002877.09.TZZZZZZZ"}
    ${4041315220}|${4041315224}|${"md"}  |${false} | ${10}  | ${"http://images-jp.amazon.com/images/P/4041315220.09.MZZZZZZZ"}
    ${4041067944}|${4041067949}|${"lg"}  |${false} | ${15}  | ${"http://images-jp.amazon.com/images/P/4041067944.09.LZZZZZZZ"}
    ${4041366054}|${4041366059}|${void 0}|${void 0}| ${20}  | ${"http://images-jp.amazon.com/images/P/4041366054.09.MZZZZZZZ"}
    ${4041245257}|${4041245255}|${void 0}|${void 0}| ${25}  | ${"http://images-jp.amazon.com/images/P/4041245257.09.MZZZZZZZ"}
  `("check for $trueIsbn", ({isbn, noIsbn, result, ...props}) => {
    const ctrls = [1,1,1,1].map(() => new Controller())
    ctrls[0].apply(fn, {...props, isbn})
    ctrls[1].apply(fn, {...props, isbn: noIsbn})
    ctrls[2].apply(fn, {...props, src: `amazon.com/dp/${isbn}/`})
    ctrls[3].apply(fn, {...props, src: `amazon.com/dp/${noIsbn}/`})
    ctrls.forEach(_ => _.effect())
    // ctrls.forEach(_ => expect(_.state.src).toBe(result))
    // expect(ctrls[1].state.src).toBe(result)
  })
})

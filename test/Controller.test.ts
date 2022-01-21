import { Controller } from "../src/Controller";

describe('Controller', () => {
    const setImg = jest.fn()
  it.each`
    key    | size  | isssl   | search | utltext
    ${'0'} | ${""} | ${true} | ${10}  | ${""}
  `("check bind for $key", (props) => {
    const ctrl = new Controller()
    const $ = ctrl.apply(props)
    ctrl.effect()
    console.log(ctrl.state)
  })
})

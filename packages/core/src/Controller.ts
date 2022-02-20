// @ts-ignore
export class Any { private unused: never }

export type Fun<I extends ReadonlyArray<unknown>=any[], O=any> = (...i: I) => O

export type Props = Partial<{
  src: string
  isbn: string|number
  size: string
  isssl: boolean
  search: number
}>

export type State = Partial<{
  isbns: (string|number)[]
  isbn: string|number
  src: string
  alt: string
  host: string
  size: string
  ref: unknown
  image: HTMLImageElement
}>

export class Controller {
  props: Props = {};
  state: State = {};
  update: Fun = () => {};
  isChanged = true;

  apply(update: Fun, props: Props, ref?: unknown) {
    this.update = update;
    this.props = props;
    this.state.ref = ref
    return this.state;
  }

  effect () {
    const $ = this.state;
    if (!this.isChanged) return
    this.isChanged = false;
    this.setup();
    $.image = $.image || new Image();
    $.image.onload = this.load.bind(this);
    $.image.src = $.src!;
    $.image.alt = $.alt || "";
  }

  load () {
    const $ = this.state;
    if (!$.image || $.image.width < 2 || $.image.height < 2)
      return this.error();
    this.update([]);
  }

  error () {
    const $ = this.state;
    const { search=-1 } = this.props;
    if (!$.image || !$.isbns || $.isbns.length > search)
      return console.warn("Load Error: cant search Image");
    const len = $.isbns.length;
    const pre = typeof $.isbns[0] === "string"
      ? parseInt($.isbns[0], 10)
      : $.isbns[0];
    $.isbn = pre + ~~((len + 1) / 2) * (len % 2 * 2 - 1);
    $.image.src = $.src = this.src;
    $.image.alt = $.alt || "";
    $.isbns.push($.isbn);
  }

  setup () {
    const $ = this.state;
    const { isbn } = this.props;
    $.isbn = isbn || $.isbn || this.isbn;
    $.src = $.src || this.src;
    $.alt = ''; //@TODO get alt
    ($.isbns = $.isbns || []).push($.isbn);
  }

  get isbn () {
    const { src="" } = this.props
    const paths = src.split('/').filter(Boolean);
    const index = paths.map((v, i) => v === 'dp' && i ).find(Boolean) || 0;
    return paths[index + 1];
  }

  get src () {
    const $ = this.state;
    $.size = $.size || this.size;
    $.host = $.host || this.host;
    return `http://${$.host}/images/P/${$.isbn}.09.${$.size}`;
  }

  get size () {
    switch (this.props.size) {
        case "xs": return "THUMBZZZ";
        case "sm": return "TZZZZZZZ";
        case "md": return "MZZZZZZZ";
        case "lg": return "LZZZZZZZ";
    }
    return "MZZZZZZZ";
  }

  get host () {
    return this.props.isssl
      ? 'images-na.ssl-images-amazon.com'
      : 'images-jp.amazon.com';
  }
}

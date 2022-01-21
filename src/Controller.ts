export type Props = Partial<{
  urltext:string
  size: string
  isssl: boolean
  search: number
  img: any, setImg: any // useState
}>

export type State = Partial<{
  isbns: number[]
  image: any // @TODO typeof Image
  srcRef: string
  path: any
  host: string
}>

export class Controller {
  props: Props = {}
  state: State = {isbns: [], image: new Image(), srcRef: ''}

  apply(props: Props) {
    const { isssl } = props
    const { state: $ } = this;
    this.props = props
    $.path = this.getPath()
    $.host = `${isssl
      ? 'images-na.ssl-images-'
      : 'images-jp.' }amazon.com`
    return $
  }

  effect () {
    const { props, state: $ } = this
    if ($.srcRef) return console.warn('useEffect interupt');
    const num = $.isbns!.slice(-1)[0] || $.path.isbn;
    const src = this.getSrc(num);
    const alt =  $.path.name || '';
    props.setImg({src, alt});
    $.image.src = src;
    $.image.current.onload = this.load.bind(this)
  }

  load () {
    const { state: $ } = this
    const width = $.image.width;
    const height = $.image.current.height;
    if (width < 2 || height < 2) return this.error();
    $.srcRef = $.image.current.src;
  }

  error () {
    const { props, state: $, getSrc } = this
    const { setImg, search } = props
    const pre = $.isbns![0];
    const len = $.isbns!.length;
    const num = pre + ~~((len+1)/2)*(len%2*2-1);
    if (len > search! || $.srcRef) return;
    $.isbns!.push( num );
    return setImg((pre:any) => ({...pre, src: getSrc(num)}));
  }

  getSrc (num: string|number) {
    const { props: {size}, state: {host} } = this
    return `http://${host}/images/P/${num}.09.${size}`
  }

  getPath () {
    const { urltext="" } = this.props
    const { isbns=[] } = this.state
    const url = new URL(`${urltext.match('https')? '':'https://' }${urltext}`);
    const paths = url.pathname.split('/').filter(Boolean);
    const index = paths.map((v, i) => v==='dp'&&i ).find(Boolean) || 0;
    const isbn = paths.find((_, i) => i===index+1) || '';
    const name = index > 0? paths[0] : '';
    const ref  = paths.find(v=>v.match('ref='))?.split('ref=')[1] || '';
    isbns?.push( parseInt(isbn, 10) );
    return {name, isbn, ref};
  }
}

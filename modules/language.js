import { Cookies } from './cookies.js'
import { Samples } from './samples.js'

export class Language {
  el = document.getElementById('select-language')
  samples = new Samples

  init () {
    if (Cookies.get('language')) {
      this.el.value = Cookies.get('language')
    }
    this.el.onchange = () => {
      this.set()
    }
    this.set()
  }

  set () {
    const lang = this.el.value

    window.CMeditor.doc.setValue(this.samples.get(lang))
    window.CMeditor.setOption('mode', lang.toLowerCase())
    window.CMeditor.refresh()

    Cookies.set('language', lang)
  }
}

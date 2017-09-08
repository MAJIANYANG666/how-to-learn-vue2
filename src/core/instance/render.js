import { _toString } from '../util/index'
import { createTextVNode, createEmptyVNode } from '../vdom/vnode'
import { createElementVNode } from '../vdom/create-element'

import { renderList } from './render-helpers/render-list'
import { renderSlot } from './render-helpers/render-slot'
import { checkKeyCodes } from './render-helpers/check-keycodes'
import { resolveSlots } from './render-helpers/resolve-slots'

export function initRender (vm) {
  vm._vnode = null // the root of the child tree

  const parentVnode = vm.$options._parentVnode
  const renderContext = parentVnode && parentVnode.context
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext)

  // 在_c('my-component'); 也就是createElementVNode需要创建一个自定义组件的vnode，由于此时createElementVNode需要绑定vm构造器
  vm._c = (a, b, c) => createElementVNode(vm, a, b, c)
}

export function renderMixin (Vue) {
  // Vue.prototype._c = createElementVNode
  Vue.prototype._v = createTextVNode
  Vue.prototype._s = _toString
  Vue.prototype._l = renderList
  Vue.prototype._t = renderSlot
  Vue.prototype._k = checkKeyCodes
  Vue.prototype._e = createEmptyVNode
}
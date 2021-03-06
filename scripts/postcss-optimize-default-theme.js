import postcss from 'postcss'

const defaultThemeMatcher = /@theme +default/

const plugin = postcss.plugin('postcss-optimize-default-theme', () => css => {
  if (!defaultThemeMatcher.test(css.source.input.css)) return

  // Remove rules for .markdown-body selector
  css.walkRules(rule => {
    const ss = rule.selectors.filter(s => !s.startsWith('.markdown-body'))

    if (ss.length > 0) {
      rule.selectors = ss
    } else {
      rule.remove()
    }
  })

  // Remove unused web fonts
  css.walkAtRules('font-face', rule => {
    rule.walkDecls('font-family', decl => {
      if (decl.value === 'octicons-link') rule.remove()
    })
  })
})

export default plugin

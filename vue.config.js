/* eslint-disable */
// import path from "path";
const path = require('path')

// import svg_sprite_loader from "svg-sprite-loader/plugin";

module.exports = {
    lintOnSave: false,
    chainWebpack: config =>{
        const dir = path.resolve(__dirname, 'src/assets/icons')

        // 配置svg-sprite-loder
        config.module
            .rule('svg-sprite')
            .test(/\.svg$/)
            .include.add(dir).end() // 包含 icons 目录
            .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false}).end()

          //  删除原有彩色
          // .use('svgo-loader').loader('svgo-loader').tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end()

        // 配置插件
        config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])


        config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录


        // config.module
        //   .rule('svg-sprite')
        //   .test(/\.(svg)(\?.*)?$/)
        //   .include.add(dir).end()
        //   .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({extract: false}).end()
        //   .use('svgo-loader').loader('svgo-loader')
        //   .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]}))
        //   .end()
        // config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'), [{plainSprite: true}])
        // config.module.rule('svg').exclude.add(dir)

    }
}
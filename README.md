# grunt-debug-code-remover

> Removes debugging code from production builds.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-debug-code-remover --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-debug-code-remover');
```

## The "debug_code_remover" task

### Overview
In your project's Gruntfile, add a section named `debug_code_remover` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  debug_code_remover: {
    main: {
        files: [
            {expand: true, cwd: "./", src: ["**/*.js"], dest: "../build/"}
        ]
    },
  },
});
```

### Options

#### options.identifiers
Type: `Array`
Default value: `["@", "DEBUG"]`

All identifiers in this array can be used to mark debugging code in your development source code.

### Usage Examples

####Marking debugging code

`grunt-debug-code-remover` will remove all code that is containing within special type of comments, as follows:

```js
function iDoSomething() {
    /*@<*/ console.log("I'm doing my thing"); /*>@*/
    //Do your thing
}
```

From this function, the line `/*@<*/ console.log("I'm doing my thing"); /*>@*/` will be removed by the plugin.

You can use your own identifier instead of `@`, by using `options.identifiers`.

`/*IDENTIFIER<*/` denotes the opening mark, and `/*>IDENTIFIER*/` denotes the ending mark (notice the < and >). A short identifier is recommended.

## Release History
2015-02-25  v0.1.0  Released
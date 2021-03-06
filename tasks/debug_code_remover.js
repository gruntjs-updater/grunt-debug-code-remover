/*
 * grunt-debug-code-remover
 * https://github.com/echofoxxx/grunt-debug-code-remover
 *
 * Copyright (c) 2015 Abhishek Goyal
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('debug_code_remover', function () {

        var identifiers = ["@", "DEBUG"].concat(this.options.identifiers || []);

        function getIdentifierString() {
            return "(?:"+identifiers.join("|")+")";
        }

        function buildRegex() {
            var str = "\n?\r?\\/\\*(?:[\\s]+)?" + getIdentifierString() + "<" + "(?:[\\s]+)?\\*\\/" +
                "([\\s\\S]*?)" +
                "\\/\\*(?:[\\s]+)?" + ">" + getIdentifierString() + "(?:[\\s]+)?\\*\\/\n?\r?";
            return new RegExp(str, "gi");
        }

        var regex = {
            multiline: buildRegex()
        };

        function handleCode(code) {
            return code.replace(regex.multiline, "");
        }

        this.files.forEach(function (file) {

            file.src.filter(function (filepath) {
                return grunt.file.isFile(filepath);
            }).forEach(function (filepath) {
                console.log(filepath);
                var code = grunt.file.read(filepath);
                grunt.file.write(file.dest, handleCode(code));
            });

        });

    });

};

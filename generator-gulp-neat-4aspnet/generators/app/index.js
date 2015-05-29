'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Generator ' + chalk.red('Gulp-Neat4-aspnet') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appProceed',
      message: 'Press Enter to Proceed',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  // Create Directories for the Project
  createFolders : function() {
    this.mkdir("app"); // Base Directory
    // Bower Folder
    this.mkdir("app/sass/bower_components")
    // Sass Folders
    this.mkdir("app/sass");
    this.mkdir("app/sass/Base");
    this.mkdir("app/sass/Elements");
    this.mkdir("app/sass/Modules");
    //Scripts Folder
    this.mkdir("app/scripts");
    this.mkdir("app/scripts/vendor");
    //Images Folder
    this.mkdir("app/images");
  },

  //Create Files within the App Directory
  createFiles : function() {
    //Gulp File
    this.copy('gulpfile.js', 'gulpfile.js');

    //Bowerrc
    this.copy('.bowerrc', '.bowerrc'); /* Neat Bourbon */

    //SCSS Files
    /* Base Files */
    this.copy('_breakpoints.scss', 'app/sass/Base/_breakpoints.scss');
    this.copy('_mixins.scss', 'app/sass/Base/_mixins.scss');
    this.copy('_variables.scss', 'app/sass/Base/_variables.scss');
    this.copy('_typography.scss', 'app/sass/Base/_typography.scss');

    /* Element Files */
    this.copy('_layout.scss','app/sass/Elements/_layout.scss');

    /* Module Files */
    this.copy('_nav.scss', 'app/sass/Modules/_nav.scss');
    this.copy('_editor.scss', 'app/sass/Modules/_editor.scss'); // Umbraco Editor Styles

    /* Main import File */
    this.copy('app.scss', 'app/sass/app.scss');

    //SCRIPT this is intentionally left out as the Backend Guys are going to use .NET Bundles to sort the JS

  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});

'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

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
    mkdirp("app"); // Base Directory
    // Bower Folder
    mkdirp("bower_components");
    // Sass Folders
    mkdirp("app/sass");
    mkdirp("app/sass/Base");
    mkdirp("app/sass/Elements");
    mkdirp("app/sass/Modules");
    //Scripts Folder
    mkdirp("app/scripts");
    mkdirp("app/scripts/vendor");
    //Images Folder
    mkdirp("app/images");
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
    this.copy('_grid-settings.scss', 'app/sass/Elements/_grid-settings.scss');

    /* Module Files */
    this.copy('_nav.scss', 'app/sass/Modules/_nav.scss');
    this.copy('_editor.scss', 'app/sass/Modules/_editor.scss'); // Umbraco Editor Styles

    /* Main import File */
    this.copy('app.scss', 'app/sass/app.scss');

    //JS Files
    /* Vendor Library Files */
    // jQuery & Modernizr is coming via cdn with migrate tool for jQuery to support legacy browser
    this.copy('inheritance.js', 'app/js/vendor/inheritance.js');
    this.copy('SmoothScroll.js', 'app/js/vendor/SmoothScroll.js');
    /* Startup Files */
    this.copy('Base.js', 'app/js/startup/Base.js');
    this.copy('Controller.js', 'app/js/startup/Controller.js');
    this.copy('ControllerBinder.js', 'app/js/startup/ControllerBinder.js');
    /* Custom JS Files - This is are sample files recreate for the app */
    this.copy('CallToAction.js', 'app/js/scripts/CallToAction.js');
    this.copy('Jumbotron.js', 'app/js/scripts/Jumbotron.js');

    /* Sample file DELETE After Structuring the layout */
    this.copy('Sample-4-footer.html', 'Sample-4-footer.html');

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

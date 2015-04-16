'use strict';

SwaggerUi.Views.HeaderView = Backbone.View.extend({
  events: {
    'click #show-pet-store-icon'    : 'showPetStore',
    'click #show-wordnik-dev-icon'  : 'showWordnikDev',
    'change #input_baseUrl'         : 'loadDefinition'
  },

  initialize: function(){
  },

  showPetStore: function(){
    this.trigger('update-swagger-ui', {
      url:'http://petstore.swagger.io/v2/swagger.json'
    });
  },

  showWordnikDev: function(){
    this.trigger('update-swagger-ui', {
      url: 'http://api.wordnik.com/v4/resources.json'
    });
  },

  loadDefinition: function(e) {
    var app_id = $(e.target).children(':selected').val(),
        self = this;
    $.getJSON(TWINTIP_BASE_URL + '/apis/' + app_id, function(def) {
      var swaggerUrl = '/swagger.json';
      $.getJSON(KIO_BASE_URL + '/apps/' + app_id, function(app) {
        console.log(self);
        self.trigger('update-swagger-ui', {
          url: app.service_url + swaggerUrl
        });
      });
    });
  },

  update: function(url, apiKey, trigger){
    if (trigger === undefined) {
      trigger = false;
    }

    if (trigger) {
      this.trigger('update-swagger-ui', {url:url});
    }
  }
});

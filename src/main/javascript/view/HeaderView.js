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

    function setOAuthHeader(xhr) {
      var bearerHeader = 'Bearer ' + window.OAuthProvider.getAccessToken();
      if (window.swaggerUi && window.swaggerUi.api) {
        window.swaggerUi.api.clientAuthorizations.add('myoauth2',
            new SwaggerClient.ApiKeyAuthorization('Authorization', bearerHeader, 'header'));
      }
      xhr.setRequestHeader('Authorization', bearerHeader);
    }

    $.ajax({
        url: window.SUIENV_TWINTIP_BASE_URL + '/apps/' + app_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: setOAuthHeader,
        error: console.error.bind(console),
        success: function(api) {
          var swaggerUrl = api.url,
              isRelativeUrl = swaggerUrl[0] === '/';
          if (isRelativeUrl) {
            // go to kio for serviceurl
            $.ajax({
              url: window.SUIENV_KIO_BASE_URL + '/apps/' + app_id,
              type: 'GET',
              dataType: 'json',
              beforeSend: setOAuthHeader,
              error: console.error.bind(console),
              success: function(app) {
                self.trigger('update-swagger-ui', {
                  url: app.service_url + swaggerUrl
                });
              }
            });
          } else {
            self.trigger('update-swagger-ui', {
              url: swaggerUrl
            });
          }
      }
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

(function (app) {
  'use strict';

  app.registerModule('categories', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  // app.registerModule('categories.admin', ['core.admin']);
  // app.registerModule('categories.admin.routes', ['core.admin.routes']);
  app.registerModule('categories.services');
  app.registerModule('categories.routes', ['core.routes', 'categories.services']);
}(ApplicationConfiguration));

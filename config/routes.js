/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  // CUSTOM ROUTES

  'POST /api/v1/auth/login':                   { action: 'auth/login' },
  'POST /api/v1/auth/signup':                  { action: 'auth/signup' },

  // User routes
  'GET /api/v1/user':                           { action: 'v1/user/index' },
  'GET /api/v1/user/profile':                   { action: 'v1/user/profile' },
  'GET /api/v1/user/:id':                       { action: 'v1/user/show' },
  'POST /api/v1/user':                          { action: 'v1/user/create' },
  'DELETE /api/v1/user/:id':                    { action: 'v1/user/delete' },

  // Location routes
  'GET /api/v1/location':                       { action: 'v1/location/index' },
  'POST /api/v1/location':                      { action: 'v1/location/create' },
  'PUT /api/v1/location/:id':                   { action: 'v1/location/update' },
  'DELETE /api/v1/location/:id':                { action: 'v1/location/delete' },

  // LocationOutlet routes
  'GET /api/v1/locationOutlet':                 { action: 'v1/locationOutlet/index' },
  'POST /api/v1/locationOutlet':                { action: 'v1/locationOutlet/create' },
  'DELETE /api/v1/locationOutlet/:id':          { action: 'v1/locationOutlet/delete' },

  // Category routes
  'GET /api/v1/category':                       { action: 'v1/category/index' },
  'POST /api/v1/category':                      { action: 'v1/category/create' },
  'PUT /api/v1/category/:id':                   { action: 'v1/category/update' },
  'DELETE /api/v1/category/:id':                { action: 'v1/category/delete' },

  // Outlet Routes
  'GET /api/v1/outlet':                         { action: 'v1/outlet/index' },
  'POST /api/v1/outlet':                        { action: 'v1/outlet/create' },
  'PUT /api/v1/outlet/:id':                     { action: 'v1/outlet/update' },
  'DELETE /api/v1/outlet/:id':                  { action: 'v1/outlet/delete' },

  // Sub Category
  'GET /api/v1/item':                           { action: 'v1/item/index' },
  'POST /api/v1/item':                          { action: 'v1/item/create' },
  'PUT /api/v1/item/:id':                       { action: 'v1/item/update' },
  'DELETE /api/v1/item/:id':                    { action: 'v1/item/delete' },

  // Outlet Category
  'GET /api/v1/outletCategory':                 { action: 'v1/outletCategory/index' },
  'POST /api/v1/outletCategory':                { action: 'v1/outletCategory/create' },
  'DELETE /api/v1/outletCategory/:id':          { action: 'v1/outletCategory/delete' },

  // Outlet Sub Category
  'GET /api/v1/outletItem':                     { action: 'v1/outletItem/index' },
  'POST /api/v1/outletItem':                    { action: 'v1/outletItem/create' },
  'PUT /api/v1/outletItem/:id':                 { action: 'v1/outletItem/update' },
  'DELETE /api/v1/outletItem/:id':              { action: 'v1/outletItem/delete' },

};

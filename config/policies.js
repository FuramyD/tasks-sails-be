/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

require("dotenv").config();
require("../api/strategies/jwt").passport();

module.exports.policies = {

    /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

    // '*': true,

    "tasks/*": "isAuthenticated",
    "users/*": "isAuthenticated",
    "users/login": true,
    "users/register": true,

};

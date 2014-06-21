"use strict"
var loadedVersion = "0.1403315332736",
currentVersion = currentVersion || loadedVersion
currentVersion !== loadedVersion && (function(){console.log("new version detected: reloading page");return true;})() && window.location.reload()
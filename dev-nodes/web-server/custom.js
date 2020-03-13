var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/userinfo.email';
function handleClientLoad() {
  // Load the API's client and auth2 modules.
  // Call the initClient function after the modules load.
  gapi.load('client:auth2', initClient);
}

function initClient() {
  // Retrieve the discovery document for version 3 of Google Drive API.
  // In practice, your app can retrieve one or more discovery documents.
  var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest';
    //'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',

  // Initialize the gapi.client object, which app uses to make API requests.
  // Get API key and client ID from API Console.
  // 'scope' field specifies space-delimited list of access scopes.
  gapi.client.init({
      'apiKey': 'AIzaSyDHoWXMSpawHVJCZeHMcsBKVK2iOP5yhic',
      'clientId': '134735987194-vaqa2l0t2c0qo3h6ovtgicj9h4e34hgu.apps.googleusercontent.com',
      'discoveryDocs': [discoveryUrl],
      'scope': SCOPE
  }).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus);

    // Handle initial sign-in state. (Determine if user is already signed in.)
    var user = GoogleAuth.currentUser.get();
    setSigninStatus();

    // Call handleAuthClick function when user clicks on
    //      "Sign In/Authorize" button.
    $('#sign-in-or-out-button').click(function() {
      handleAuthClick();
    });
    $('#revoke-access-button').click(function() {
      revokeAccess();
    });
  });
}

/* 
 * Helper to check if a user is signed in and 
 *  and relevant access to scope.
 * */
function isSignedIn(){
  try{
    return GoogleAuth.isSignedIn.get();
    //return GoogleAuth.currentUser.get().hasGrantedScopes(SCOPE) != null;
  }catch{
    return false;
  }
}

/*
 * Helper to get Username
 */
async function getUsername(){
  var ret = null;
  await gapi.client.people.people.get({
    'resourceName': 'people/me',
    'requestMask.includeField': 'person.names'
  }).then(function(resp) {
    ret = resp.result.names[0].displayName;
  })

  return ret;
}

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    // User is authorized and has clicked "Sign out" button.
    GoogleAuth.signOut();
  } else {
    // User is not signed in. Start Google auth flow.
    GoogleAuth.signIn();
  }
}

function revokeAccess() {
  GoogleAuth.disconnect();
}

function setSigninStatus(isSignedIn) {
  var user = GoogleAuth.currentUser.get();
  var isAuthorized = user.hasGrantedScopes(SCOPE);
  if (isAuthorized) {
    $('#sign-in-or-out-button').html('Sign out');
    $('#revoke-access-button').css('display', 'inline-block');

    var a = getUsername().then(function (rname){
      var name = '<b>' + rname + '</b>'; 
      $('#auth-status').html('Welcome ' + name + '! You can add ' + 
          'locations to map.');
    });
    

  } else {
    $('#sign-in-or-out-button').html('Sign In');
    $('#revoke-access-button').css('display', 'none');
    $('#auth-status').html('You have not signed it and cannot use the map.');
  }
}

function updateSigninStatus(isSignedIn) {
  setSigninStatus();
}

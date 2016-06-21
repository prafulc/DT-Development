import '../imports/collections/reg_users.js';

import '../imports/collections/images.js';

Accounts.onCreateUser(function(options, user) {
    user['email_verified'] = options.email_verified
    user['subscribe'] = options.subscribe
    user['personal_detail'] = options.personal_detail
    user['fileId'] = options.fileId
    user['createdAt'] = options.createdAt
    user['profile'] = options.profile
    return user
})
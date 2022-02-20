/*
    Return an invite code based on a given invite url
    @param invite_url - the invite url of the project
    @return invite_code - the invite code of the project
*/
export const getInviteCode = invite_url => {

    let urlComponents = invite_url.split('/');
    return urlComponents[urlComponents.length - 1];

};
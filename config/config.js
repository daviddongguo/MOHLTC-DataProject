module.exports = {
    database:"mongodb://127.0.0.1/dataproject",
    superSecret:"df;gjk3409tgpofdbvkw4gk-rwit24t,gdfpovoqeo[13- -3i -3 i-0ids-f-i-ak123-i 1--sH(*n( *y (*y(W#(*jhSD)*D)*SJ_(U#n_DXJ_ d",
    mailServer: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "lyulester@gmail.com",
            pass: "password"
        },
        sender: '"Lester Lyu" <lyulester@gmail.com>'
    },
    serverHostname: "http://142.107.248.32:3000", //used for receive validation link
    userTypes: { // not yet used
        0: 'User',
        1: 'Superuser',
        2: 'Admin'
    },
    enableNewInterface: true, // use sidebar
};
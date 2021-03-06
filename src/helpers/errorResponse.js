const response = require('./standartResponse');
const errorHendling = (msg, param, location = 'body')=>[
    {
        msg,
        param,
        location
    }
];

const errorResponse = (err, res) =>{
    //start uservalidator
    if(err.code === '23505' && err.detail.includes('email')){
        const eres = errorHendling('Email already exists','email');
        return response(res, 'Error', eres, null,400);
    }if(err.code === '23505' && err.detail.includes('username')){
        const eres = errorHendling('Username already exists','username');
        return response(res, 'Error', eres, null,400);
    }
    //end user

    //profiles
    if(err.code === '23505' && err.detail.includes('id_user')){
        const eres = errorHendling('id user already exists','id_user');
        return response(res, 'Error', eres, null,400);
    }if(err.code === '23505' && err.detail.includes('phonenumber')){
        const eres = errorHendling('phonenumber already exists','phonenumber');
        return response(res, 'Error', eres, null,400);
    }
    //end
    return response(res, 'Error', null, 400);
};

module.exports = errorResponse;
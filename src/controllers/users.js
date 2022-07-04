const response = require('../helpers/standartResponse');
const userModels = require('../models/users');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const {LIMIT_DATA} = process.env;

// //start getalluser
// exports.getAllUsers = (req, res)=>{
//     userModels.getAllUsers((results)=>{
//         return response(res, 'Massage from standard response', results);
//     });
// };
// //end

//start getalluser serach
exports.getAllUsers = (req, res)=>{
    const {search='', limit=parseInt(LIMIT_DATA), page=1} = req.query;
    const offset = (page-1)*limit;
    userModels.getAllUsers(search, limit, offset,(err, results)=>{
        if (results.length < 1) {
            return res.redirect('/404');
        }else{
            return response(res, 'List All User', results);
        }
    });
};
//end

//start userDetail
exports.getUserbyId = (req,res) =>{
    const {id} = req.params;
    userModels.getUserbyId(id, (err,results)=>{
        if(results.rows.length > 0){
            return response(res, 'Detail User',results.rows[0]);
        }else{
            return res.redirect('/404');
        }
    });
};
//end

//start create user
exports.createUsers = (req, res) =>{
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        return response(res, 'Error occured', validation.array(), 400);
    }
    userModels.createUsers(req.body, (err, results)=>{
        if(err){  
            return errorResponse(err,res);
        }
        return response(res, 'Create User successfully', results[0]);    
    });
};
//end

//start updateuser
exports.updateUsers = (req, res) =>{
    const {id} = req.params;
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        return response(res, 'Error occured', validation.array(), 400);
    }
    userModels.updateUsers(id, req.body, (results)=>{
        return response(res, 'UPDATE data success!', results[0]);
    });
};
//end

//start deleteuser
exports.deleteUsers = (req, res) =>{
    const {id} = req.params;
    userModels.deleteUsers(id, (results)=>{
        return response(res, 'User Deleted!', results[0]); 
    });
};
//end